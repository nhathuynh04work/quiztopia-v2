import { getQuizAction } from "@/features/quiz/actions/get-quiz";
import { QuizEditor } from "@/features/quiz/quiz-editor";
import { QuizEditorProvider } from "@/features/quiz/quiz-editor/providers/quiz-editor-provider";
import { Quiz } from "@/features/quiz/types/quiz";
import { ApiClientError } from "@/lib/api/api-client-error";
import { notFound, redirect } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function QuizEdit({ params }: Props) {
	let quiz: Quiz;

	try {
		const { id } = await params;
		quiz = await getQuizAction(id);
	} catch (error) {
		if (error instanceof ApiClientError) {
			if (error.status === 401) {
				redirect("/");
			}

			if (error.status === 403) {
				redirect("/quiz/forbidden");
			}

			if (error.status === 404) {
				notFound();
			}
		}

		throw error;
	}

	return (
		<QuizEditorProvider initialQuiz={quiz}>
			<QuizEditor />
		</QuizEditorProvider>
	);
}
