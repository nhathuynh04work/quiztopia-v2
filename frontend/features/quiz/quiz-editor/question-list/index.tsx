import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";
import { QuestionItem } from "./question-item";
import { AddQuestionDropdown } from "./add-question-dropdown";

export function QuestionList() {
	const questions = useQuizEditorStore((s) => s.quiz.questions);

	return (
		<div className="h-full border-r border-gray-200 w-full flex flex-col">
			<div className="flex-1 overflow-y-auto w-full">
				<div className="flex flex-col">
					{questions.map((question, index) => (
						<QuestionItem key={question.id} question={question} order={index} />
					))}
				</div>

				<div className="w-full flex justify-center py-4 px-8 sticky bottom-0 bg-white">
					<AddQuestionDropdown />
				</div>
			</div>
		</div>
	);
}
