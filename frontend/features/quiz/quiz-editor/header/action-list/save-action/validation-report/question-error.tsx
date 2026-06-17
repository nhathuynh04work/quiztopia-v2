import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_CONFIG } from "@/features/quiz/constants/question-type";
import { useQuizEditorStore } from "@/features/quiz/quiz-editor/hooks/use-quiz-editor-store";
import { QuestionValidationError } from "@/features/quiz/types/validation-result";
import { DialogClose } from "@radix-ui/react-dialog";
import { Image } from "lucide-react";
import { useShallow } from "zustand/shallow";

type Props = {
	error: QuestionValidationError;
};

export function QuestionError({ error }: Props) {
	const { id, errors } = error;

	const { question, order, setSelected } = useQuizEditorStore(
		useShallow((s) => {
			const index = s.quiz.questions.findIndex((q) => q.id === id);

			return {
				question: s.quiz.questions[index],
				order: index + 1,
				setSelected: s.setSelectedQuestionId,
			};
		}),
	);

	if (!question) {
		return null;
	}

	const { title, type, image } = question;

	return (
		<div className="bg-white rounded-md shadow-sm">
			<div className="flex">
				<div className="w-40 p-0.5">
					{image ? (
						<img src={image} />
					) : (
						<div className="w-full h-28 border border-dashed border-gray-200 flex items-center justify-center text-[#b2b2b2]">
							<Image />
						</div>
					)}
				</div>
				<div className="flex-1 flex flex-col p-3">
					<span className="text-lg font-medium">
						{order} - {QUESTION_TYPE_CONFIG[type].text}
					</span>
					<p className="text-lg font-bold text-wrap break-all">{title}</p>
				</div>

				<div className="p-6 flex justify-center items-center">
					<DialogClose asChild>
						<Button
							onClick={() => setSelected(id)}
							className="py-2 px-6 bg-kahoot-blue-light hover:bg-kahoot-blue-dark font-bold text-xl rounded-sm text-white"
						>
							Fix
						</Button>
					</DialogClose>
				</div>
			</div>

			<div className="flex flex-col">
				{errors.map((err) => (
					<div
						key={err}
						className="py-2 px-3 border-t border-t-gray-200 flex items-center gap-2"
					>
						<div className="bg-kahoot-purple rounded-full text-sm text-white font-bold size-6 flex items-center justify-center">
							!
						</div>
						<div className="flex-1 text-lg font-medium">{err}</div>
					</div>
				))}
			</div>
		</div>
	);
}
