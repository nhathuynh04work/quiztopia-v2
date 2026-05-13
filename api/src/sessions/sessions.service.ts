import authConfiguration from "src/config/auth.config";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { type ConfigType } from "@nestjs/config";

@Injectable()
export class SessionsService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly prisma: PrismaService,
  ) {}

  async createSession(userId: string) {
    return this.prisma.session.create({
      data: {
        userId: userId,
        expiresAt: new Date(Date.now() + this.authConfig.refreshTokenExpiresMs),
      },
    });
  }

  async rotateSession(sessionId: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.session.updateMany({
        where: {
          id: sessionId,
          userId: userId,
          revoked: false,
          expiresAt: { gt: new Date() },
        },
        data: { revoked: true },
      });

      if (updated.count === 0) {
        throw new UnauthorizedException();
      }

      return tx.session.create({
        data: {
          userId: userId,
          expiresAt: new Date(
            Date.now() + this.authConfig.refreshTokenExpiresMs,
          ),
        },
      });
    });
  }

  async revokeSession(sessionId: string) {
    return this.prisma.session.updateMany({
      where: {
        id: sessionId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  async revokeAllSessionsOfUser(userId: string) {
    return this.prisma.session.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  cleanupExpiredSessions() {
    return this.prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  cleanupRevokedSessions() {
    return this.prisma.session.deleteMany({ where: { revoked: true } });
  }
}
