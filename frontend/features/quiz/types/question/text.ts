import { QUESTION_TYPE } from "../../constants/question-type";
import { BaseQuestion } from "./base";

export type TextQuestion = BaseQuestion & {
  type: typeof QUESTION_TYPE.TEXT;
  metadata: TextMetadata;
};

export type TextMetadata = {
  acceptedAnswers: string[]
};
