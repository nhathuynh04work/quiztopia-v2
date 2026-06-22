import { Question } from "../../types/question";
import { QuizBase } from "../../types/quiz-base";

export type QuizUpsertPayload = QuizBase & {
	questions: Question[];
};
