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
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { type Cache } from "cache-manager";
import { AuthTokens } from "src/tokens/tokens.type";

@Injectable()
export class SessionRotationService {
  private readonly logger = new Logger(SessionRotationService.name);

  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly prisma: PrismaService,
    private readonly tokensService: TokensService,
    private readonly sessionsService: SessionsService,
  ) {}

  async rotateSession(sessionId: string, refreshToken: string) {
    const tokenHash = this.tokensService.hashToken(refreshToken);

    try {
      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!session || this.isSessionInvalid(session, tokenHash)) {
        throw new InvalidCredentialsError();
      }

      if (this.isReplayAttack(session, tokenHash)) {
        throw new ReplayAttackDetectedError(sessionId);
      }

      if (this.isConcurrentRotation(session, tokenHash)) {
        return this.handleConcurrentRotation(tokenHash);
      }

      return await this.handleNormalRotation(session, tokenHash);
    } catch (error) {
      if (error instanceof ReplayAttackDetectedError) {
        return await this.handleReplayAttackDetected(sessionId);
      }

      throw error;
    }
  }

  private async handleNormalRotation(session: Session, tokenHash: string) {
    const newTokens = this.tokensService.generateAuthTokens(
      session.userId,
      session.id,
    );
    const newHash = this.tokensService.hashToken(newTokens.refreshToken);

    const { count } = await this.prisma.session.updateMany({
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
      return this.handleConcurrentRotation(tokenHash);
    }

    await this.cacheManager.set(
      tokenHash,
      newTokens,
      this.authConfig.graceWindowMs + 2000,
    );

    return newTokens;
  }

  private async handleConcurrentRotation(tokenHash: string) {
    const cached = await this.cacheManager.get<AuthTokens>(tokenHash);

    if (!cached) {
      throw new InvalidCredentialsError();
    }

    return cached;
  }

  private async handleReplayAttackDetected(sessionId: string) {
    this.logger.warn(`Replay attack detected for sessionId ${sessionId}`);
    await this.sessionsService.revokeSession(sessionId);
    throw new ReplayAttackDetectedError(sessionId);
  }

  private isSessionInvalid(session: Session, tokenHash: string) {
    return (
      session.revokedAt ||
      session.expiresAt < new Date() ||
      (session.currentHash !== tokenHash && session.previousHash !== tokenHash)
    );
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
