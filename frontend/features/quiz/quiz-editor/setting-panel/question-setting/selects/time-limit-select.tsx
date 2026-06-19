import { Check, ChevronDown, Clock12 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { formatTimeLimit } from "@/lib/utils/formatters";
import { TIME_LIMIT_MS } from "@/features/quiz/constants/time-limits";
import { Question } from "@/features/quiz/types/question";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";

type Props = {
	question: Question;
};

export function TimeLimitSelect({ question }: Props) {
	const { id, timeLimitMs } = question;
	const setLimit = useQuizEditorStore((s) => s.setQuestionTimeLimit);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Clock12 size={16} />
				<span className="text-lg font-bold">Time limit</span>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button className="w-full flex items-center justify-center gap-2 border border-[#b2b2b2] rounded-md text-xl font-bold py-3 px-4">
						<div className="flex-1 flex gap-3 items-center">
							<span className="text-black font-medium text-lg">
								{formatTimeLimit(timeLimitMs)}
							</span>
						</div>
						<ChevronDown />
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={12}
						align="end"
						className="w-(--radix-dropdown-menu-trigger-width) bg-white flex flex-col p-2 rounded-md border border-gray-200 shadow-sm max-h-[320px] overflow-y-auto"
					>
						{TIME_LIMIT_MS.map((limit) => {
							const isSelected = limit === timeLimitMs;
							return (
								<DropdownMenu.Item
									key={limit}
									onClick={() => setLimit(id, limit)}
									className={cn(
										"flex flex-col gap-1 p-4 rounded-sm text-left",
										isSelected
											? "cursor-default"
											: "hover:bg-gray-100 cursor-pointer",
									)}
								>
									<div className="flex items-center justify-between">
										<span className="font-medium text-lg">
											{formatTimeLimit(limit)}
										</span>
										{isSelected && <Check size={16} />}
									</div>
								</DropdownMenu.Item>
							);
						})}
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
