import { upsertQuizAction } from "@/features/quiz/actions/upsert";
import { useMutation } from "@tanstack/react-query";
import { useQuizEditorStoreInstance } from "../use-quiz-editor-store";
import { EDITOR_STATUS } from "../../constants/editor-status";
import { usePathname } from "next/navigation";
import { buildUpsertPayload } from "../../utils/build-quiz";

export function useUpsertQuiz(quizId: string) {
	const pathname = usePathname();
	const store = useQuizEditorStoreInstance();
	const { setStatus, markSaved, setErrors } = store.getState();

	return useMutation({
		mutationFn: () =>
			upsertQuizAction(buildUpsertPayload(store.getState().quiz)),
		onMutate: () => {
			setStatus(EDITOR_STATUS.SAVING);
		},
		onSuccess: ({ errors }) => {
			setStatus(EDITOR_STATUS.SUCCESS);

			if (errors) {
				setErrors(errors);
			}

			if (pathname === "/quiz/new") {
				markSaved();

				window.history.replaceState(
					window.history.state,
					"",
					`/quiz/${quizId}/edit`,
				);
			}
		},
		onError: () => {
			setStatus(EDITOR_STATUS.ERROR);
		},
		scope: {
			id: quizId,
		},
	});
}
