import { create } from "zustand";

type State = {
	id: string | null;
};

type Action = {
	open: (id: string) => void;
	close: () => void;
	setId: (id: string | null) => void;
};

export const useDrawerStore = create<State & Action>((set) => ({
	id: null,

	open: (id) => {
		set({ id });
		pushDrawerState(id);
	},
	close: () => {
		set({ id: null });
		window.history.back();
	},
	setId: (id) => {
		set({ id });
	},
}));

export function pushDrawerState(id: string) {
	window.history.pushState({ type: "drawer", id }, "", `/quiz/${id}?drawer=`);
}
