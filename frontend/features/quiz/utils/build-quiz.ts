import { MAX_OPTIONS_COUNT } from "../constants/constraints";
import { QUESTION_TYPE } from "../constants/question-type";
import { QUIZ_VISIBILITY } from "../constants/quiz-visibility";
import { Quiz } from "../types/quiz";
import { buildDefaultOption } from "./build-option";
import { buildQuestion } from "./build-question";

export function buildDefaultQuiz(): Quiz {
	return {
		id: crypto.randomUUID(),
		title: "",
		description: "",
		theme: "standard",
		coverImage: null,
		visibility: QUIZ_VISIBILITY.PRIVATE,
		publishedDetails: null,
		questions: [buildQuestion(QUESTION_TYPE.MULTIPLE_CHOICE)],
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
					acceptedAnswers: question.metadata.acceptedAnswers.filter(
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

export function buildDisplayPayload(quiz: Quiz): Quiz {
	const filled = quiz.questions.map((question) => {
		if (question.type === QUESTION_TYPE.MULTIPLE_CHOICE) {
			const options = question.metadata.options;

			return {
				...question,
				metadata: {
					...question.metadata,
					options:
						options.length < MAX_OPTIONS_COUNT
							? options.concat(
									Array.from(
										{ length: MAX_OPTIONS_COUNT - options.length },
										buildDefaultOption,
									),
								)
							: options,
				},
			};
		}

		if (question.type === QUESTION_TYPE.TEXT) {
			const answers = question.metadata.acceptedAnswers;

			return {
				...question,
				metadata: {
					...question.metadata,
					acceptedAnswers: answers.length < 1 ? [""] : answers,
				},
			};
		}

		return question;
	});

	return {
		...quiz,
		questions: filled,
	};
}
