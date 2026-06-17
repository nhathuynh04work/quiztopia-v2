import { Button } from "@/components/ui/button";
import {
	MAX_QUIZ_DESCRIPTION_LENGTH,
	MAX_QUIZ_TITLE_LENGTH,
} from "@/features/quiz/constants/constraints";
import { cn } from "@/lib/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import {
	descriptionStyle,
	inputStyle,
	titleStyle,
} from "../../../setting-dialog/setting-dialog-content/styles";
import { QuizValidationError } from "@/features/quiz/types/validation-result";
import { QuestionError } from "./question-error";

type Props = {
	errors: QuizValidationError;
};

export function ValidationReport({ errors }: Props) {
	if (errors.questions.length > 0) {
		return (
			<div className="w-4xl max-h-[95vh] flex flex-col">
				<header className="flex flex-col gap-8 px-8 py-10 shadow-sm relative z-10">
					<h3 className="text-3xl font-bold">This quiz can't be played</h3>
					<p className="text-xl font-medium">
						All questions need to be completed before you can start playing.
					</p>
				</header>

				<div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-8 px-8 py-10 bg-[#f2f2f2]">
					{errors.questions.map((error) => (
						<QuestionError key={error.id} error={error} />
					))}
				</div>

				<footer className="flex justify-center items-center gap-4 px-8 py-10">
					<DialogClose asChild>
						<Button
							className={cn(
								"bg-[#f2f2f2] hover:bg-[#ccc] border-b-4",
								"border-[#b5b5b5] hover:border-b-2 hover:translate-y-[2px]",
								"rounded-md text-black text-xl font-bold py-3 px-9",
							)}
						>
							Back to edit
						</Button>
					</DialogClose>
					<Button
						className={cn(
							"bg-kahoot-green-light hover:bg-kahoot-green-dark border-b-4",
							"border-green-900 hover:border-b-2 hover:translate-y-[2px]",
							"rounded-md text-white text-xl font-bold py-3 px-9",
						)}
					>
						Keep changes
					</Button>
				</footer>
			</div>
		);
	}

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
						<input name="title" type="text" className="flex-1 outline-none" />
						<span className="text-kahoot-gray pl-2">
							{MAX_QUIZ_TITLE_LENGTH}
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
							name="description"
							rows={4}
							className="flex-1 outline-none resize-none"
						/>
						<span className="text-kahoot-gray pl-2">
							{MAX_QUIZ_DESCRIPTION_LENGTH}
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
