import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import { QuizValidationError } from "@/features/quiz/types/validation-error";
import { QuestionError } from "./question-error";
import { MissingTitle } from "./missing-title";
import { Quiz } from "@/features/quiz/types/quiz";
import Link from "next/link";

type Props = {
	errors: QuizValidationError;
	retry: (quiz: Quiz) => void;
};

export function ValidationError({ errors, retry }: Props) {
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
					<Link
						href="/library"
						className={cn(
							"bg-kahoot-green-light hover:bg-kahoot-green-dark border-b-4",
							"border-green-900 hover:border-b-2 hover:translate-y-[2px]",
							"rounded-md text-white text-xl font-bold py-3 px-9",
						)}
					>
						Keep changes
					</Link>
				</footer>
			</div>
		);
	}

	return <MissingTitle retry={retry} />;
}
