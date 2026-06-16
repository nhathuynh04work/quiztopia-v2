import { MultipleChoiceMetadata } from "@/features/quiz/types/question/multiple-choice";
import { Option } from "./option";

type Props = {
	metadata: MultipleChoiceMetadata;
};

export function MultipleChoiceAnswerPanel({ metadata }: Props) {
	const { allowMultiple, options } = metadata;

	return (
		<div className="w-full grid grid-cols-2 gap-4">
			{options.map((option, index) => (
				<Option key={option.id} option={option} order={index} />
			))}
		</div>
	);
}
