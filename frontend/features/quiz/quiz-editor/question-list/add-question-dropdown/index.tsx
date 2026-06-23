import { Button } from "@/components/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { DropdownContent } from "./dropdown-content";

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
				<DropdownContent />
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
