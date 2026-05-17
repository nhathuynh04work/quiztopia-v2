import { AppError } from "../app-error";

export class InvalidCredentialsError extends AppError {
  readonly code = "INVALID_CREDENTIALS";
  readonly statusCode = 401;

  constructor() {
    super("Invalid credentials");
  }
}
