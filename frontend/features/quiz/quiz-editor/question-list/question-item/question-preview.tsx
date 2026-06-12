import { Question } from "@/features/quiz/types/question";
import { Image } from "lucide-react";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";
import { useSelectedQuestion } from "../../hooks/use-selected-question";
import { QUESTION_TYPE } from "@/features/quiz/constants/question-type";

type Props = {
	question: Question;
};

export function QuestionPreview({ question }: Props) {
	const isActive = useQuizEditorStore(
		(s) => s.selectedQuestionId === question.id,
	);

	return (
		<div
			className={cn(
				"w-full rounded-lg border-3 border-transparent group-hover:border-gray-400 bg-[#f2f2f2] cursor-grabbing flex flex-col py-2 px-4 gap-4 items-center",
				isActive &&
					"border-kahoot-blue-dark group-hover:border-kahoot-blue-dark bg-white",
			)}
		>
			<p className="text-md text-center font-semibold text-[#6e6e6e] truncate w-full min-w-0">
				{question.title.length > 0 ? question.title : "Question"}
			</p>

			<div className="w-full flex justify-center relative text-gray-400">
				<div className="w-12 h-8 border border-dashed border-gray-300 flex items-center justify-center">
					<Image size={16} />
				</div>

				<div className="rounded-full p-1 border border-gray-200 absolute left-0 top-1/2 -translate-y-1/2 text-sm">
					{question.timeLimitMs / 1000}
				</div>
			</div>

			<div className="w-full grid grid-cols-2 gap-0.5">
				{question.type === QUESTION_TYPE.MULTIPLE_CHOICE &&
					[1, 2, 3, 4].map((_, index) => {
						const option = question.metadata.options[index];
						return (
							<div
								key={option ? option.id : index}
								className="rounded-xs border border-gray-200 w-full h-3 flex items-center"
							>
								<div className="flex-1"></div>
								{option && option.isCorrect && (
									<div className="h-3/4 aspect-square rounded-full bg-[#66bf39]"></div>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}
