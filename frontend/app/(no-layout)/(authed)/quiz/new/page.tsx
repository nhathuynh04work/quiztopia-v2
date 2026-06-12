import { QuizEditor } from "@/features/quiz/quiz-editor";
import { QuizEditorProvider } from "@/features/quiz/quiz-editor/providers/quiz-editor-provider";
import { buildBlankQuiz } from "@/features/quiz/utils/build-blank-quiz";

export default function QuizNew() {
	const quiz = buildBlankQuiz();

	return (
		<QuizEditorProvider initialQuiz={quiz}>
			<QuizEditor />
		</QuizEditorProvider>
	);
}
