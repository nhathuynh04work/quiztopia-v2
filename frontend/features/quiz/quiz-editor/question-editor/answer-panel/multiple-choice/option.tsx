import { OPTION_CONFIGS } from "@/features/quiz/constants/option";
import { Option as OptionType } from "@/features/quiz/types/question/multiple-choice/option";
import { cn } from "@/lib/utils/cn";
import { MAX_OPTION_TITLE_LENGTH } from "@/features/quiz/constants/constraints";
import { Check } from "lucide-react";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";
import { useState } from "react";

type Props = {
	option: OptionType;
	order: number;
};

export function Option({ option, order }: Props) {
	const setTitle = useQuizEditorStore((s) => s.setOptionTitle);
	const setIsCorrect = useQuizEditorStore((s) => s.setOptionIsCorrect);

	const { id, title, isCorrect } = option;

	const [draftTitle, setDraftTitle] = useState(title);

	const {
		backgroundColor,
		hoverBackgroundColor,
		borderColor,
		icon: Icon,
	} = OPTION_CONFIGS[order];

	const isActive = draftTitle.length > 0;

	return (
		<div
			className={cn(
				"relative flex items-center gap-4 py-2 px-3 bg-white rounded-md transition-all duration-300 group border-b-4 border-gray-300",
				isActive && `${backgroundColor} ${hoverBackgroundColor} ${borderColor}`,
			)}
		>
			{isActive && (
				<div className="absolute py-2 px-3 text-lg font-semibold text-white top-0 right-0 hidden group-focus-within:block">
					{MAX_OPTION_TITLE_LENGTH - draftTitle.length}
				</div>
			)}
			<div
				className={cn(
					"h-full flex items-center justify-center p-2 rounded-sm",
					!isActive && backgroundColor,
				)}
			>
				<Icon size={32} fill="white" color="white" />
			</div>
			<textarea
				name="title"
				value={draftTitle}
				onChange={(e) => setDraftTitle(e.target.value)}
				onBlur={
					draftTitle !== title ? () => setTitle(id, draftTitle) : undefined
				}
				rows={4}
				maxLength={MAX_OPTION_TITLE_LENGTH}
				placeholder={`Add answer ${order + 1}`}
				className={cn(
					"flex-1 resize-none outline-none p-2 text-xl font-semibold content-center",
					isActive ? "text-white" : "text-black",
				)}
			/>
			<div
				onClick={() => setIsCorrect(id, !option.isCorrect)}
				className={cn(
					!isActive && "hidden",
					isCorrect && "bg-[#66bf39]",
					"rounded-full p-2 border-4 border-white cursor-pointer hover:scale-105 transition-all",
				)}
			>
				<Check
					color="white"
					strokeWidth={4}
					className={cn(isCorrect ? "visible" : "invisible")}
				/>
			</div>
		</div>
	);
}
