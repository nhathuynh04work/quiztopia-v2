import { ChevronDown, MessageCircleQuestionMark } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	QUESTION_TYPE,
	QUESTION_TYPE_CONFIG,
} from "@/features/quiz/constants/question-type";
import { cn } from "@/lib/utils/cn";
import { Question } from "@/features/quiz/types/question";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";

type Props = {
	question: Question;
};

export function QuestionTypeSelect({ question }: Props) {
	const { id, type } = question;
	const setType = useQuizEditorStore((s) => s.setQuestionType);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<MessageCircleQuestionMark size={16} />
				<span className="text-lg font-bold">Question type</span>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button className="w-full flex items-center justify-center gap-2 border border-[#b2b2b2] rounded-md text-xl font-bold py-3 px-4">
						<div className="flex-1 flex gap-3 items-center">
							<img src={QUESTION_TYPE_CONFIG[type].iconPath} className="h-8" />
							<span className="text-black font-medium text-lg">
								{QUESTION_TYPE_CONFIG[type].text}
							</span>
						</div>
						<ChevronDown />
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={12}
						align="end"
						className="w-md bg-white grid grid-cols-2 gap-2 p-4 rounded-md border border-gray-200 shadow-sm max-h-[480px] overflow-y-auto"
					>
						{Object.values(QUESTION_TYPE).map((questionType) => {
							const isSelected = type === questionType;
							const config = QUESTION_TYPE_CONFIG[questionType];

							return (
								<DropdownMenu.Item
									key={questionType}
									onClick={() => setType(id, questionType)}
									className={cn(
										"flex flex-col border-2 border-transparent items-center gap-2 bg-gray-100 p-4 rounded-sm",
										isSelected
											? "cursor-default border-kahoot-blue-dark"
											: "hover:bg-gray-300 cursor-pointer",
									)}
								>
									<img src={config.iconPath} className="h-12" />
									<span className="text-black font-bold">{config.text}</span>
								</DropdownMenu.Item>
							);
						})}
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
