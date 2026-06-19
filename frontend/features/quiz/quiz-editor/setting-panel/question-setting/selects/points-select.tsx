import { Award, Check, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
	POINTS_MODE,
	POINTS_MODE_CONFIG,
} from "@/features/quiz/constants/points-mode";
import { Question } from "@/features/quiz/types/question";
import { useQuizEditorStore } from "../../../hooks/use-quiz-editor-store";

type Props = {
	question: Question;
};

export function PointsSelect({ question }: Props) {
	const { id, points } = question;
	const setPoints = useQuizEditorStore((s) => s.setQuestionPoints);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Award size={16} />
				<span className="text-lg font-bold">Points</span>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button className="w-full flex items-center justify-center gap-2 border border-[#b2b2b2] rounded-md text-xl font-bold py-3 px-4">
						<div className="flex-1 flex gap-3 items-center">
							<span className="text-black font-medium text-lg">
								{POINTS_MODE_CONFIG[points].text}
							</span>
						</div>
						<ChevronDown />
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={12}
						align="end"
						className="w-(--radix-dropdown-menu-trigger-width) bg-white flex flex-col p-2 rounded-md border border-gray-200 shadow-sm"
					>
						{Object.values(POINTS_MODE).map((mode) => {
							const isSelected = mode === points;
							const config = POINTS_MODE_CONFIG[mode];

							return (
								<DropdownMenu.Item
									key={mode}
									onClick={() => setPoints(id, mode)}
									className={cn(
										"flex flex-col gap-1 p-4 rounded-sm text-left",
										isSelected
											? "cursor-default"
											: "hover:bg-gray-100 cursor-pointer",
									)}
								>
									<div className="flex items-center justify-between">
										<span className="text-black font-bold text-lg">
											{config.text}
										</span>
										{isSelected && <Check size={16} />}
									</div>
									<p className="font-medium">{config.description}</p>
								</DropdownMenu.Item>
							);
						})}
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
