import { ErrorDialog } from "..";
import { ERROR_CONFIG } from "../constants/error-config";

export function PrivateQuizAuthDialog() {
	const copy = ERROR_CONFIG.PRIVATE_AUTH;

	const actions = {
		primary: {
			title: "Browse quizzes",
			href: "/discover",
		},
		secondary: {
			title: "Create your own",
			href: "/quiz/new",
		},
		tertiary: {
			title: "Go to your quizzes",
			href: "/library",
		},
	};

	return (
		<ErrorDialog title={copy.title} content={copy.content} actions={actions} />
	);
}

export function PrivateQuizAnonDialog({ quizId }: { quizId: string }) {
	const copy = ERROR_CONFIG.PRIVATE_ANON;

	const actions = {
		primary: {
			title: "I own this quiz",
			href: `/login?redirectTo=${encodeURIComponent(`/play/${quizId}`)}`,
		},
		secondary: {
			title: "It's not my quiz",
			href: "/discover",
		},
		tertiary: {
			title: "Create an account",
			href: "/signup",
		},
	};

	return (
		<ErrorDialog title={copy.title} content={copy.content} actions={actions} />
	);
}
