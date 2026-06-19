import { getQuiz } from "@/features/quiz/queries/get-quiz";
import { QuizEditor } from "@/features/quiz/quiz-editor";
import { QuizEditorProvider } from "@/features/quiz/quiz-editor/providers/quiz-editor-provider";
import { buildDisplayPayload } from "@/features/quiz/quiz-editor/utils/build-quiz";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function QuizEdit({ params }: Props) {
	const { id } = await params;
	const { quiz, errors } = await getQuiz(id);

	return (
		<QuizEditorProvider
			initialQuiz={buildDisplayPayload(quiz)}
			isPersisted={true}
			errors={errors ? errors : { title: "", questions: [] }}
		>
			<QuizEditor />
		</QuizEditorProvider>
	);
}
