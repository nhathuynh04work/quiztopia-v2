import { createZodValidationPipe } from "nestjs-zod";
import z, { ZodError } from "zod";
import { ValidationError } from "../errors/validation/validation.error";

export const ZodValidationPipe = createZodValidationPipe({
  createValidationException: (error) => {
    if (!(error instanceof ZodError)) {
      return new Error("Unknown validation error");
    }

    return new ValidationError(z.flattenError(error).fieldErrors);
  },
});
