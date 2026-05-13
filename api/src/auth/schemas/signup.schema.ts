import { createZodDto } from "nestjs-zod";
import { PASSWORD_MIN_LENGTH } from "src/config/constants/auth.constant";
import z from "zod";

const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  name: z.string().min(1),
});

export class SignupDTO extends createZodDto(SignupSchema) {}
