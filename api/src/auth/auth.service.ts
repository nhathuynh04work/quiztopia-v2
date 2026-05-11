import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./schemas/signup.schema";

const FAKE_HASH = "quiztopia-fake-hash";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

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
}
