import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcrypt";
import { Prisma } from "../generated/prisma/client";
import { SignupDTO } from "src/auth/schemas/signup.schema";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      omit: {
        password: true,
      },
    });
  }

  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(payload: SignupDTO) {
    const hashedPassword = await hash(payload.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: payload.email.toLowerCase().trim(),
          password: hashedPassword,
          name: payload.name.trim(),
        },
        select: {
          email: true,
          name: true,
        },
      });

      return user;
    } catch (err: unknown) {
      this.logger.error(
        `Failed to create new user with email: ${payload.email}`,
        err instanceof Error ? err.stack : undefined,
      );

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new UnprocessableEntityException("Email already in use");
        }
      }

      throw err;
    }
  }
}
