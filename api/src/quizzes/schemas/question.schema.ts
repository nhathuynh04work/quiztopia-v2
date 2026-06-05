import z from "zod";
import {
  MultipleChoiceQuestionDraftSchema,
  MultipleChoiceQuestionPublishSchema,
} from "./questions/multiple-choice.schema";
import {
  TextQuestionDraftSchema,
  TextQuestionPublishSchema,
} from "./questions/text.schema";

export const DraftQuestionSchema = z.discriminatedUnion("type", [
  MultipleChoiceQuestionDraftSchema,
  TextQuestionDraftSchema,
]);

export type DraftQuestionInput = z.infer<typeof DraftQuestionSchema>;

export const PublishQuestionSchema = z.discriminatedUnion("type", [
  MultipleChoiceQuestionPublishSchema,
  TextQuestionPublishSchema,
]);

export type PublishedQuestion = z.infer<typeof PublishQuestionSchema>;
