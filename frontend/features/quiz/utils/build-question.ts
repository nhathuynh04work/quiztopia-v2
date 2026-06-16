import { QUESTION_DEFAULT_DATA } from "../constants/question-default-data";
import { QUESTION_TYPE } from "../constants/question-type";
import { Question } from "../types/question";
import { QuestionType } from "../types/question-type";

export function buildQuestion(type: QuestionType): Question {
	const base = {
		id: crypto.randomUUID(),
		title: "",
		points: QUESTION_DEFAULT_DATA.POINTS,
		timeLimitMs: QUESTION_DEFAULT_DATA.TIME_LIMIT_MS,
		image: null,
	};

	if (type === QUESTION_TYPE.MULTIPLE_CHOICE) {
		return {
			...base,
			type: type,
			metadata: {
				allowMultiple: QUESTION_DEFAULT_DATA.ALLOW_MULTIPLE,
				options: [],
			},
		};
	}

	return {
		...base,
		type: type,
		metadata: {
			acceptedAnswers: [],
		},
	};
}
