import { TextMetadata } from "@/features/quiz/types/question/text";

type Props = {
	metadata: TextMetadata;
};

export function TextAnswerPanel({ metadata }: Props) {
	const { acceptedAnswers } = metadata;

	return null;
}
