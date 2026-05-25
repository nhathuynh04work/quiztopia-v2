import { AppError } from "../app-error";

export class ReplayAttackDetectedError extends AppError {
  readonly code = "REPLAY_ATTACK_DETECTED";
  readonly statusCode = 403;

  constructor(sessionId: string) {
    super(`Replay attack detected for sessionId ${sessionId}`);
  }
}
