import { QuestionType } from "@/generated/prisma/enums";
import z from "zod";
import {
  BaseQuestionDraftSchema,
  BaseQuestionPublishSchema,
} from "./base.schema";

export const OptionDraftSchema = z.object({
  id: z.uuid().nullable(),
  title: z.string().trim(),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataDraftSchema = z.object({
  allowMultipleCorrectAnswers: z.boolean().default(false),
  options: z.array(OptionDraftSchema),
});

export const MultipleChoiceQuestionDraftSchema = BaseQuestionDraftSchema.extend(
  {
    type: z.literal(QuestionType.MULTIPLE_CHOICE),
    metadata: MultipleChoiceMetadataDraftSchema,
  },
);

export const OptionPublishSchema = z.object({
  id: z.uuid("Invalid option ID"),
  title: z.string().trim().min(1, "Missing option text"),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataPublishSchema = z
  .object({
    allowMultipleCorrectAnswers: z.boolean().default(false),
    options: z
      .array(OptionPublishSchema)
      .min(2, "At least two options required"),
  })
  .refine(
    (data) =>
      data.allowMultipleCorrectAnswers ||
      data.options.filter((o) => o.isCorrect).length === 1,
    {
      message: "Exactly one correct answer is required",
      path: ["options"],
    },
  )
  .refine(
    (data) =>
      !data.allowMultipleCorrectAnswers ||
      data.options.some((o) => o.isCorrect),
    {
      message: "At least one correct answer is required",
      path: ["options"],
    },
  );

export const MultipleChoiceQuestionPublishSchema =
  BaseQuestionPublishSchema.extend({
    type: z.literal(QuestionType.MULTIPLE_CHOICE),
    metadata: MultipleChoiceMetadataPublishSchema,
  });
