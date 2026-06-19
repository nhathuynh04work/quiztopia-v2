const basePath = "/question-type-icons";

export const QUESTION_TYPE = {
	MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
	TEXT: "TEXT",
} as const;

export const QUESTION_TYPE_CONFIG = {
	[QUESTION_TYPE.MULTIPLE_CHOICE]: {
		text: "Multiple choice",
		iconPath: `${basePath}/multiple-choice.svg`,
	},
	[QUESTION_TYPE.TEXT]: {
		text: "Text",
		iconPath: `${basePath}/text.svg`,
	},
} as const;
