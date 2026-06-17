import { Question } from "@/features/quiz/types/question";
import { Image } from "lucide-react";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";
import { QUESTION_TYPE } from "@/features/quiz/constants/question-type";
import { ErrorTooltip } from "./error-tooltip";
import { useShallow } from "zustand/shallow";

type Props = {
	question: Question;
};

export function QuestionPreview({ question }: Props) {
	const { id, title, timeLimitMs, type, metadata } = question;
	const { isActive, setSelected, errors } = useQuizEditorStore(
		useShallow((s) => ({
			isActive: s.selectedQuestionId === id,
			setSelected: s.setSelectedQuestionId,
			errors: s.errors.questions.find((error) => error.id === id),
		})),
	);

	return (
		<div
			onClick={() => setSelected(id)}
			className={cn(
				"relative w-full rounded-lg border-3 border-transparent group-hover:border-gray-400 bg-[#f2f2f2] cursor-grabbing flex flex-col py-2 px-4 gap-4 items-center",
				isActive &&
					"border-kahoot-blue-dark group-hover:border-kahoot-blue-dark bg-white",
			)}
		>
			<p className="text-md text-center font-semibold text-kahoot-gray truncate w-full min-w-0">
				{title.length > 0 ? title : "Question"}
			</p>

			<div className="w-full flex justify-center relative text-gray-400">
				<div className="w-12 h-8 border border-dashed border-gray-300 flex items-center justify-center">
					<Image size={16} />
				</div>

				<div className="rounded-full size-8 border border-gray-200 absolute left-0 top-1/2 -translate-y-1/2 text-xs flex justify-center items-center">
					{timeLimitMs / 1000}
				</div>
			</div>

			<div className="w-full h-5">
				{type === QUESTION_TYPE.MULTIPLE_CHOICE && (
					<div className="grid grid-cols-2 gap-0.5 h-full">
						{[1, 2, 3, 4].map((_, index) => {
							const option = metadata.options[index];
							return (
								<div
									key={option ? option.id : index}
									className="rounded-xs border border-gray-200 w-full flex items-center px-1"
								>
									<div className="flex-1"></div>
									{option && option.isCorrect && (
										<div className="h-9/10 aspect-square rounded-full bg-[#66bf39]"></div>
									)}
								</div>
							);
						})}
					</div>
				)}

				{type === QUESTION_TYPE.TEXT && (
					<div className="flex flex-col items-center gap-0.5 h-full">
						<div className="rounded-xs border border-gray-200 w-5/9 basis-1/2"></div>
						<div className="basis-1/2 flex gap-0.5 w-full">
							<div className="flex-1 rounded-xs border border-gray-200"></div>
							<div className="flex-1 rounded-xs border border-gray-200"></div>
							<div className="flex-1 rounded-xs border border-gray-200"></div>
						</div>
					</div>
				)}
			</div>

			{errors && <ErrorTooltip isActive={isActive} errors={errors.errors} />}
		</div>
	);
}
