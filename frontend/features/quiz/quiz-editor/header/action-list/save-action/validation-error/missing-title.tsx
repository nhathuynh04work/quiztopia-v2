import {
	MAX_QUIZ_DESCRIPTION_LENGTH,
	MAX_QUIZ_TITLE_LENGTH,
} from "@/features/quiz/constants/constraints";
import {
	descriptionStyle,
	inputStyle,
	titleStyle,
} from "../../../setting-dialog/setting-dialog-content/styles";
import { cn } from "@/lib/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuizEditorStore } from "@/features/quiz/quiz-editor/hooks/use-quiz-editor-store";
import { Quiz } from "@/features/quiz/types/quiz";
import { buildUpsertPayload } from "@/features/quiz/utils/build-quiz";
import { useShallow } from "zustand/shallow";

type Props = {
	retry: (quiz: Quiz) => void;
};

export function MissingTitle({ retry }: Props) {
	const { initialDesc, setData, quiz } = useQuizEditorStore(
		useShallow((s) => ({
			initialDesc: s.quiz.description,
			setData: s.setQuizTitleAndDescription,
			quiz: s.quiz,
		})),
	);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState(initialDesc);

	return (
		<div className="w-2xl px-8 py-10 flex flex-col gap-10">
			<header className="flex flex-col gap-8">
				<h3 className="text-3xl font-bold">Adding the final touches</h3>
				<p className="text-xl text-kahoot-gray font-semibold">
					A clear title and description will make your quiz more visible to
					others.
				</p>
			</header>

			<div className="w-full flex flex-col gap-6">
				<div className="w-full flex flex-col gap-2">
					<h3 className={titleStyle}>Title</h3>
					<p className={descriptionStyle}>Enter a title for your quiz.</p>
					<div className={cn(inputStyle, "flex")}>
						<input
							name="title"
							value={title}
							maxLength={MAX_QUIZ_TITLE_LENGTH}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							className="flex-1 outline-none"
						/>
						<span className="text-kahoot-gray pl-2">
							{MAX_QUIZ_TITLE_LENGTH - title.length}
						</span>
					</div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<h3 className={titleStyle}>
						Description{" "}
						<span className="text-kahoot-gray font-medium">(Optional)</span>
					</h3>
					<p className={descriptionStyle}>
						Provide a short description to increase visibility.
					</p>
					<div className={cn(inputStyle, "flex")}>
						<textarea
							value={description}
							maxLength={MAX_QUIZ_DESCRIPTION_LENGTH}
							onChange={(e) => setDescription(e.target.value)}
							name="description"
							rows={4}
							className="flex-1 outline-none resize-none"
						/>
						<span className="text-kahoot-gray pl-2">
							{MAX_QUIZ_DESCRIPTION_LENGTH - description.length}
						</span>
					</div>
				</div>
			</div>

			<footer className="flex justify-center items-center gap-4">
				<DialogClose asChild>
					<Button
						className={cn(
							"bg-[#f2f2f2] hover:bg-[#ccc] border-b-4",
							"border-[#b5b5b5] hover:border-b-2 hover:translate-y-[2px]",
							"rounded-md text-black text-xl font-bold py-3 px-9",
						)}
					>
						Cancel
					</Button>
				</DialogClose>
				<Button
					onClick={() => {
						setData(title, description);
						retry(buildUpsertPayload({ ...quiz, title, description }));
					}}
					className={cn(
						"bg-kahoot-green-light hover:bg-kahoot-green-dark border-b-4",
						"border-green-900 hover:border-b-2 hover:translate-y-[2px]",
						"rounded-md text-white text-xl font-bold py-3 px-9",
					)}
				>
					Continue
				</Button>
			</footer>
		</div>
	);
}
