import { Separator } from "@/components/layouts/separator";
import { useSelectedQuestion } from "../hooks/use-selected-question";
import { SettingPanelHeader } from "./header";
import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";
import { QuestionSetting } from "./question-setting";
import { ThemeSetting } from "./theme-setting";

export function SettingPanel() {
	const question = useSelectedQuestion();
	const selectedMenu = useQuizEditorStore((s) => s.selectedMenu);

	if (!question) {
		return null;
	}

	return (
		<div className="w-full h-full px-6 flex flex-col overflow-y-auto">
			<SettingPanelHeader />

			<Separator />

			{selectedMenu === "properties" ? (
				<QuestionSetting question={question} />
			) : (
				<ThemeSetting />
			)}
		</div>
	);
}
