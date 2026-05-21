import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { addSeconds } from "date-fns";
import { InvalidCredentialsError } from "src/common/errors/auth/invalid-credentials.error";
import { ReplayAttackDetectedError } from "src/common/errors/session/replay-attack-detected.error";
import { PrismaService } from "src/common/prisma/prisma.service";
import authConfiguration from "src/config/auth.config";
import { Session } from "src/generated/prisma/client";
import { TokensService } from "src/tokens/tokens.service";
import { SessionsService } from "./sessions.service";

@Injectable()
export class SessionRotationService {
  private readonly logger = new Logger(SessionRotationService.name);

  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly prisma: PrismaService,
    private readonly tokensService: TokensService,
    private readonly sessionsService: SessionsService,
  ) {}

  async rotateSession(sessionId: string, refreshToken: string) {
    const tokenHash = this.tokensService.hashToken(refreshToken);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const session = await tx.session.findUnique({
          where: { id: sessionId },
        });

        if (!session || session.revokedAt || session.expiresAt < new Date()) {
          throw new InvalidCredentialsError();
        }

        if (
          session.currentHash !== tokenHash &&
          session.previousHash !== tokenHash
        ) {
          throw new InvalidCredentialsError();
        }

        if (this.isReplayAttack(session, tokenHash)) {
          throw new ReplayAttackDetectedError(sessionId);
        }

        if (this.isConcurrentRotation(session, tokenHash)) {
          return this.handleConcurrentRotation(sessionId);
        }

        const newTokens = this.tokensService.generateAuthTokens(
          session.userId,
          session.id,
        );
        const newHash = this.tokensService.hashToken(newTokens.refreshToken);

        const { count } = await tx.session.updateMany({
          where: {
            id: session.id,
            currentHash: tokenHash,
            revokedAt: null,
          },
          data: {
            currentHash: newHash,
            previousHash: tokenHash,
            previousValidUntil: addSeconds(
              new Date(),
              this.authConfig.graceWindowMs / 1000,
            ),
          },
        });

        if (count === 0) {
          return this.handleConcurrentRotation(sessionId);
        }

        return newTokens;
      });
    } catch (error) {
      if (error instanceof ReplayAttackDetectedError) {
        return await this.handleReplayAttackDetected(sessionId);
      }

      throw error;
    }
  }

  private handleConcurrentRotation(sessionId: string) {
    this.logger.warn(
      `Concurrent requests detected for sessionId ${sessionId}: Implement return cached token later`,
    );
    throw new InvalidCredentialsError();
  }

  private async handleReplayAttackDetected(sessionId: string) {
    this.logger.warn(`Replay attack detected for sessionId ${sessionId}`);
    await this.sessionsService.revokeSession(sessionId);
    throw new ReplayAttackDetectedError(sessionId);
  }

  private isReplayAttack(session: Session, tokenHash: string) {
    return (
      session.previousHash === tokenHash &&
      (!session.previousValidUntil || session.previousValidUntil < new Date())
    );
  }

  private isConcurrentRotation(session: Session, tokenHash: string) {
    return (
      session.previousHash === tokenHash &&
      session.previousValidUntil &&
      session.previousValidUntil > new Date()
    );
  }
}
