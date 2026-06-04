import { Inject, Injectable } from "@nestjs/common";
import { compare, hashSync } from "bcrypt";
import { UsersService } from "@/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";
import { AuthUser } from "./auth.type";
import { TokensService } from "@/tokens/tokens.service";
import { InvalidCredentialsError } from "@/common/errors/auth/invalid-credentials.error";
import { PrismaService } from "@/common/prisma/prisma.service";
import type { ConfigType } from "@nestjs/config";
import { addMilliseconds } from "date-fns";
import { ActiveSessionLimitReachedError } from "@/common/errors/auth/active-session-limit-reached.error";
import { LocalLoginDTO } from "./schemas/local-login.schema";
import { SessionMetadata } from "@/sessions/metadata/session-metadata.type";
import { PinoLogger } from "nestjs-pino";
import { authConfiguration } from "@/config";

const FAKE_HASH = hashSync("quiztopia-v2-fake", 10);

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async signup(payload: SignupDTO) {
    const newUser = await this.usersService.create(payload);

    return newUser;
  }

  async authenticateWithPassword({ email, password }: LocalLoginDTO) {
    const existingUser = await this.usersService.findByEmailWithPassword(email);
    const hashedPassword = existingUser?.password ?? FAKE_HASH;

    const isPasswordValid = await compare(password, hashedPassword);

    if (!existingUser || !isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = existingUser;
    return safeUser;
  }

  async login(user: AuthUser, metadata: SessionMetadata) {
    return await this.prisma.$transaction(async (tx) => {
      /* 
        This `executeRaw` statement will lock a user row.
        When 2 concurrent requests happen, the second one will wait for the transaction
        to release the lock on the user row before counting the session.
        This prevents the case where both request gets the same count of 4
        and 2 new sessions get created with no error thrown. 
        With the lock, the latter requests will get the count of 5 instead of 4
        and therefore the error will throw normally.
        Note: we choose the User row because it's more reliable than locking a Session row.
        This mechanism is to ensure the 2nd request wait for the 1st one to execute all commands,
        not for data integrity.
       */
      await tx.$executeRaw`
        SELECT id
        FROM "User"
        WHERE id = ${user.id}
        FOR UPDATE
      `;

      const activeSessionCount = await tx.session.count({
        where: {
          userId: user.id,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
      });

      if (activeSessionCount >= this.authConfig.maxActiveSessionCount) {
        throw new ActiveSessionLimitReachedError();
      }

      const sessionId = crypto.randomUUID();
      const tokens = this.tokensService.generateAuthTokens(user.id, sessionId);

      const refreshTokenHash = this.tokensService.hashToken(
        tokens.refreshToken,
      );

      await tx.session.create({
        data: {
          id: sessionId,
          userId: user.id,
          currentHash: refreshTokenHash,
          ...metadata,
          expiresAt: addMilliseconds(
            new Date(),
            this.authConfig.refreshTokenExpiresMs,
          ),
        },
      });

      return tokens;
    });
  }
}
