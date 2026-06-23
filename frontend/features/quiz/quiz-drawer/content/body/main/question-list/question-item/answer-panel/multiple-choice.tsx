import { OPTION_CONFIGS } from "@/features/quiz/constants/option";
import { MultipleChoiceQuestion } from "@/features/quiz/types/question/multiple-choice";
import { cn } from "@/lib/utils/cn";
import { VIEW_MODE, ViewMode } from "../../view-mode";
import { Check } from "lucide-react";

type Props = {
	mode: ViewMode;
	showAnswer: boolean;
	question: MultipleChoiceQuestion;
};

const CONFIG = {
	[VIEW_MODE.LIST]: {
		iconSize: 24,
		optionPadding: "p-4",
	},
	[VIEW_MODE.GRID]: {
		iconSize: 14,
		optionPadding: "p-2.5",
	},
	[VIEW_MODE.COMPACT]: {
		iconSize: 24,
		optionPadding: "p-4",
	},
};

export function MultipleChoice({ mode, question, showAnswer }: Props) {
	const { options } = question.metadata;
	const { iconSize, optionPadding } = CONFIG[mode];

	return (
		<div className="w-full grid grid-cols-2 gap-2">
			{options.map((option, index) => {
				const { id, title, isCorrect } = option;
				const { backgroundColor, Icon } = OPTION_CONFIGS[index];

				return (
					<div
						key={id}
						className={cn(
							"flex items-center gap-4 rounded-sm",
							optionPadding,
							backgroundColor,
						)}
					>
						<Icon
							size={iconSize}
							className="fill-white stroke-white shrink-0"
						/>

						{showAnswer && (
							<>
								<p className="flex-1 text-white font-semibold break-all">{title}</p>
								<Check
									size={iconSize}
									className={cn(
										"stroke-white invisible shrink-0",
										isCorrect && "visible",
									)}
								/>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}
