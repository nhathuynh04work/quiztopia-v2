import { BookCopy, FileStack, Presentation, Send } from "lucide-react";
import { ActionButton } from "./action-button";
import { QuizForDrawer } from "../../../types/quiz-for-drawer";
import { QUIZ_VISIBILITY_CONFIG } from "@/features/quiz/constants/quiz-visibility";

type Props = {
	quiz: QuizForDrawer;
};

export function Sidebar({ quiz }: Props) {
	const { visibility, id } = quiz;
	const { title: visibilityTitle } = QUIZ_VISIBILITY_CONFIG[visibility];
	return (
		<div className="flex-1 sticky top-0 h-fit flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<p className="text-lg font-bold">Quiz session</p>
				<ActionButton
					Icon={Presentation}
					title="Host live"
					description="Display on a big screen"
				/>
				<ActionButton
					Icon={Send}
					title="Assign"
					description="Send to participants"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-lg font-bold">Quiz self-study</p>
				<ActionButton
					Icon={BookCopy}
					title="Learn"
					description="Study on your own"
					className="bg-kahoot-blue-light hover:bg-kahoot-blue-dark border-blue-900 text-white"
				/>
				<ActionButton
					Icon={FileStack}
					title="Flashcards"
					description="Memorize and master"
				/>
			</div>
			<div className="flex flex-col gap-2 text-center text-black-soft font-medium leading-loose">
				<p>
					Max. 10 participants.{" "}
					<span className="underline">Update for more</span>
				</p>
				<p>Updated 1 hour ago • Visibility: {visibilityTitle}</p>
			</div>
		</div>
	);
}
