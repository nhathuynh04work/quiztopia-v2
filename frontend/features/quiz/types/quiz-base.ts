import { QuizVisibility } from "./quiz-visibility";

export type QuizBase = {
	id: string;
	title: string;
	description: string;
	theme: string;
	coverImage: string | null;
	visibility: QuizVisibility;
};
