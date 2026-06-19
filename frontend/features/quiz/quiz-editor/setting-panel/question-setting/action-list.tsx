import { Button } from "@/components/ui/button";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";

export function QuestionSettingActionList() {
	const disableDelete = useQuizEditorStore((s) => s.quiz.questions.length < 2);

	return (
		<div className="flex justify-center gap-6 py-6 text-lg font-bold">
			<Button
				disabled={disableDelete}
				className="px-6 py-2 rounded-sm disabled:bg-gray-300"
			>
				Delete
			</Button>
			<Button className="px-6 py-2 border border-black-soft rounded-sm hover:bg-gray-200">
				Duplicate
			</Button>
		</div>
	);
}
