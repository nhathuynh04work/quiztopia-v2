import { createStore } from "zustand";
import { SettingMenu } from "../types/setting-menu";
import { Quiz } from "../../types/quiz";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { QuestionType } from "../../types/question-type";
import { buildDefaultQuestion } from "../../utils/build-question";
import { PointsMode } from "../../types/points-mode";
import { DialogData } from "../header/setting-dialog/dialog-data";
import { QUESTION_TYPE } from "../../constants/question-type";
import { EditorStatus } from "../../types/editor-status";
import { EDITOR_STATUS } from "../constants/editor-status";

type State = {
	quiz: Quiz;

	selectedMenu: SettingMenu;
	selectedQuestionId: string;
	isAddDropdownOpen: boolean;
	status: EditorStatus;
};

type Action = {
	setSelectedMenu: (menu: SettingMenu) => void;
	setIsAddDropdownOpen: (open: boolean) => void;
	setSelectedQuestionId: (questionId: string) => void;
	setStatus: (status: EditorStatus) => void;

	setQuizDataUsingDialog: (payload: DialogData) => void;
	setQuizTheme: (theme: string) => void;

	addQuestion: (type: QuestionType) => void;
	setQuestionTitle: (questionId: string, title: string) => void;
	setQuestionType: (questionId: string, type: QuestionType) => void;
	setQuestionTimeLimit: (questionId: string, timeLimitMs: number) => void;
	setQuestionPoints: (questionId: string, points: PointsMode) => void;

	setOptionTitle: (optionId: string, title: string) => void;
	setOptionIsCorrect: (optionId: string, isCorrect: boolean) => void;
};

export type QuizEditorStore = State & Action;

export function createQuizEditorStore(initialQuiz: Quiz) {
	return createStore<QuizEditorStore>()(
		subscribeWithSelector(
			immer((set) => ({
				quiz: initialQuiz,
				selectedMenu: "themes",
				selectedQuestionId: initialQuiz.questions.at(0)?.id ?? "",
				isAddDropdownOpen: false,
				status: EDITOR_STATUS.IDLE,

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

				setQuizDataUsingDialog: (payload) =>
					set((s) => {
						s.quiz = { ...s.quiz, ...payload };
					}),
				setQuizTheme: (theme) =>
					set((s) => {
						s.quiz.theme = theme;
					}),

				addQuestion: (type) =>
					set((s) => {
						const question = buildDefaultQuestion();
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
