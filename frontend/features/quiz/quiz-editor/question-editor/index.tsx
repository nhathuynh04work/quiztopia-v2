import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";
import { useSelectedQuestion } from "../hooks/use-selected-question";
import { AnswerPanel } from "./answer-panel";
import { MediaUpload } from "./media-upload";
import { QuestionTitle } from "./question-title";

export function QuestionEditor() {
	const theme = useQuizEditorStore((s) => s.quiz.theme);
	const question = useSelectedQuestion();

	if (!question) {
		return null;
	}

	return (
		<div
			key={question.id}
			className={`w-full h-full bg-center bg-cover flex flex-col items-center py-16 px-6 gap-6`}
			style={{
				backgroundImage: `url(/themes/${theme}.webp)`,
			}}
		>
			<div className="w-full">
				<QuestionTitle question={question} />
			</div>

			<div className="w-2xl">
				<MediaUpload />
			</div>

			<div className="w-full">
				<AnswerPanel question={question} />
			</div>
		</div>
	);
}
