import { Question } from "../../types/question";
import { QuizBase } from "../../types/quiz-base";

export type QuizForDrawer = QuizBase & {
	questions: Question[];
	user: {
		name: string;
		avatar: null;
	};
	hasUnsavedChanges: boolean;
};
