import { Button } from "@/components/ui/button";
import {
	QUESTION_TYPE,
	QUESTION_TYPE_CONFIG,
} from "@/features/quiz/constants/question-type";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";

export function AddQuestionDropdown() {
	const setIsAddDropdownOpen = useQuizEditorStore(
		(s) => s.setIsAddDropdownOpen,
	);

	return (
		<DropdownMenu.Root onOpenChange={setIsAddDropdownOpen}>
			<DropdownMenu.Trigger asChild>
				<Button className="w-full flex items-center justify-center gap-2 bg-kahoot-blue-light border-b-4 border-blue-900 hover:border-b-2 hover:translate-y-[2px] hover:bg-kahoot-blue-dark rounded-md text-white text-xl font-bold py-3 px-8">
					<Plus />
					<span>Add</span>
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					side="right"
					sideOffset={36}
					collisionPadding={12}
					className="w-2xl bg-white grid grid-cols-3 gap-2 p-4 rounded-md filter drop-shadow-md z-50"
				>
					<DropdownMenu.Arrow className="fill-white" width={16} height={8} />
					{Object.values(QUESTION_TYPE).map((type) => {
						const config = QUESTION_TYPE_CONFIG[type];

						return (
							<div
								className="flex flex-col items-center gap-2 px-4 py-8 bg-gray-200 hover:bg-gray-300 transition-all cursor-pointer rounded-sm shadow-sm"
								key={type}
							>
								<img src={config.iconPath} className="max-w-10" />
								<span className="font-bold text-md">{config.text}</span>
							</div>
						);
					})}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
