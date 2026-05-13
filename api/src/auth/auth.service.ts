import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { compare, hashSync } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";
import { AuthUser, RefreshAuthUser } from "./auth.type";
import { SessionsService } from "src/sessions/sessions.service";
import { TokensService } from "src/tokens/tokens.service";

const FAKE_HASH = hashSync("quiztopia-v2-fake", 10);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly tokensService: TokensService,
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
      throw new UnauthorizedException("Invalid credentials");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = existingUser;
    return safeUser;
  }

  async login(user: AuthUser) {
    const newSession = await this.sessionsService.createSession(user.id);

    return this.tokensService.generateAuthTokens(user.id, newSession.id);
  }

  async loginWithPassword(email: string, password: string) {
    const user = await this.authenticateWithPassword(email, password);
    const tokens = await this.login(user);

    return tokens;
  }

  async refresh(user: RefreshAuthUser) {
    const newSession = await this.sessionsService.rotateSession(
      user.jti,
      user.id,
    );

    return this.tokensService.generateAuthTokens(user.id, newSession.id);
  }
}
