import { QuizEditor } from "@/features/quiz/quiz-editor";
import { QuizEditorProvider } from "@/features/quiz/quiz-editor/providers/quiz-editor-provider";
import { buildDefaultQuiz } from "@/features/quiz/utils/build-quiz";

export default function QuizNew() {
	const quiz = buildDefaultQuiz();

	return (
		<QuizEditorProvider initialQuiz={quiz}>
			<QuizEditor />
		</QuizEditorProvider>
	);
}
