import { PointsMode } from "@/generated/prisma/enums";
import { DEFAULT_TIME_LIMIT_MS } from "@/quizzes/constants/quiz.constant";
import z from "zod";

export const BaseQuestionDraftSchema = z.object({
  id: z.uuid(),
  title: z.string().trim(),
  points: z.enum(PointsMode),
  timeLimitMs: z.number().int().positive().default(DEFAULT_TIME_LIMIT_MS),
  image: z.url().nullable(),
});

export const BaseQuestionPublishSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(1, "Missing question text"),
  points: z.enum(PointsMode),
  timeLimitMs: z.number().int().positive("Time limit must be positive"),
  image: z.url().nullable(),
});
