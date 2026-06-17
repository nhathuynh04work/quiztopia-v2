import { upsertQuizAction } from "@/features/quiz/actions/upsert";
import { Quiz } from "@/features/quiz/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { useQuizEditorStore } from "../use-quiz-editor-store";
import { EDITOR_STATUS } from "../../constants/editor-status";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";

export function useUpsertQuiz(quizId: string) {
	const pathname = usePathname();
	const { setStatus, markSaved, setErrors } = useQuizEditorStore(
		useShallow((s) => ({
			setStatus: s.setStatus,
			markSaved: s.markSaved,
			setErrors: s.setErrors,
		})),
	);

	return useMutation({
		mutationFn: (quiz: Quiz) => {
			return upsertQuizAction(quiz);
		},
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
