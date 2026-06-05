import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Prisma, QuizVisibility, Question } from "../generated/prisma/client";
import {
  CreateQuizDTO,
  GetQuizzesQueryDTO,
  PublishQuizPayloadDTO,
  UpdateQuizDTO,
} from "./schemas/quiz.schema";
import {
  QuizForbiddenError,
  QuizNotFoundError,
  QuizPublishValidationError,
  QuizNotPlayableError,
} from "../common/errors/quiz/quiz.errors";
import { PaginationQueryDTO } from "../common/schemas/pagination.schema";
import { QUIZ_STATUS_FILTERS } from "./constants/quiz.constant";
import { QuizzesValidationService } from "./quizzes-validation.service";
import { DraftQuestionInput } from "./schemas/question.schema";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: QuizzesValidationService,
  ) {}

  async createQuiz(userId: string, payload: CreateQuizDTO) {
    const { questions, ...quizData } = payload;

    return this.prisma.quiz.create({
      data: {
        ...quizData,
        userId,
        questions: {
          create: payload.questions.map((q) => ({
            ...this.buildQuestionData(q),
          })),
        },
      },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    });
  }

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
      ...quiz,
      validation: this.validationService.runValidation(quiz),
    };
  }

  async updateQuiz(userId: string, quizId: string, payload: UpdateQuizDTO) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    this.verifyOwnership(quiz, userId);

    return this.prisma.$transaction(async (tx) => {
      const { questions, ...quizData } = payload;

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
        quiz: finalQuiz,
        validation: this.validationService.runValidation(finalQuiz),
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

      const validationReport =
        this.validationService.runValidation(currentQuiz);
      if (!validationReport.isValid) {
        throw new QuizPublishValidationError(validationReport.errors!);
      }

      const snapshot = {
        title: currentQuiz.title,
        coverImage: currentQuiz.coverImage,
        visibility: currentQuiz.visibility,
        questions: currentQuiz.questions.map((q) => ({
          id: q.id,
          ...this.buildQuestionData(q),
        })),
      };

      const updatedQuiz = await tx.quiz.update({
        where: { id: quizId },
        data: {
          publishedDetails: snapshot,
        },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
        },
      });

      return {
        quiz: updatedQuiz,
        validation: { isValid: true, errors: null },
      };
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
    const incomingIds = new Set(
      incomingQuestions.map((q) => q.id).filter((id): id is string => !!id),
    );

    const toDeleteIds = [...existingIds].filter((id) => !incomingIds.has(id));
    if (toDeleteIds.length > 0) {
      await tx.question.deleteMany({
        where: {
          id: { in: toDeleteIds },
          quizId,
        },
      });
    }

    const promises = incomingQuestions.map((q) => {
      if (q.id && existingIds.has(q.id)) {
        return tx.question.update({
          where: { id: q.id },
          data: this.buildQuestionData(q),
        });
      }

      return tx.question.create({
        data: {
          ...this.buildQuestionData(q),
          quizId,
        },
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
      order: q.order,
    };
  }
}
