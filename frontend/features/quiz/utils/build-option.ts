import { Option } from "../types/question/multiple-choice/option";

export function buildDefaultOption(): Option {
	return {
		id: crypto.randomUUID(),
		title: "",
		isCorrect: false,
	};
}
