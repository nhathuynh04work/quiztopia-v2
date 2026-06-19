import { QuizVisibility } from "../../types/quiz-visibility";

export type QuizListItem = {
	id: string;
	title: string;
	description: string;
	theme: string;
	coverImage: string | null;
	visibility: QuizVisibility;
	lastModified: Date;
	user: {
		name: string;
		avatar: null;
	};
	questionCount: number;
	isDraft: boolean;
	hasUnsavedChanges: boolean;
};
