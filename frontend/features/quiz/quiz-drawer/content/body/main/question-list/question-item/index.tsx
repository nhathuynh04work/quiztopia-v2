import { Question } from "@/features/quiz/types/question";
import { AnswerPanel } from "./answer-panel";
import { VIEW_MODE, ViewMode } from "../view-mode";
import { cn } from "@/lib/utils/cn";

type Props = {
	mode: ViewMode;
	showAnswer: boolean;
	theme: string;
	question: Question;
};

export function QuestionItem({ theme, question, showAnswer, mode }: Props) {
	const { title, image } = question;

	return (
		<div
			className={cn(
				"w-full rounded-md aspect-2/1 flex flex-col justify-between items-center bg-center bg-cover",
				mode === VIEW_MODE.GRID && "p-2",
				mode === VIEW_MODE.LIST && "text-3xl p-4",
			)}
			style={{
				backgroundImage: `url(/themes/${theme}.webp)`,
			}}
		>
			<p className="p-3 bg-white/80 font-bold break-all rounded-sm text-center">
				{title}
			</p>

			{image && <img src={image} />}

			<AnswerPanel mode={mode} showAnswer={showAnswer} question={question} />
		</div>
	);
}
