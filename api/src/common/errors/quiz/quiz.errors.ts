import { AppError } from "../app-error";
import { ValidationErrors } from "../../../quizzes/quizzes-validation.service";

export class QuizNotFoundError extends AppError {
  readonly code = "QUIZ_NOT_FOUND";
  readonly statusCode = 404;

  constructor(message: string = "Quiz not found") {
    super(message);
  }
}

export class QuizForbiddenError extends AppError {
  readonly code = "QUIZ_FORBIDDEN";
  readonly statusCode = 403;

  constructor(message: string = "You do not own this quiz") {
    super(message);
  }
}

export class QuizPublishValidationError extends AppError {
  readonly code = "QUIZ_PUBLISH_VALIDATION";
  readonly statusCode = 400;

  constructor(public readonly errors: ValidationErrors) {
    super("Quiz validation failed, cannot publish");
  }
}

export class QuizNotPlayableError extends AppError {
  readonly code = "QUIZ_NOT_PLAYABLE";
  readonly statusCode = 400;

  constructor() {
    super("This quiz has no published version");
  }
}
