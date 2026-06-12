import { Question } from "./question";
import { QuizVisibility } from "./quiz-visibility";

export type Quiz = {
	id: string;
	title: string;
	theme: string;
	coverImage: null | string;
	visibility: QuizVisibility;
	publishedDetails: null | Omit<Quiz, "publishedDetails">;

	questions: Question[];
};
