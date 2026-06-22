import { createStore } from "zustand";
import { SettingMenu } from "../types/setting-menu";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { DebouncedFunc } from "lodash";
import { QuestionType } from "../../types/question-type";
import { PointsMode } from "../../types/points-mode";
import { DialogData } from "../header/setting-dialog/dialog-data";
import { QUESTION_TYPE } from "../../constants/question-type";
import { EditorStatus } from "../../types/editor-status";
import { EDITOR_STATUS } from "../constants/editor-status";
import { MAX_ACCEPTED_ANSWER_COUNT } from "../../constants/constraints";
import { QuizValidationError } from "../../types/validation-error";
import { buildQuestion } from "../utils/build-question";
import { QuizForEditor } from "../types/quiz-for-editor";

type State = {
	quiz: QuizForEditor;
	errors: QuizValidationError;
	isPersisted: boolean;

	selectedMenu: SettingMenu;
	selectedQuestionId: string;
	isAddDropdownOpen: boolean;
	status: EditorStatus;
	scheduledUpsert: DebouncedFunc<() => void> | null;
};

type Action = {
	markSaved: () => void;
	setErrors: (errors: QuizValidationError) => void;
	setSelectedMenu: (menu: SettingMenu) => void;
	setIsAddDropdownOpen: (open: boolean) => void;
	setSelectedQuestionId: (questionId: string) => void;
	setStatus: (status: EditorStatus) => void;

	setQuizDataUsingDialog: (payload: DialogData) => void;
	setQuizTitleAndDescription: (title: string, description: string) => void;
	setQuizTheme: (theme: string) => void;

	addQuestion: (type: QuestionType) => void;
	setQuestionTitle: (questionId: string, title: string) => void;
	setQuestionType: (questionId: string, type: QuestionType) => void;
	setQuestionTimeLimit: (questionId: string, timeLimitMs: number) => void;
	setQuestionPoints: (questionId: string, points: PointsMode) => void;

	setOptionTitle: (optionId: string, title: string) => void;
	setOptionIsCorrect: (optionId: string, isCorrect: boolean) => void;

	addAcceptedAnswer: (questionId: string) => void;
	setAcceptedAnswer: (order: number, answer: string) => void;
	setScheduledUpsert: (debounced: DebouncedFunc<() => void> | null) => void;
};

export type QuizEditorStore = State & Action;

export function createQuizEditorStore(
	initialQuiz: QuizForEditor,
	isPersisted: boolean,
	errors: QuizValidationError,
) {
	return createStore<QuizEditorStore>()(
		subscribeWithSelector(
			immer((set) => ({
				quiz: initialQuiz,
				errors: errors,
				isPersisted: isPersisted,
				scheduledUpsert: null,
				selectedMenu: "themes",
				selectedQuestionId: initialQuiz.questions.at(0)?.id ?? "",
				isAddDropdownOpen: false,
				status: EDITOR_STATUS.IDLE,

				markSaved: () =>
					set((s) => {
						s.isPersisted = true;
					}),
				setErrors: (errors) =>
					set((s) => {
						s.errors = errors;
					}),
				setSelectedMenu: (menu) =>
					set((s) => {
						s.selectedMenu = menu;
					}),
				setIsAddDropdownOpen: (open) =>
					set((s) => {
						s.isAddDropdownOpen = open;
					}),
				setSelectedQuestionId: (questionId) =>
					set((s) => {
						s.selectedQuestionId = questionId;
					}),
				setStatus: (status) =>
					set((s) => {
						s.status = status;
					}),
				setScheduledUpsert: (debounced) =>
					set((s) => {
						s.scheduledUpsert = debounced;
					}),

				setQuizDataUsingDialog: (payload) =>
					set((s) => {
						s.quiz = { ...s.quiz, ...payload };
					}),
				setQuizTitleAndDescription: (title, description) =>
					set((s) => {
						s.quiz.title = title;
						s.quiz.description = description;
					}),
				setQuizTheme: (theme) =>
					set((s) => {
						s.quiz.theme = theme;
					}),

				addQuestion: (type) =>
					set((s) => {
						const question = buildQuestion(type);
						question.type = type;

						s.quiz.questions.push(question);
					}),
				setQuestionTitle: (questionId, title) =>
					set((s) => {
						findQuestion(s, questionId).title = title;
					}),
				setQuestionType: (questionId, type) =>
					set((s) => {
						findQuestion(s, questionId).type = type;
					}),
				setQuestionTimeLimit: (questionId, timeLimitMs) =>
					set((s) => {
						findQuestion(s, questionId).timeLimitMs = timeLimitMs;
					}),
				setQuestionPoints: (questionId, points) =>
					set((s) => {
						findQuestion(s, questionId).points = points;
					}),

				setOptionTitle: (optionId, title) =>
					set((s) => {
						findOption(s, optionId).title = title;
					}),
				setOptionIsCorrect: (optionId, isCorrect) =>
					set((s) => {
						findOption(s, optionId).isCorrect = isCorrect;
					}),

				addAcceptedAnswer: (questionId) =>
					set((s) => {
						const question = findQuestion(s, questionId);
						if (question.type !== QUESTION_TYPE.TEXT) {
							return;
						}

						const acceptedAnswers = question.metadata.acceptedAnswers;

						if (acceptedAnswers.length === MAX_ACCEPTED_ANSWER_COUNT) {
							return;
						}

						acceptedAnswers.push("");
					}),
				setAcceptedAnswer: (order, answer) =>
					set((s) => {
						const question = findSelectedQuestion(s);
						if (question.type !== QUESTION_TYPE.TEXT) {
							throw new Error("Wrong question type");
						}

						question.metadata.acceptedAnswers[order] = answer;
					}),
			})),
		),
	);
}

function findQuestion(state: QuizEditorStore, questionId: string) {
	const question = state.quiz.questions.find((q) => q.id === questionId);
	if (!question) {
		throw Error("Missing question");
	}
	return question;
}

function findSelectedQuestion(state: QuizEditorStore) {
	return findQuestion(state, state.selectedQuestionId);
}

function findOption(state: QuizEditorStore, optionId: string) {
	const question = state.quiz.questions.find(
		(q) => q.id === state.selectedQuestionId,
	);

	if (!question) {
		throw Error("Missing question");
	}

	if (question.type !== QUESTION_TYPE.MULTIPLE_CHOICE) {
		throw Error("Wrong question type");
	}

	const option = question.metadata.options.find((o) => o.id === optionId);

	if (!option) {
		throw Error("Missing option");
	}

	return option;
}
