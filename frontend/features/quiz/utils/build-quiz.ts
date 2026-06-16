import { QUESTION_TYPE } from "../constants/question-type";
import { QUIZ_VISIBILITY } from "../constants/quiz-visibility";
import { Quiz } from "../types/quiz";
import { buildDefaultQuestion } from "./build-question";

export function buildDefaultQuiz(): Quiz {
	return {
		id: crypto.randomUUID(),
		title: "",
		description: "",
		theme: "standard",
		coverImage: null,
		visibility: QUIZ_VISIBILITY.PRIVATE,
		publishedDetails: null,
		questions: [buildDefaultQuestion()],
	};
}

export function buildUpsertPayload(quiz: Quiz): Quiz {
	const filtered = quiz.questions.map((question) => {
		if (question.type === QUESTION_TYPE.MULTIPLE_CHOICE) {
			return {
				...question,
				metadata: {
					...question.metadata,
					options: question.metadata.options.filter(
						(option) => option.title.length > 0,
					),
				},
			};
		}

		if (question.type === QUESTION_TYPE.TEXT) {
			return {
				...question,
				metadata: {
					...question.metadata,
					options: question.metadata.acceptedAnswers.filter(
						(answer) => answer.length > 0,
					),
				},
			};
		}

		return question;
	});

	return {
		...quiz,
		questions: filtered,
	};
}
