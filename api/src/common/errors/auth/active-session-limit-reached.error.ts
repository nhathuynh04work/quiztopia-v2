import { AppError } from "../app-error";

export class ActiveSessionLimitReachedError extends AppError {
  readonly code = "ACTIVE_SESSION_LIMIT_REACHED";
  readonly statusCode = 409;

  constructor() {
    super("Maximum active sessions reached");
  }
}
