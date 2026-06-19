import { createZodDto } from "nestjs-zod";
import z from "zod";
import { DEFAULT_LIMIT } from "../constants/cursor-pagination.constant";

export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.preprocess(
    (val) => (val ? parseInt(val as string, 10) : undefined),
    z.number().int().positive().default(DEFAULT_LIMIT),
  ),
});

export class CursorPaginationQueryDTO extends createZodDto(
  CursorPaginationQuerySchema,
) {}
