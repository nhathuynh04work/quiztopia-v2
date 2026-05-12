import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { compare, hashSync } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";
import {
  AuthenticatedUser,
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload,
} from "./auth.type";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import authConfiguration from "../config/auth.config";
import { type ConfigType } from "@nestjs/config";
import { TOKEN_TYPES } from "src/config/constants/auth.constant";

const FAKE_HASH = hashSync("quiztopia-v2-fake", 10);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {}

  async authenticateWithPassword(email: string, password: string) {
    const existingUser = await this.usersService.findByEmailWithPassword(email);
    const hashedPassword = existingUser?.password ?? FAKE_HASH;

    const isPasswordValid = await compare(password, hashedPassword);

    if (!existingUser || !isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = existingUser;
    return safeUser;
  }

  async signup(payload: SignupDTO) {
    const newUser = await this.usersService.create(payload);

    return newUser;
  }

  async login(user: AuthenticatedUser) {
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + this.authConfig.refreshTokenExpiresMs),
      },
    });

    const accessToken = this.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = this.generateRefreshToken({
      userId: user.id,
      sessionId: session.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  generateAccessToken(payload: { userId: string; email: string }) {
    const accessTokenPayload: JwtAccessTokenPayload = {
      sub: payload.userId,
      email: payload.email,
      type: TOKEN_TYPES.ACCESS,
    };

    return this.jwtService.sign(accessTokenPayload, {
      secret: this.authConfig.jwtAccessSecret,
      expiresIn: this.authConfig.accessTokenExpiresMs / 1000,
    });
  }

  generateRefreshToken(payload: { userId: string; sessionId: string }) {
    const refreshTokenPayload: JwtRefreshTokenPayload = {
      sub: payload.userId,
      jti: payload.sessionId,
      type: TOKEN_TYPES.REFRESH,
    };

    return this.jwtService.sign(refreshTokenPayload, {
      secret: this.authConfig.jwtRefreshSecret,
      expiresIn: this.authConfig.refreshTokenExpiresMs / 1000,
    });
  }

  async loginWithPassword(email: string, password: string) {
    const user = await this.authenticateWithPassword(email, password);
    const tokens = await this.login(user);

    return tokens;
  }
}
