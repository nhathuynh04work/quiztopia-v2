import { useQuery } from "@tanstack/react-query";
import { getQuizForDrawerAction } from "../../actions/get-quiz";

export function useQuizForDrawer(quizId: string) {
	return useQuery({
		queryKey: [quizId, "drawer"],
		queryFn: () => getQuizForDrawerAction(quizId),
	});
}
