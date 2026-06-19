import { Button } from "@/components/ui/button";
import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";
import { X } from "lucide-react";

export function SettingPanelHeader() {
	const selectedMenu = useQuizEditorStore((s) => s.selectedMenu);
	const setSelectedMenu = useQuizEditorStore((s) => s.setSelectedMenu);

	return (
		<header className="flex justify-between items-center py-6 text-lg font-bold">
			<span>
				{selectedMenu === "themes" ? "Themes" : "Question properties"}
			</span>
			<Button
				onClick={() => setSelectedMenu(null)}
				className="hover:bg-gray-200 p-2 rounded-sm"
			>
				<X strokeWidth={1.2} />
			</Button>
		</header>
	);
}
