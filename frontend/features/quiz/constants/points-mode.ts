export const POINTS_MODE = {
	STANDARD: "STANDARD",
	DOUBLE_POINTS: "DOUBLE_POINTS",
	NO_POINTS: "NO_POINTS",
} as const;

export const POINTS_MODE_CONFIG = {
	[POINTS_MODE.STANDARD]: {
		text: "Standard",
		description: "Award correct answers with the normal amount of points.",
	},
	[POINTS_MODE.DOUBLE_POINTS]: {
		text: "Double points",
		description: "Give twice as many points for correct answers.",
	},
	[POINTS_MODE.NO_POINTS]: {
		text: "No points",
		description: "Lower the stakes of the question and remove points.",
	},
} as const;
