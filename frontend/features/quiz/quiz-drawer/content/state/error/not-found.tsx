import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { useDrawerStore } from "@/features/quiz/quiz-drawer/hooks/use-drawer-store";

export function NotFound() {
	const close = useDrawerStore((s) => s.close);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex justify-center items-center bg-kahoot-red-light/10 p-8 rounded-full">
				<FileQuestion className="size-16 text-kahoot-red-dark" />
			</div>

			<h3 className="text-3xl font-bold mt-4">Quiz not found</h3>
			<p className="text-lg leading-relaxed text-center">
				We couldn't find the quiz you're looking for. <br /> It might have been
				deleted, or the address is incorrect.
			</p>

			<div className="flex justify-center items-center gap-3 w-full mt-4">
				<Link
					href="/discover"
					onClick={close}
					className={cn(
						"px-6 py-3 bg-kahoot-blue-light border-b-4 border-blue-900 text-white font-bold text-md rounded-sm transition-all text-center",
						"hover:translate-y-[2px] hover:border-b-2 hover:bg-kahoot-blue-dark active:translate-y-[4px] active:border-b-0",
					)}
				>
					Explore quizzes
				</Link>
				<Button
					onClick={close}
					className={cn(
						"px-6 py-3 bg-gray-100 border-b-4 border-gray-300 font-semibold text-md rounded-sm transition-all",
						"hover:translate-y-[2px] hover:border-b-2 hover:bg-gray-200 active:translate-y-[4px] active:border-b-0",
					)}
				>
					Close
				</Button>
			</div>
		</div>
	);
}
