import { Injectable } from "@nestjs/common";
import z from "zod";
import { PublishQuizSchema } from "./schemas/quiz.schema";

export interface QuizValidationErrors {
  title?: string;
  questionsGlobal?: string;
  questions: Record<string, string[]>;
}

export interface QuizValidationReport {
  isValid: boolean;
  errors: QuizValidationErrors | null;
}

@Injectable()
export class QuizzesValidationService {
  runValidation(quiz: any): QuizValidationReport {
    const parsed = PublishQuizSchema.safeParse({
      title: quiz.title,
      coverImage: quiz.coverImage,
      visibility: quiz.visibility,
      questions: quiz.questions,
    });

    if (parsed.success) {
      return { isValid: true, errors: null };
    }

    return {
      isValid: false,
      errors: this.formatValidationErrors(quiz, parsed.error),
    };
  }

  private formatValidationErrors(
    quiz: any,
    zodError: z.ZodError,
  ): QuizValidationErrors {
    const errors: QuizValidationErrors = { questions: {} };

    for (const issue of zodError.issues) {
      const path = issue.path;

      if (path[0] === "title") {
        errors.title = issue.message;
      } else if (path[0] === "questions") {
        if (path.length === 1) {
          errors.questionsGlobal = issue.message;
          continue;
        }

        const index = path[1] as number;
        const question = quiz.questions[index];
        if (!question) continue;

        const qId = question.id;
        if (!errors.questions[qId]) {
          errors.questions[qId] = [];
        }
        errors.questions[qId].push(issue.message);
      }
    }

    return errors;
  }
}
