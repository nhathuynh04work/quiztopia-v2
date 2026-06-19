import { useState } from "react";
import { MAX_QUESTION_TITLE_LENGTH } from "../../constants/constraints";
import { Question } from "../../types/question";
import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";

type Props = {
	question: Question;
};

export function QuestionTitle({ question }: Props) {
	const { title, id } = question;
	const setTitle = useQuizEditorStore((s) => s.setQuestionTitle);

	const [draftTitle, setDraftTitle] = useState(title);

	return (
		<div className="w-full relative group">
			<textarea
				value={draftTitle}
				onChange={(e) => setDraftTitle(e.target.value)}
				onBlur={
					draftTitle !== title ? () => setTitle(id, draftTitle) : undefined
				}
				maxLength={MAX_QUESTION_TITLE_LENGTH}
				placeholder="Start typing your question"
				className="py-4 px-12 bg-white rounded-md w-full text-4xl text-center font-semibold border-b-4 border-gray-300 outline-none field-sizing-content resize-none break-all"
			/>
			<span className="absolute top-2 right-2 text-xl font-semibold hidden group-focus-within:inline-block text-gray-500">
				{MAX_QUESTION_TITLE_LENGTH - draftTitle.length}
			</span>
		</div>
	);
}
