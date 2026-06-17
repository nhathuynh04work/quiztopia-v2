import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Prisma, QuizVisibility, Question } from "../generated/prisma/client";
import {
  GetQuizzesQueryDTO,
  PublishQuizPayloadDTO,
  UpsertQuizDTO,
} from "./schemas/quiz.schema";
import {
  QuizForbiddenError,
  QuizNotFoundError,
  QuizNotPlayableError,
} from "../common/errors/quiz/quiz.errors";
import { PaginationQueryDTO } from "../common/schemas/pagination.schema";
import { QuizzesValidationService } from "./validation/quizzes-validation.service";
import { DraftQuestionInput } from "./schemas/question.schema";
import { QUIZ_STATUS_FILTERS } from "./constants/filters";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: QuizzesValidationService,
  ) {}

  async getQuizzes(userId: string, query: GetQuizzesQueryDTO) {
    const where: any = { userId };
    if (query.status === QUIZ_STATUS_FILTERS.DRAFT) {
      where.publishedDetails = Prisma.DbNull;
    } else if (query.status === QUIZ_STATUS_FILTERS.PUBLISHED) {
      where.publishedDetails = { not: Prisma.DbNull };
    }

    const [total, data] = await Promise.all([
      this.prisma.quiz.count({ where }),
      this.prisma.quiz.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
        },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
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
      return this.prisma.$transaction(async (tx) => {
        const { id, questions, ...quizData } = payload;
        const newQuiz = await tx.quiz.create({
          data: {
            id: quizId,
            ...quizData,
            userId,
            questions: {
              create: questions.map((q, index) => ({
                id: q.id,
                ...this.buildQuestionData(q),
                order: index,
              })),
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
      });
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
    payload?: PublishQuizPayloadDTO,
  ) {
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

    return this.prisma.$transaction(async (tx) => {
      let currentQuiz = quiz;
      if (payload) {
        currentQuiz = await tx.quiz.update({
          where: { id: quizId },
          data: payload,
          include: {
            questions: {
              orderBy: { order: "asc" },
            },
          },
        });
      }

      const errors = this.validationService.runValidation(currentQuiz);
      if (errors !== null) {
        return { errors };
      }

      const snapshot = {
        title: currentQuiz.title,
        description: currentQuiz.description,
        theme: currentQuiz.theme,
        coverImage: currentQuiz.coverImage,
        visibility: currentQuiz.visibility,
        questions: currentQuiz.questions.map((q, index) => ({
          id: q.id,
          ...this.buildQuestionData(q),
          order: index,
        })),
      };

      await tx.quiz.update({
        where: { id: quizId },
        data: {
          publishedDetails: snapshot,
        },
      });

      return { errors: null };
    });
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
      ...(quiz.publishedDetails as any),
    };
  }

  async getDiscoverQuizzes(query: PaginationQueryDTO) {
    const where = {
      visibility: QuizVisibility.PUBLIC,
      publishedDetails: { not: Prisma.DbNull },
    };

    const [total, quizzes] = await Promise.all([
      this.prisma.quiz.count({ where }),
      this.prisma.quiz.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    const data = quizzes.map((q) => ({
      id: q.id,
      userId: q.userId,
      visibility: q.visibility,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
      ...(q.publishedDetails as any),
    }));

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
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

  private buildQuestionData(q: DraftQuestionInput | Question) {
    return {
      title: q.title,
      type: q.type,
      points: q.points,
      timeLimitMs: q.timeLimitMs,
      image: q.image,
      metadata: q.metadata as any,
    };
  }
}
