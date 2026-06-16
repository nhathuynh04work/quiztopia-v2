import { QuizEditor } from "@/features/quiz/quiz-editor";
import { QuizEditorProvider } from "@/features/quiz/quiz-editor/providers/quiz-editor-provider";
import {
	buildDefaultQuiz,
	buildDisplayPayload,
} from "@/features/quiz/utils/build-quiz";

export default function QuizNew() {
	const quiz = buildDefaultQuiz();

	return (
		<QuizEditorProvider
			initialQuiz={buildDisplayPayload(quiz)}
			isPersisted={false}
		>
			<QuizEditor />
		</QuizEditorProvider>
	);
}
