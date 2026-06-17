import { Injectable } from "@nestjs/common";
import z from "zod";
import { PublishQuizSchema } from "../schemas/quiz.schema";
import {
  QuestionValidationError,
  QuizValidationError,
} from "./quizzes-validation.type";
import { Question, Quiz } from "@/generated/prisma/client";

@Injectable()
export class QuizzesValidationService {
  runValidation(quiz: any): QuizValidationError | null {
    const parsed = PublishQuizSchema.safeParse({
      title: quiz.title,
      description: quiz.description,
      theme: quiz.theme,
      coverImage: quiz.coverImage,
      visibility: quiz.visibility,
      questions: quiz.questions,
    });

    if (parsed.success) {
      return null;
    }

    return this.formatValidationErrors(quiz, parsed.error);
  }

  private formatValidationErrors(
    quiz: Quiz & { questions: Question[] },
    zodError: z.ZodError,
  ): QuizValidationError {
    const result: QuizValidationError = {
      title: "",
      questions: [],
    };

    const questionErrorMap = new Map<string, QuestionValidationError>();

    for (const issue of zodError.issues) {
      const path = issue.path;

      if (path[0] === "title") {
        result.title = issue.message;
        continue;
      }

      if (path[0] !== "questions") {
        continue;
      }

      const index = path[1];

      if (typeof path[1] !== "number") {
        continue;
      }

      const question = quiz.questions[index];

      if (!question) {
        continue;
      }

      const { id } = question;

      const existing = questionErrorMap.get(id);

      if (existing) {
        existing.errors.push(issue.message);
        continue;
      }

      questionErrorMap.set(id, { id, errors: [issue.message] });
    }

    result.questions = Array.from(questionErrorMap.values());

    return result;
  }
}
