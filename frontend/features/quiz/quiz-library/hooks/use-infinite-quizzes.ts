import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizzesAction } from "../../actions/get-quizzes";
import { QuizStatusFilter } from "../../types/quiz-status";

export function useInfiniteQuizzes(status: QuizStatusFilter, limit?: number) {
	return useInfiniteQuery({
		queryKey: ["quizzes", { status, limit }],
		queryFn: async ({ pageParam }) => {
			return getQuizzesAction({
				status,
				limit,
				cursor: pageParam || undefined,
			});
		},
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
}
