"use client";

import { createContext, ReactNode, useRef } from "react";
import { Quiz } from "../../types/quiz";
import { createQuizEditorStore } from "../stores/quiz-editor-store";

export const QuizEditorContext = createContext<ReturnType<
	typeof createQuizEditorStore
> | null>(null);

type Props = {
	initialQuiz: Quiz;
	children: ReactNode;
};

export function QuizEditorProvider({ initialQuiz, children }: Props) {
	const storeRef = useRef<ReturnType<typeof createQuizEditorStore>>(null);

	if (!storeRef.current) {
		storeRef.current = createQuizEditorStore(initialQuiz);
	}

	return (
		<QuizEditorContext.Provider value={storeRef.current}>
			{children}
		</QuizEditorContext.Provider>
	);
}
