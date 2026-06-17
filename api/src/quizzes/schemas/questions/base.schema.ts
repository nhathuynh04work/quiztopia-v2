import { PointsMode } from "@/generated/prisma/enums";
import { DEFAULT_TIME_LIMIT_MS } from "@/quizzes/constants/defaults";
import z from "zod";
import { MAX_QUESTION_TITLE_LENGTH } from "../../constants/constraints";

export const BaseQuestionDraftSchema = z.object({
  id: z.uuid(),
  title: z
    .string()
    .trim()
    .max(
      MAX_QUESTION_TITLE_LENGTH,
      `Question text must be at most ${MAX_QUESTION_TITLE_LENGTH} characters`,
    ),
  points: z.enum(PointsMode),
  timeLimitMs: z.number().int().positive().default(DEFAULT_TIME_LIMIT_MS),
  image: z.url().nullable(),
});

export const BaseQuestionPublishSchema = z.object({
  id: z.uuid(),
  title: z
    .string()
    .trim()
    .min(1, "Missing question title")
    .max(
      MAX_QUESTION_TITLE_LENGTH,
      `Question text must be at most ${MAX_QUESTION_TITLE_LENGTH} characters`,
    ),
  points: z.enum(PointsMode),
  timeLimitMs: z.number().int().positive("Time limit must be positive"),
  image: z.url().nullable(),
});
