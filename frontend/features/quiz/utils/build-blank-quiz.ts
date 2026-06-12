import { QUESTION_DEFAULT_DATA } from "../constants/question-default-data";
import { QUIZ_VISIBILITY } from "../constants/quiz-visibility";
import { Quiz } from "../types/quiz";

export function buildBlankQuiz(): Quiz {
	return {
		id: "",
		title: "",
		theme: "standard",
		coverImage: null,
		visibility: QUIZ_VISIBILITY.PRIVATE,
		publishedDetails: null,
		questions: [
			{
				id: "",
				title: "",
				type: QUESTION_DEFAULT_DATA.TYPE,
				points: QUESTION_DEFAULT_DATA.POINTS,
				timeLimitMs: QUESTION_DEFAULT_DATA.TIME_LIMIT_MS,
				image: null,
				metadata: {
					allowMultiple: QUESTION_DEFAULT_DATA.ALLOW_MULTIPLE,
					options: [],
				},
			},
		],
	};
}
