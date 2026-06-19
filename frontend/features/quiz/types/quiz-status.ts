import { ValueOf } from "@/lib/utils/value-of";
import { QUIZ_STATUS_FILTER } from "../constants/quiz-status";

export type QuizStatusFilter = ValueOf<typeof QUIZ_STATUS_FILTER>;
