import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";
import { AuthenticatedUser, JwtAccessTokenPayload } from "./auth.type";
import { JwtService } from "@nestjs/jwt";

const FAKE_HASH = "quiztopia-fake-hash";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  login(user: AuthenticatedUser) {
    const jwtPayload: JwtAccessTokenPayload = {
      sub: user.id,
      email: user.email,
      type: "access",
    };

    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: "15m" });

    return {
      accessToken,
    };
  }

  async loginWithPassword(email: string, password: string) {
    const user = await this.authenticateWithPassword(email, password);
    const tokens = this.login(user);

    return tokens;
  }
}
