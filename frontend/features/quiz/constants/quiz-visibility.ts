export const QUIZ_VISIBILITY = {
	PRIVATE: "PRIVATE",
	PUBLIC: "PUBLIC",
} as const;

export const QUIZ_VISIBILITY_CONFIG = {
	[QUIZ_VISIBILITY.PRIVATE]: {
		title: "Private",
		description: "Only visible to you.",
	},
	[QUIZ_VISIBILITY.PUBLIC]: {
		title: "Public",
		description: "Visible to everyone on the Discover page.",
	},
};
