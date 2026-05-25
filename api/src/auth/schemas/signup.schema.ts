import { createZodDto } from "nestjs-zod";
import { PASSWORD_MIN_LENGTH } from "@/config/constants/auth.constant";
import z from "zod";

const SignupSchema = z.object({
  email: z.email({
    error: "Invalid email format",
  }),
  password: z.string().min(PASSWORD_MIN_LENGTH, {
    error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  }),
  name: z.string().min(1, { error: "Name is required" }),
});

export class SignupDTO extends createZodDto(SignupSchema) {}
