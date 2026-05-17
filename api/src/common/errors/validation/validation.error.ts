import { AppError } from "../app-error";

export class ValidationError extends AppError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 400;

  constructor(public readonly fieldErrors: Record<string, string[]>) {
    super("Validation failed");
  }
}
