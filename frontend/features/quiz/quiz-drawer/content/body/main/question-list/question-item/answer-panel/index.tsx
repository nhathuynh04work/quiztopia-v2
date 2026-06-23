import { QUESTION_TYPE } from "@/features/quiz/constants/question-type";
import { Question } from "@/features/quiz/types/question";
import { MultipleChoice } from "./multiple-choice";
import { Text } from "./text";
import { ViewMode } from "../../view-mode";

type Props = {
	mode: ViewMode;
	showAnswer: boolean;
	question: Question;
};

export function AnswerPanel({ mode, question, showAnswer }: Props) {
	if (question.type === QUESTION_TYPE.MULTIPLE_CHOICE) {
		return (
			<MultipleChoice mode={mode} showAnswer={showAnswer} question={question} />
		);
	}

	return <Text question={question} />;
}
