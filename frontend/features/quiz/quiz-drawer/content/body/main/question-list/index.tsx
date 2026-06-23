import { Question } from "@/features/quiz/types/question";
import { useState } from "react";
import { VIEW_MODE, ViewMode } from "./view-mode";
import { ViewModeTabs } from "./view-mode-tabs";
import { ShowAnswerToggle } from "./show-answer-toggle";
import { cn } from "@/lib/utils/cn";
import { QuestionItem } from "./question-item";

type Props = {
	theme: string;
	questions: Question[];
};

export function QuestionList({ questions, theme }: Props) {
	const [mode, setMode] = useState<ViewMode>(VIEW_MODE.GRID);
	const [showAnswer, setShowAnswer] = useState<boolean>(false);

	return (
		<div className="flex flex-col pb-10">
			<div className="flex items-center justify-between py-4">
				<p className="text-xl font-bold">Questions {`(${questions.length})`}</p>

				<div className="flex items-center gap-4">
					<ShowAnswerToggle show={showAnswer} setShow={setShowAnswer} />
					<ViewModeTabs currentMode={mode} setMode={setMode} />
				</div>
			</div>

			<div
				className={cn(
					"grid",
					mode === VIEW_MODE.LIST && "grid-cols-1 gap-6",
					mode === VIEW_MODE.GRID && "grid-cols-2 gap-4",
				)}
			>
				{questions.map((question) => (
					<QuestionItem
						key={question.id}
						mode={mode}
						theme={theme}
						question={question}
						showAnswer={showAnswer}
					/>
				))}
			</div>
		</div>
	);
}
