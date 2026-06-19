import { QuestionType } from "@/generated/prisma/enums";
import z from "zod";
import {
  BaseQuestionDraftSchema,
  BaseQuestionPublishSchema,
} from "./base.schema";
import {
  MAX_OPTIONS_COUNT,
  MAX_OPTION_TITLE_LENGTH,
} from "../../constants/constraints";

export const OptionDraftSchema = z.object({
  id: z.uuid().nullable(),
  title: z
    .string()
    .trim()
    .max(
      MAX_OPTION_TITLE_LENGTH,
      `Option must be at most ${MAX_OPTION_TITLE_LENGTH} characters`,
    ),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataDraftSchema = z.object({
  allowMultiple: z.boolean().default(false),
  options: z
    .array(OptionDraftSchema)
    .max(
      MAX_OPTIONS_COUNT,
      `Cannot have more than ${MAX_OPTIONS_COUNT} options`,
    ),
});

export const MultipleChoiceQuestionDraftSchema = BaseQuestionDraftSchema.extend(
  {
    type: z.literal(QuestionType.MULTIPLE_CHOICE),
    metadata: MultipleChoiceMetadataDraftSchema,
  },
);

export const OptionPublishSchema = z.object({
  id: z.uuid("Invalid option ID"),
  title: z
    .string()
    .trim()
    .min(1, "Missing option text")
    .max(
      MAX_OPTION_TITLE_LENGTH,
      `Option must be at most ${MAX_OPTION_TITLE_LENGTH} characters`,
    ),
  isCorrect: z.boolean(),
});

export const MultipleChoiceMetadataPublishSchema = z
  .object({
    allowMultiple: z.boolean().default(false),
    options: z
      .array(OptionPublishSchema)
      .min(2, "At least two options required")
      .max(
        MAX_OPTIONS_COUNT,
        `Cannot have more than ${MAX_OPTIONS_COUNT} options`,
      ),
  })
  .refine(
    (data) =>
      data.allowMultiple ||
      data.options.filter((o) => o.isCorrect).length === 1,
    {
      message: "Exactly one correct answer is required",
      path: ["options"],
    },
  )
  .refine(
    (data) => !data.allowMultiple || data.options.some((o) => o.isCorrect),
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
