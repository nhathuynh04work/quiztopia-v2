import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export function Empty() {
	return (
		<div className="w-full flex flex-col items-center gap-6 py-18 border-2 border-dashed border-gray-400 rounded-sm">
			<img src="/quiz-list/empty.svg" />
			<p className="text-xl font-semibold text-kahoot-gray text-center">
				Looks like there are no quizzes in here yet. <br /> Create the first one
				to get started.
			</p>
			<Link
				href="/quiz/new"
				className={cn(
					"flex items-center justify-center gap-2",
					"bg-kahoot-blue-light border-b-4 border-blue-900 rounded-md py-3 px-8",
					"hover:border-b-2 hover:border-t-2 hover:border-t-transparent hover:translate-y-[2px] hover:bg-kahoot-blue-dark",
					"text-white text-xl font-bold",
				)}
			>
				Create quiz
			</Link>
		</div>
	);
}
