export const ERROR_CONFIG = {
	PRIVATE_AUTH: {
		title: "This quiz is private",
		content:
			"Seems like you don't have access to this quiz, ask the owner to set its visibility to public. Otherwise, you can browse other quizzes to play or create your own!",
	},
	PRIVATE_ANON: {
		title: "This quiz is private",
		content:
			"Are you the owner of this quiz? Log in to play it. If it is not yours, you can log in or create an account to browse other quizzes to play.",
	},
	NOT_FOUND_AUTH: {
		title: "We couldn't find this quiz",
		content: "Check the URL for typos, or find another quiz to play.",
	},
	NOT_FOUND_ANON: {
		title: "We couldn't find this quiz",
		content:
			"Seems like the quiz you are trying to access is no longer available or doesn't exist.\n\nSign up to search millions of awesome quizzes, create your own or duplicate and edit existing ones!",
	},
} as const;
