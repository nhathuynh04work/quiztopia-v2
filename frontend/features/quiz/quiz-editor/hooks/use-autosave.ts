import { useUpsertQuiz } from "./mutations/use-upsert-quiz";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useQuizEditorStoreInstance } from "./use-quiz-editor-store";

export function useAutoSave(quizId: string) {
	const store = useQuizEditorStoreInstance();
	const { setScheduledUpsert } = store.getState();

	const { mutate: upsert } = useUpsertQuiz(quizId);

	useEffect(() => {
		const debounced = debounce(() => upsert(), 1000);

		setScheduledUpsert(debounced);

		const unsubscribe = store.subscribe((s) => s.quiz, debounced);

		return () => {
			unsubscribe();
			debounced.cancel();
			setScheduledUpsert(null);
		};
	}, [store, upsert]);
}
