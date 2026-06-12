import { ValueOf } from "@/lib/utils/value-of";
import { QUESTION_TYPE } from "../constants/question-type";

export type QuestionType = ValueOf<typeof QUESTION_TYPE>;
