import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { isAfter } from "date-fns";
import {
  Prisma,
  QuizVisibility,
  Question,
  Quiz,
} from "../generated/prisma/client";
import {
  GetQuizzesQueryDTO,
  UpsertQuizDTO,
} from "./schemas/quiz.schema";
import {
  QuizForbiddenError,
  QuizNotFoundError,
  QuizNotPlayableError,
} from "../common/errors/quiz/quiz.errors";
import { CursorPaginationQueryDTO } from "../common/schemas/cursor-pagination.schema";
import { QuizzesValidationService } from "./validation/quizzes-validation.service";
import { DraftQuestionInput } from "./schemas/question.schema";
import { QUIZ_STATUS_FILTER } from "./constants/filters";
import { paginateWithCursor } from "../common/prisma/cursor-pagination.helper";
import { QuizWithUser, QuizListItem } from "./types/quiz-list-item.type";
import { PublishedDetails } from "./types/published-details.type";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService,
    private readonly validationService: QuizzesValidationService,
  ) {}

  async getQuizzes(userId: string, query: GetQuizzesQueryDTO) {
    const where: Prisma.QuizWhereInput = {
      userId,
      publishedDetails:
        query.status === QUIZ_STATUS_FILTER.DRAFT
          ? { equals: Prisma.DbNull }
          : { not: Prisma.DbNull },
    };

    const { data, nextCursor } = await paginateWithCursor<
      QuizWithUser & { _count: { questions: number } },
      "createdAt"
    >({
      delegate: this.prisma.quiz,
      query,
      where,
      orderByField: "createdAt",
      orderDirection: "desc",
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    const mapped = data.map((quiz): QuizListItem => {
      const published =
        query.status === QUIZ_STATUS_FILTER.PUBLISHED
          ? (quiz.publishedDetails as unknown as PublishedDetails)
          : null;

      return {
        id: quiz.id,
        title: published ? published.title : quiz.title,
        description: published ? published.description : quiz.description,
        theme: published ? published.theme : quiz.theme,
        coverImage: published ? published.coverImage : quiz.coverImage,
        visibility: published ? published.visibility : quiz.visibility,
        lastModified: quiz.updatedAt,
        user: {
          name: `${quiz.user.firstName} ${quiz.user.lastName}`,
          avatar: null,
        },
        questionCount: published
          ? published.questions.length
          : quiz._count.questions,
        isDraft: published === null,
        hasUnsavedChanges: this.hasUnsavedChanges(quiz),
      };
    });

    return {
      data: mapped,
      nextCursor,
    };
  }

  async getQuizById(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    this.verifyOwnership(quiz, userId);

    return {
      quiz,
      errors: this.validationService.runValidation(quiz),
    };
  }

  async upsert(userId: string, quizId: string, payload: UpsertQuizDTO) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { orderBy: { order: "asc" } } },
    });

    if (!quiz) {
      const { questions, ...quizData } = payload;

      const questionsPayload = questions.map((q, index) => ({
        id: q.id,
        ...this.buildQuestionData(q),
        order: index,
      }));

      const newQuiz = await this.prisma.quiz.create({
        data: {
          ...quizData,
          userId,
          questions: {
            create: questionsPayload,
          },
        },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
        },
      });

      return {
        errors: this.validationService.runValidation(newQuiz),
      };
    }

    this.verifyOwnership(quiz, userId);

    return this.prisma.$transaction(async (tx) => {
      const { id, questions, ...quizData } = payload;

      await tx.quiz.update({
        where: { id: quizId },
        data: quizData,
      });

      await this.saveQuestions(tx, quizId, questions, quiz.questions);

      const finalQuiz = await tx.quiz.findUnique({
        where: { id: quizId },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
        },
      });

      if (!finalQuiz) {
        throw new QuizNotFoundError();
      }

      return {
        errors: this.validationService.runValidation(finalQuiz),
      };
    });
  }

  async publishQuiz(
    userId: string,
    quizId: string,
    payload: UpsertQuizDTO,
  ) {
    const result = await this.upsert(userId, quizId, payload);
    if (result.errors !== null) {
      return { errors: result.errors };
    }

    const currentQuiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!currentQuiz) {
      throw new QuizNotFoundError();
    }

    const now = new Date();
    const snapshot: PublishedDetails = {
      title: currentQuiz.title,
      description: currentQuiz.description,
      theme: currentQuiz.theme,
      coverImage: currentQuiz.coverImage,
      visibility: currentQuiz.visibility,
      publishedAt: now,
      questions: currentQuiz.questions.map((q, index) => ({
        id: q.id,
        ...this.buildQuestionData(q),
        order: index,
      })),
    };

    await this.prisma.quiz.update({
      where: { id: quizId },
      data: {
        updatedAt: now,
        publishedDetails: snapshot as any,
      },
    });

    return { errors: null };
  }

  async getPlayableQuiz(userId: string | null, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    if (!quiz.publishedDetails) {
      throw new QuizNotPlayableError();
    }

    if (quiz.visibility === QuizVisibility.PRIVATE) {
      this.verifyOwnership(quiz, userId);
    }

    return {
      id: quiz.id,
      userId: quiz.userId,
      visibility: quiz.visibility,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      ...(quiz.publishedDetails as Record<string, unknown>),
    };
  }

  async getDiscoverQuizzes(query: CursorPaginationQueryDTO) {
    const where: Prisma.QuizWhereInput = {
      visibility: QuizVisibility.PUBLIC,
      publishedDetails: { not: Prisma.DbNull },
    };

    const { data, nextCursor } = await paginateWithCursor<
      QuizWithUser,
      "updatedAt"
    >({
      delegate: this.prisma.quiz,
      query,
      where,
      orderByField: "updatedAt",
      orderDirection: "desc",
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const mapped = data.map((quiz): QuizListItem => {
      const published = quiz.publishedDetails as unknown as PublishedDetails;
      return {
        id: quiz.id,
        title: published.title,
        description: published.description,
        theme: published.theme,
        coverImage: published.coverImage,
        visibility: published.visibility,
        lastModified: quiz.updatedAt,
        user: {
          name: `${quiz.user.firstName} ${quiz.user.lastName}`,
          avatar: null,
        },
        questionCount: published.questions.length,
        isDraft: false,
        hasUnsavedChanges: false,
      };
    });

    return {
      data: mapped,
      nextCursor,
    };
  }

  async deleteQuiz(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    this.verifyOwnership(quiz, userId);

    await this.prisma.quiz.delete({
      where: { id: quizId },
    });

    return { success: true };
  }

  private async saveQuestions(
    tx: Prisma.TransactionClient,
    quizId: string,
    incomingQuestions: DraftQuestionInput[],
    existingQuestions: Question[],
  ) {
    const existingIds = new Set(existingQuestions.map((q) => q.id));
    const incomingIds = new Set(incomingQuestions.map((q) => q.id));

    const toDeleteIds = [...existingIds].filter((id) => !incomingIds.has(id));
    if (toDeleteIds.length > 0) {
      await tx.question.deleteMany({
        where: {
          id: { in: toDeleteIds },
          quizId,
        },
      });
    }

    const promises = incomingQuestions.map((q, index) => {
      const data = { ...this.buildQuestionData(q), order: index };

      return tx.question.upsert({
        where: { id: q.id },
        create: { id: q.id, quizId: quizId, ...data },
        update: data,
      });
    });

    await Promise.all(promises);
  }

  private verifyOwnership(quiz: { userId: string }, userId: string | null) {
    if (!userId || quiz.userId !== userId) {
      throw new QuizForbiddenError();
    }
  }

  private hasUnsavedChanges(quiz: Quiz) {
    const published =
      quiz.publishedDetails as unknown as PublishedDetails | null;

    return published ? isAfter(quiz.updatedAt, published.publishedAt) : false;
  }

  private buildQuestionData(question: DraftQuestionInput | Question) {
    return {
      title: question.title,
      type: question.type,
      points: question.points,
      timeLimitMs: question.timeLimitMs,
      image: question.image,
      metadata: question.metadata as any,
    };
  }
}
