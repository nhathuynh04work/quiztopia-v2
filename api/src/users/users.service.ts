import authConfiguration from "@/config/auth.config";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@/common/prisma/prisma.service";
import { hash } from "bcrypt";
import { SignupDTO } from "@/auth/schemas/signup.schema";
import { type ConfigType } from "@nestjs/config";
import { EmailAlreadyExistsError } from "@/common/errors/user/email-already-exists.error";
import { Prisma } from "@/generated/prisma/client";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
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
    const hashedPassword = await hash(
      payload.password,
      this.authConfig.bcryptRounds,
    );
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
          throw new EmailAlreadyExistsError();
        }
      }

      throw err;
    }
  }
}
