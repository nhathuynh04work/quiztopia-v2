import { Inject, Injectable, Logger } from "@nestjs/common";
import { compare, hashSync } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";
import { AuthUser } from "./auth.type";
import { TokensService } from "src/tokens/tokens.service";
import { InvalidCredentialsError } from "src/common/errors/auth/invalid-credentials.error";
import { PrismaService } from "src/common/prisma/prisma.service";
import type { ConfigType } from "@nestjs/config";
import authConfiguration from "src/config/auth.config";
import { addMilliseconds } from "date-fns";

const FAKE_HASH = hashSync("quiztopia-v2-fake", 10);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly prisma: PrismaService,
  ) {}

  async signup(payload: SignupDTO) {
    const newUser = await this.usersService.create(payload);

    return newUser;
  }

  async authenticateWithPassword(email: string, password: string) {
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

  async login(user: AuthUser) {
    return await this.prisma.$transaction(async (tx) => {
      const tempSession = await tx.session.create({
        data: {
          userId: user.id,
          currentHash: "",
          expiresAt: addMilliseconds(
            new Date(),
            this.authConfig.refreshTokenExpiresMs,
          ),
        },
      });

      const tokens = this.tokensService.generateAuthTokens(
        user.id,
        tempSession.id,
      );

      const refreshTokenHash = this.tokensService.hashToken(
        tokens.refreshToken,
      );

      await tx.session.update({
        where: { id: tempSession.id },
        data: { currentHash: refreshTokenHash },
      });

      return tokens;
    });
  }

  async loginWithPassword(email: string, password: string) {
    const user = await this.authenticateWithPassword(email, password);
    const tokens = await this.login(user);

    return tokens;
  }
}
