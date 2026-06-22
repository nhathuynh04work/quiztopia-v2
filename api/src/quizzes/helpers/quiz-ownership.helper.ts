import { QuizForbiddenError } from "../../common/errors/quiz/quiz.errors";

export function verifyQuizOwnership(
  quiz: { userId: string },
  userId: string | null,
): void {
  if (!userId || quiz.userId !== userId) {
    throw new QuizForbiddenError();
  }
}
