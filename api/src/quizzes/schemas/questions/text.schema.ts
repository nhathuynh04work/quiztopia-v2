import { QuestionType } from "@/generated/prisma/enums";
import z from "zod";
import {
  BaseQuestionDraftSchema,
  BaseQuestionPublishSchema,
} from "./base.schema";

export const TextMetadataDraftSchema = z.object({
  acceptedAnswers: z.array(z.string().trim().toLowerCase()),
});

export const TextQuestionDraftSchema = BaseQuestionDraftSchema.extend({
  type: z.literal(QuestionType.TEXT),
  metadata: TextMetadataDraftSchema,
});

export const TextMetadataPublishSchema = z.object({
  acceptedAnswers: z
    .array(
      z.string().trim().toLowerCase().min(1, "Accepted answer cannot be blank"),
    )
    .min(1, "Accepted answer not specified"),
});

export const TextQuestionPublishSchema = BaseQuestionPublishSchema.extend({
  type: z.literal(QuestionType.TEXT),
  metadata: TextMetadataPublishSchema,
});
