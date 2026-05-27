import { createZodDto } from "nestjs-zod";
import { PASSWORD_MIN_LENGTH } from "@/config/constants/auth.constant";
import z from "zod";
import {
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
} from "@/config/constants/user.constant";

const SignupSchema = z.object({
  email: z
    .email({
      error: "Invalid email format",
    })
    .toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH, {
    error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  }),
  firstName: z
    .string()
    .trim()
    .min(1, { error: "First name is required" })
    .max(MAX_FIRST_NAME_LENGTH, {
      error: `First name must be at most ${MAX_FIRST_NAME_LENGTH} characters`,
    })
    .refine((value) => /^\S+$/.test(value), {
      error: "First name must contain only one word",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { error: "Last name name is required" })
    .max(MAX_LAST_NAME_LENGTH, {
      error: `Last name must be at most ${MAX_LAST_NAME_LENGTH} characters`,
    }),
});

export class SignupDTO extends createZodDto(SignupSchema) {}
