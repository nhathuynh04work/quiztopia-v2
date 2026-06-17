import { Quiz } from "@/features/quiz/types/quiz";
import { useMutation } from "@tanstack/react-query";
import { publishQuizAction } from "@/features/quiz/actions/publish";

export function usePublishQuiz(quizId: string) {
	return useMutation({
		mutationFn: (quiz: Quiz) => publishQuizAction(quiz),
		scope: {
			id: quizId,
		},
	});
}
