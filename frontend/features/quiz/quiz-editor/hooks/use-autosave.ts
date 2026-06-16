import { useUpsertQuiz } from "./mutations/use-upsert-quiz";
import { debounce } from "lodash";
import { useContext, useEffect } from "react";
import { QuizEditorContext } from "../providers/quiz-editor-provider";
import { buildUpsertPayload } from "../../utils/build-quiz";

export function useAutoSave(quizId: string) {
	const store = useContext(QuizEditorContext);

	if (!store) {
		throw Error("Missing QuizEditorProvider");
	}

	const { mutate: upsert } = useUpsertQuiz(quizId);

	useEffect(() => {
		const debounced = debounce(
			() => upsert(buildUpsertPayload(store.getState().quiz)),
			1000,
		);

		const unsubscribe = store.subscribe((s) => s.quiz, debounced);

		return () => {
			unsubscribe();
			debounced.cancel();
		};
	}, [store, upsert]);
}
