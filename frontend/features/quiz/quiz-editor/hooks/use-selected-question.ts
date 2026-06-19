import { useQuizEditorStore } from "./use-quiz-editor-store";

export function useSelectedQuestion() {
	const questions = useQuizEditorStore((s) => s.quiz.questions);
	const selectedQuestionId = useQuizEditorStore((s) => s.selectedQuestionId);
	const question = questions.find((q) => q.id === selectedQuestionId);

	return question;
}
