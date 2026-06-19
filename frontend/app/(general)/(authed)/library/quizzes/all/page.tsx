import { QuizList } from "@/features/quiz/quiz-library/quiz-list";
import { QUIZ_STATUS_FILTER } from "@/features/quiz/constants/quiz-status";

export default function AllQuizzes() {
	return <QuizList status={QUIZ_STATUS_FILTER.PUBLISHED} />;
}