import { ErrorDialog } from "..";
import { ERROR_CONFIG } from "../constants/error-config";

export function QuizNotFoundAuthDialog() {
	const copy = ERROR_CONFIG.NOT_FOUND_AUTH;

	const actions = {
		primary: {
			title: "Browse quizzes",
			href: "/discover",
		},
		secondary: {
			title: "Open library",
			href: "/library",
		},
	};

	return (
		<ErrorDialog title={copy.title} content={copy.content} actions={actions} />
	);
}

export function QuizNotFoundAnonDialog() {
	const copy = ERROR_CONFIG.NOT_FOUND_ANON;

	const actions = {
		primary: {
			title: "Log in",
			href: "/login",
		},
		secondary: {
			title: "Sign up",
			href: "/signup",
		},
	};

	return (
		<ErrorDialog title={copy.title} content={copy.content} actions={actions} />
	);
}
