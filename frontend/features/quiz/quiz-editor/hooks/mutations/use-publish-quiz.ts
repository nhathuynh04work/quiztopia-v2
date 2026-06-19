import { useMutation } from "@tanstack/react-query";
import { publishQuizAction } from "@/features/quiz/actions/publish";
import { useQuizEditorStoreInstance } from "../use-quiz-editor-store";
import { buildUpsertPayload } from "../../utils/build-quiz";

export function usePublishQuiz(quizId: string) {
	const store = useQuizEditorStoreInstance();

	return useMutation({
		mutationFn: () =>
			publishQuizAction(buildUpsertPayload(store.getState().quiz)),
		onMutate: () => {
			store.getState().scheduledUpsert?.cancel();
		},
		scope: {
			id: quizId,
		},
	});
}
