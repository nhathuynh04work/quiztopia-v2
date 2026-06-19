import { Question } from "@/features/quiz/types/question";
import { ItemActions } from "./item-actions";
import { QuestionPreview } from "./question-preview";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";
import { QUESTION_TYPE_CONFIG } from "@/features/quiz/constants/question-type";

type Props = {
	question: Question;
	order: number;
};

export function QuestionItem({ question, order }: Props) {
	const isActive = useQuizEditorStore(
		(s) => s.selectedQuestionId === question.id,
	);

	return (
		<div className={cn("py-6 pb-3 pr-4 flex group", isActive && "bg-blue-50")}>
			<div
				className={cn("invisible group-hover:visible", isActive && "visible")}
			>
				<ItemActions />
			</div>

			<div className="flex-1 min-w-0 flex flex-col gap-1">
				<span
					className={cn(
						"font-bold text-md text-kahoot-gray",
						isActive && "text-black",
					)}
				>
					{order + 1} {QUESTION_TYPE_CONFIG[question.type].text}
				</span>

				<QuestionPreview question={question} />
			</div>
		</div>
	);
}
