import { createZodDto } from "nestjs-zod";
import z from "zod";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../constants/pagination.constant";

export const PaginationQuerySchema = z.object({
  page: z.preprocess(
    (val) => (val ? parseInt(val as string, 10) : undefined),
    z.number().int().positive().default(DEFAULT_PAGE)
  ),
  limit: z.preprocess(
    (val) => (val ? parseInt(val as string, 10) : undefined),
    z.number().int().positive().default(DEFAULT_LIMIT)
  ),
});

export class PaginationQueryDTO extends createZodDto(PaginationQuerySchema) {}
