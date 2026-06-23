import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { Prisma, Question } from "../generated/prisma/client";
import { UpsertQuizDTO } from "./schemas/quiz.schema";
import { QuizNotFoundError } from "../common/errors/quiz/quiz.errors";
import { QuizzesValidationService } from "./validation/quizzes-validation.service";
import { DraftQuestionInput } from "./schemas/question.schema";
import { PublishedDetails } from "./types/published-details.type";
import { PinoLogger } from "nestjs-pino";
import { verifyQuizOwnership } from "./helpers/quiz-ownership.helper";

@Injectable()
export class QuizzesService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService,
    private readonly validationService: QuizzesValidationService,
  ) {
    this.logger.setContext(QuizzesService.name);
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

    verifyQuizOwnership(quiz, userId);

    return this.prisma.$transaction(async (tx) => {
      const { id: _, questions, ...quizData } = payload;

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

  async publishQuiz(userId: string, quizId: string, payload: UpsertQuizDTO) {
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
        publishedDetails: snapshot as unknown as Prisma.InputJsonValue,
      },
    });

    return { errors: null };
  }

  async deleteQuiz(userId: string, quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new QuizNotFoundError();
    }

    verifyQuizOwnership(quiz, userId);

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

  private buildQuestionData(question: DraftQuestionInput | Question) {
    return {
      title: question.title,
      type: question.type,
      points: question.points,
      timeLimitMs: question.timeLimitMs,
      image: question.image,
      metadata: question.metadata as unknown as Prisma.InputJsonValue,
    };
  }
}
