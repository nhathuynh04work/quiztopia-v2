import z from "zod";
import { createZodDto } from "nestjs-zod";
import { DraftQuestionSchema, PublishQuestionSchema } from "./question.schema";
import { QuizVisibility } from "@/generated/prisma/enums";
import { PaginationQuerySchema } from "@/common/schemas/pagination.schema";
import {
  QUIZ_STATUS_FILTER_VALUES,
  QUIZ_STATUS_FILTERS,
} from "../constants/filters";
import {
  MAX_QUIZ_TITLE_LENGTH,
  MAX_QUIZ_DESCRIPTION_LENGTH,
} from "../constants/constraints";

const UpsertQuizSchema = z.object({
  id: z.uuid(),
  title: z
    .string()
    .trim()
    .max(
      MAX_QUIZ_TITLE_LENGTH,
      `Title must be at most ${MAX_QUIZ_TITLE_LENGTH} characters`,
    ),
  description: z
    .string()
    .trim()
    .max(
      MAX_QUIZ_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_QUIZ_DESCRIPTION_LENGTH} characters`,
    ),
  theme: z.string().trim(),
  coverImage: z.url().nullable(),
  visibility: z.enum(QuizVisibility),
  questions: z.array(DraftQuestionSchema).min(1, "Quiz must contain questions"),
});

export const GetQuizzesQuerySchema = PaginationQuerySchema.extend({
  status: z.enum(QUIZ_STATUS_FILTER_VALUES).default(QUIZ_STATUS_FILTERS.ALL),
});

const PublishQuizPayloadSchema = z.object({
  title: z
    .string()
    .trim()
    .max(
      MAX_QUIZ_TITLE_LENGTH,
      `Title must be at most ${MAX_QUIZ_TITLE_LENGTH} characters`,
    ),
  description: z
    .string()
    .trim()
    .max(
      MAX_QUIZ_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_QUIZ_DESCRIPTION_LENGTH} characters`,
    ),
  theme: z.string().trim(),
  visibility: z.enum(QuizVisibility),
});

export const PublishQuizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Missing quiz title")
    .max(
      MAX_QUIZ_TITLE_LENGTH,
      `Title must be at most ${MAX_QUIZ_TITLE_LENGTH} characters`,
    ),
  description: z
    .string()
    .trim()
    .max(
      MAX_QUIZ_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_QUIZ_DESCRIPTION_LENGTH} characters`,
    ),
  theme: z.string().trim(),
  coverImage: z.url().nullable(),
  visibility: z.enum(QuizVisibility),
  questions: z
    .array(PublishQuestionSchema)
    .min(1, "Quiz must contain questions"),
});

export class UpsertQuizDTO extends createZodDto(UpsertQuizSchema) {}

export class GetQuizzesQueryDTO extends createZodDto(GetQuizzesQuerySchema) {}

export class PublishQuizPayloadDTO extends createZodDto(
  PublishQuizPayloadSchema,
) {}
