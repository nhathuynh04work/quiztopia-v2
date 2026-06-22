import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { isAfter } from "date-fns";
import {
  Prisma,
  QuizVisibility,
  Quiz,
  Question,
} from "../../generated/prisma/client";
import { GetQuizzesQueryDTO } from "../schemas/quiz.schema";
import { QuizNotFoundError } from "../../common/errors/quiz/quiz.errors";
import { CursorPaginationQueryDTO } from "../../common/schemas/cursor-pagination.schema";
import { QuizzesValidationService } from "../validation/quizzes-validation.service";
import { QUIZ_STATUS_FILTER } from "../constants/filters";
import { paginateWithCursor } from "../../common/prisma/cursor-pagination.helper";
import { JsonValue } from "@prisma/client/runtime/client";
import {
  QuizListItem,
  QuizForEditor,
  QuizForDrawer,
} from "./quiz-retrieval.type";
import { PublishedDetails } from "../types/published-details.type";
import { verifyQuizOwnership } from "../helpers/quiz-ownership.helper";

@Injectable()
export class QuizzesRetrievalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: QuizzesValidationService,
  ) {}

  async getQuizListItemsOfUser(userId: string, query: GetQuizzesQueryDTO) {
    const where: Prisma.QuizWhereInput = {
      userId,
      publishedDetails:
        query.status === QUIZ_STATUS_FILTER.DRAFT
          ? { equals: Prisma.DbNull }
          : { not: Prisma.DbNull },
    };

    const { data, nextCursor } = await paginateWithCursor<
      Quiz & {
        user: { firstName: string; lastName: string };
        _count: { questions: number };
      },
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

  async getQuizListItemsForDiscover(query: CursorPaginationQueryDTO) {
    const where: Prisma.QuizWhereInput = {
      visibility: QuizVisibility.PUBLIC,
      publishedDetails: { not: Prisma.DbNull },
    };

    const { data, nextCursor } = await paginateWithCursor<
      Quiz & {
        user: { firstName: string; lastName: string };
        _count: { questions: number };
      },
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

  async getQuizForEditor(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: "asc" },
          omit: { order: true },
        },
      },
      omit: {
        publishedDetails: true,
      },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    verifyQuizOwnership(quiz, userId);

    const mapped: QuizForEditor = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      theme: quiz.theme,
      coverImage: quiz.coverImage,
      visibility: quiz.visibility,
      questions: quiz.questions,
    };

    return {
      quiz: mapped,
      errors: this.validationService.runValidation(quiz),
    };
  }

  async getQuizForDrawer(quizId: string) {
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        id: quizId,
        visibility: QuizVisibility.PUBLIC,
        publishedDetails: { not: Prisma.DbNull },
      },
      select: {
        id: true,
        publishedDetails: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        questions: {
          orderBy: { order: "asc" },
          omit: { order: true },
        },
        updatedAt: true,
      },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    const published = quiz.publishedDetails as unknown as PublishedDetails;

    const mapped: QuizForDrawer = {
      id: quiz.id,
      title: published.title,
      description: published.description,
      theme: published.theme,
      coverImage: published.coverImage,
      visibility: published.visibility,
      questions: published.questions as Question[],
      hasUnsavedChanges: this.hasUnsavedChanges(quiz),
      user: {
        name: `${quiz.user.firstName} ${quiz.user.lastName}`,
        avatar: null,
      },
    };

    return {
      quiz: mapped,
    };
  }

  private hasUnsavedChanges(quiz: {
    publishedDetails: JsonValue;
    updatedAt: Date;
  }) {
    const published =
      quiz.publishedDetails as unknown as PublishedDetails | null;

    return published ? isAfter(quiz.updatedAt, published.publishedAt) : false;
  }
}
