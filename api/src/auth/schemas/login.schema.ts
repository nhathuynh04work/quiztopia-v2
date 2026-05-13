import { createZodDto } from "nestjs-zod";
import { PASSWORD_MIN_LENGTH } from "src/config/constants/auth.constant";
import z from "zod";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export class LoginDTO extends createZodDto(LoginSchema) {}
