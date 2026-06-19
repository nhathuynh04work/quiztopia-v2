import { create } from "zustand";
import { ViewMode } from "../types/view-mode";
import { VIEW_MODE } from "../constants/view-mode";

type State = {
	search: string;
	view: ViewMode;
};

type Action = {
	setSearch: (search: string) => void;
	setView: (view: ViewMode) => void;
};

type QuizLibraryStore = State & Action;

export const useQuizLibraryStore = create<QuizLibraryStore>((set) => ({
	search: "",
	view: VIEW_MODE.CARD,

	setSearch: (search) => set({ search }),
	setView: (view) => set({ view }),
}));
