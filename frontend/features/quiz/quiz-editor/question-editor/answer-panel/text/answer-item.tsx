import { ACCEPTED_ANSWER_CONFIG } from "@/features/quiz/constants/accepted-answer";
import { MAX_ACCEPTED_ANSWER_LENGTH } from "@/features/quiz/constants/constraints";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";

type Props = {
	answer: string;
	order: number;
};

export function AnswerItem({ answer, order }: Props) {
	const setAnswer = useQuizEditorStore((s) => s.setAcceptedAnswer);
	const [draftAnswer, setDraftAnswer] = useState(answer);
	const { backgroundColor, hoverBackgroundColor, borderColor } =
		ACCEPTED_ANSWER_CONFIG[order];

	const isActive = draftAnswer.length > 0;

	return (
		<div
			className={cn(
				"w-full flex items-center py-4 px-6 bg-white rounded-md transition-all duration-300 group border-b-4 border-gray-300",
				isActive && `${backgroundColor} ${hoverBackgroundColor} ${borderColor}`,
				order === 0 && "w-5/9",
			)}
		>
			<input
				name="title"
				value={draftAnswer}
				onChange={(e) => setDraftAnswer(e.target.value)}
				onBlur={
					draftAnswer !== answer
						? () => setAnswer(order, draftAnswer)
						: undefined
				}
				maxLength={MAX_ACCEPTED_ANSWER_LENGTH}
				placeholder={`Type an answer`}
				className={cn(
					"flex-1 outline-none font-semibold",
					isActive ? "text-white" : "text-black",
					order > 0 ? "text-2xl" : "text-4xl",
				)}
			/>
			<div
				className={cn(
					"text-xl font-semibold text-white invisible",
					isActive && "group-focus-within:visible",
				)}
			>
				{MAX_ACCEPTED_ANSWER_LENGTH - draftAnswer.length}
			</div>
		</div>
	);
}
