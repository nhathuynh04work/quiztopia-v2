import { createStore } from "zustand";
import { SettingMenu } from "../types/setting-menu";
import { Quiz } from "../../types/quiz";

type State = {
	quiz: Quiz;

	selectedMenu: SettingMenu;
	selectedQuestionId: string;
	isAddDropdownOpen: boolean;
};

type Action = {
	setSelectedMenu: (menu: SettingMenu) => void;
	setIsAddDropdownOpen: (open: boolean) => void;
};

export type QuizEditorStore = State & Action;

export function createQuizEditorStore(initialQuiz: Quiz) {
	return createStore<QuizEditorStore>()((set) => ({
		quiz: initialQuiz,
		selectedMenu: "themes",
		selectedQuestionId: initialQuiz.questions[0].id,
		isAddDropdownOpen: false,

		setSelectedMenu: (menu) => set(() => ({ selectedMenu: menu })),
		setIsAddDropdownOpen: (open) => set(() => ({ isAddDropdownOpen: open })),
	}));
}
