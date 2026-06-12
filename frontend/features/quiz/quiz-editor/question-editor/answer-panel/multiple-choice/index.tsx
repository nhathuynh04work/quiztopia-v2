import { MultipleChoiceMetadata } from "@/features/quiz/types/question/multiple-choice";
import { Option } from "./option";
import { MAX_OPTIONS_COUNT } from "@/features/quiz/constants/constraints";
import { OptionPlaceholder } from "./option-placeholder";

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
			{[...Array(MAX_OPTIONS_COUNT - options.length)].map((_, index) => (
				<OptionPlaceholder
					key={index + options.length}
					order={index + options.length}
				/>
			))}
		</div>
	);
}
