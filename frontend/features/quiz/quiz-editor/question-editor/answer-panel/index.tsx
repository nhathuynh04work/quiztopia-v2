import { QUESTION_TYPE } from "@/features/quiz/constants/question-type";
import { Question } from "@/features/quiz/types/question";
import { MultipleChoiceAnswerPanel } from "./multiple-choice";
import { TextAnswerPanel } from "./text";

type Props = {
	question: Question;
};

export function AnswerPanel({ question }: Props) {
	const { type, metadata } = question;

	switch (type) {
		case QUESTION_TYPE.MULTIPLE_CHOICE:
			return <MultipleChoiceAnswerPanel metadata={metadata} />;

		case QUESTION_TYPE.TEXT:
			return <TextAnswerPanel metadata={metadata} />;
	}
}
