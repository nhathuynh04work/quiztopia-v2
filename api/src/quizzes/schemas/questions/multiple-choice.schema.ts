import { QuestionType } from "@/generated/prisma/enums";
import { DEFAULT_POINTS, DEFAULT_TIME_LIMIT_MS } from "@/quizzes/constants/quiz.constant";
import z from "zod";

export const OptionDraftSchema = z.object({
  id: z.uuid().nullable(),
  title: z.string().trim(),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataDraftSchema = z.object({
  options: z.array(OptionDraftSchema),
});

export const MultipleChoiceQuestionDraftSchema = z.object({
  id: z.uuid().nullable(),
  type: z.literal(QuestionType.MULTIPLE_CHOICE),
  title: z.string().trim().nullable(),
  points: z.number().int().min(0).default(DEFAULT_POINTS),
  timeLimitMs: z.number().int().positive().default(DEFAULT_TIME_LIMIT_MS),
  image: z.url().nullable(),
  metadata: MultipleChoiceMetadataDraftSchema,
  order: z.number().int().min(0).default(0),
});

export const OptionPublishSchema = z.object({
  id: z.uuid("Invalid option ID"),
  title: z.string().trim().min(1, "Missing option text"),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataPublishSchema = z.object({
  options: z
    .array(OptionPublishSchema)
    .min(2, "At least two options required")
    .refine(
      (opts) => opts.some((o) => o.isCorrect),
      "Correct answer not specified",
    ),
});

export const MultipleChoiceQuestionPublishSchema = z.object({
  id: z.uuid(),
  type: z.literal(QuestionType.MULTIPLE_CHOICE),
  title: z.string().trim().min(1, "Missing question text"),
  points: z.number().int().min(0, "Points cannot be negative"),
  timeLimitMs: z.number().int().positive("Time limit must be positive"),
  image: z.url().nullable(),
  metadata: MultipleChoiceMetadataPublishSchema,
  order: z.number().int().min(0, "Order must be a non-negative integer"),
});
