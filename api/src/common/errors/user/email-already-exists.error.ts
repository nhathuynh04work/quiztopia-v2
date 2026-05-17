import { AppError } from "../app-error";

export class EmailAlreadyExistsError extends AppError {
  readonly code = "EMAIL_ALREADY_EXISTS";
  readonly statusCode = 422;

  constructor() {
    super("Email already exists");
  }
}
