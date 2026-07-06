export const GAME_MODE = {
	CLASSIC: "CLASSIC",
	ACCURACY: "ACCURACY",
	CONFIDENCE: "CONFIDENCE",
	TEAMS: "TEAMS",
} as const;

export const GAME_MODE_CONFIG = {
	[GAME_MODE.CLASSIC]: {
		key: "classic",
		title: "Classic",
		description:
			"Bring friendly competition to this quiz. Participants need to answer quickly and correctly to secure a top spot on the podium.",
		group: ["engagement"],
		tags: ["Up to 10 participants", "Competition", "Engagement"],
	},
	[GAME_MODE.ACCURACY]: {
		key: "accuracy",
		title: "Accuracy",
		description:
			"Classic mode with an accuracy twist! Reach the top spot by answering correctly. This mode removes speed bonuses, where only accuracy counts.",
		group: ["engagement"],
		tags: ["Up to 10 participants", "Competition", "Accuracy"],
	},
	[GAME_MODE.CONFIDENCE]: {
		key: "confidence",
		title: "Confidence",
		description:
			"Classic mode with a confidence twist! Rate your confidence level and get extra points for correct answers, but mistakes can make you lose them.",
		group: ["engagement"],
		tags: ["Up to 10 participants", "Competition", "Engagement"],
	},
	[GAME_MODE.TEAMS]: {
		key: "teams",
		title: "Teams",
		description:
			"Boost collaboration, teamwork, and communication with team mode. Participants work together in teams to compete for a top spot on the podium.",
		group: ["collaboration"],
		tags: ["Up to 10 participants", "Group collaboration", "Engagement"],
	},
} as const;
