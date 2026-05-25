import authConfiguration from "@/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "@/common/prisma/prisma.service";
import { type ConfigType } from "@nestjs/config";

@Injectable()
export class SessionsService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly prisma: PrismaService,
  ) {}

  async revokeSession(sessionId: string) {
    return this.prisma.session.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeAllSessionsOfUser(userId: string) {
    return this.prisma.session.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  cleanupExpiredSessions() {
    return this.prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }

  cleanupRevokedSessions() {
    return this.prisma.session.deleteMany({
      where: { revokedAt: { not: null } },
    });
  }
}
