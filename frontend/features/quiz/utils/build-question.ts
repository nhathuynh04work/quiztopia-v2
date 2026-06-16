import { QUESTION_DEFAULT_DATA } from "../constants/question-default-data";
import { Question } from "../types/question";
import { buildDefaultOption } from "./build-option";

export function buildDefaultQuestion(): Question {
	return {
		id: crypto.randomUUID(),
		title: "",
		type: QUESTION_DEFAULT_DATA.TYPE,
		points: QUESTION_DEFAULT_DATA.POINTS,
		timeLimitMs: QUESTION_DEFAULT_DATA.TIME_LIMIT_MS,
		image: null,
		metadata: {
			allowMultiple: QUESTION_DEFAULT_DATA.ALLOW_MULTIPLE,
			options: Array.from({ length: 4 }, buildDefaultOption),
		},
	};
}
