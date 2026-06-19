import { useContext } from "react";
import { QuizEditorStore } from "../stores/quiz-editor-store";
import { QuizEditorContext } from "../providers/quiz-editor-provider";
import { useStore } from "zustand";

export function useQuizEditorStore<T>(selector: (s: QuizEditorStore) => T) {
	const store = useContext(QuizEditorContext);

	if (!store) {
		throw Error("Missing QuizEditorProvider");
	}

	return useStore(store, selector);
}

export function useQuizEditorStoreInstance() {
	const store = useContext(QuizEditorContext);

	if (!store) {
		throw Error("Missing QuizEditorProvider");
	}

	return store;
}
