export type QuizForGameSetup = {
	id: string;
	title: string;
	theme: string;
	coverImage: string | null;
	user: {
		name: string;
		avatar: string | null;
	};
};
