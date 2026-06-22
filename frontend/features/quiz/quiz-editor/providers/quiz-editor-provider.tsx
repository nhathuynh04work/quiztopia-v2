"use client";

import { createContext, ReactNode, useRef } from "react";
import { createQuizEditorStore } from "../stores/quiz-editor-store";
import { QuizValidationError } from "../../types/validation-error";
import { QuizForEditor } from "../types/quiz-for-editor";

export const QuizEditorContext = createContext<ReturnType<
	typeof createQuizEditorStore
> | null>(null);

type Props = {
	initialQuiz: QuizForEditor;
	isPersisted: boolean;
	errors: QuizValidationError;
	children: ReactNode;
};

export function QuizEditorProvider({
	initialQuiz,
	isPersisted,
	errors,
	children,
}: Props) {
	const storeRef = useRef<ReturnType<typeof createQuizEditorStore>>(null);

	if (!storeRef.current) {
		storeRef.current = createQuizEditorStore(initialQuiz, isPersisted, errors);
	}

	return (
		<QuizEditorContext.Provider value={storeRef.current}>
			{children}
		</QuizEditorContext.Provider>
	);
}
