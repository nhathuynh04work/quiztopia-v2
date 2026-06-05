import z from "zod";
import { QuestionType } from "@/generated/prisma/enums";
import {
  DEFAULT_POINTS,
  DEFAULT_TIME_LIMIT_MS,
} from "@/quizzes/constants/quiz.constant";

export const TextMetadataDraftSchema = z.object({
  acceptedAnswers: z.array(z.string().trim()),
});

export const TextQuestionDraftSchema = z.object({
  id: z.uuid().nullable(),
  type: z.literal(QuestionType.TEXT),
  title: z.string().trim().nullable(),
  points: z.number().int().min(0).default(DEFAULT_POINTS),
  timeLimitMs: z.number().int().positive().default(DEFAULT_TIME_LIMIT_MS),
  image: z.url().nullable(),
  metadata: TextMetadataDraftSchema,
  order: z.number().int().min(0).default(0),
});

export const TextMetadataPublishSchema = z.object({
  acceptedAnswers: z
    .array(z.string().trim().min(1, "Accepted answer cannot be blank"))
    .min(1, "Accepted answer not specified"),
});

export const TextQuestionPublishSchema = z.object({
  id: z.uuid(),
  type: z.literal(QuestionType.TEXT),
  title: z.string().trim().min(1, "Missing question text"),
  points: z.number().int().min(0, "Points cannot be negative"),
  timeLimitMs: z.number().int().positive("Time limit must be positive"),
  image: z.url().nullable(),
  metadata: TextMetadataPublishSchema,
  order: z.number().int().min(0, "Order must be a non-negative integer"),
});
