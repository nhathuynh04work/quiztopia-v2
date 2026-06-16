import { upsertQuizAction } from "@/features/quiz/actions/upsert";
import { Quiz } from "@/features/quiz/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { useQuizEditorStore } from "../use-quiz-editor-store";
import { EDITOR_STATUS } from "../../constants/editor-status";
import { usePathname } from "next/navigation";

export function useUpsertQuiz(quizId: string) {
	const pathname = usePathname();
	const setStatus = useQuizEditorStore((s) => s.setStatus);

	return useMutation({
		mutationKey: [quizId],
		mutationFn: (quiz: Quiz) => {
			return upsertQuizAction(quiz);
		},
		onMutate: () => {
			setStatus(EDITOR_STATUS.SAVING);
		},
		onSuccess: () => {
			setStatus(EDITOR_STATUS.SUCCESS);

			if (pathname === "/quiz/new") {
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
