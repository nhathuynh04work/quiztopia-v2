import { TextMetadata } from "@/features/quiz/types/question/text";
import { AnswerItem } from "./answer-item";
import { MAX_ACCEPTED_ANSWER_COUNT } from "@/features/quiz/constants/constraints";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";

type Props = {
	metadata: TextMetadata;
};

export function TextAnswerPanel({ metadata }: Props) {
	const { acceptedAnswers } = metadata;
	const addAnswer = useQuizEditorStore((s) => s.addAcceptedAnswer);
	const questionId = useQuizEditorStore((s) => s.selectedQuestionId);

	const hasLessThanTwoAnswers = acceptedAnswers.length < 2;
	const showAddBtn =
		acceptedAnswers.length > 1 &&
		acceptedAnswers.length < MAX_ACCEPTED_ANSWER_COUNT;

	const handleAddAnswer = () => addAnswer(questionId);

	return (
		<div className="flex flex-col items-center gap-4">
			<AnswerItem answer={acceptedAnswers[0] ?? ""} order={0} />

			<div
				onClick={hasLessThanTwoAnswers ? handleAddAnswer : undefined}
				className={cn(
					"px-4 py-4 text-2xl text-white font-semibold bg-[#0000008c] backdrop-blur-md rounded-md",
					hasLessThanTwoAnswers && "cursor-pointer underline",
				)}
			>
				{hasLessThanTwoAnswers
					? "Add other accepted answer"
					: "Other accepted answers"}
			</div>

			<div className="w-full grid grid-cols-3 gap-4">
				{acceptedAnswers.slice(1).map((answer, index) => (
					<AnswerItem key={index + 1} answer={answer} order={index + 1} />
				))}

				{showAddBtn && (
					<Button
						onClick={handleAddAnswer}
						className={cn(
							"px-4 py-4 text-2xl text-white font-semibold bg-[#0000008c] backdrop-blur-md underline rounded-md",
							"justify-self-start self-center",
						)}
					>
						Add more
					</Button>
				)}
			</div>
		</div>
	);
}
