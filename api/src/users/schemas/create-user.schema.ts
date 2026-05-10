import { createZodDto } from "nestjs-zod";
import z from "zod";

const CreateUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
