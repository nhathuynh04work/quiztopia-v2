import { EDITOR_STATUS } from "../constants/editor-status";
import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";
import { Check, LoaderCircle, X } from "lucide-react";

export function SavingIndicator() {
	const status = useQuizEditorStore((s) => s.status);

	return (
		<div className="flex items-center gap-3 text-lg font-medium text-black-soft">
			{status === EDITOR_STATUS.SAVING && (
				<>
					<LoaderCircle size={16} strokeWidth={2.4} />
					<span>Saving</span>
				</>
			)}

			{status === EDITOR_STATUS.SUCCESS && (
				<>
					<Check size={16} strokeWidth={2.4} />
					<span>Saved to: My quizzes</span>
				</>
			)}

			{status === EDITOR_STATUS.ERROR && (
				<>
					<X size={16} strokeWidth={2.4} />
					<span className="underline">Failed to save</span>
				</>
			)}
		</div>
	);
}
