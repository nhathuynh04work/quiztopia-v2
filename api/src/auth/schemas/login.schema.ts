import { createZodDto } from "nestjs-zod";
import { PASSWORD_MIN_LENGTH } from "src/config/constants/auth.constant";
import z from "zod";

const LoginSchema = z.object({
  email: z.email({
    error: "Invalid email format",
  }),
  password: z.string().min(PASSWORD_MIN_LENGTH, {
    error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  }),
});

export class LoginDTO extends createZodDto(LoginSchema) {}
