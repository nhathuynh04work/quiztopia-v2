import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export function LoginPromptDialog({ quizId }: { quizId: string }) {
	const base = cn(
		"py-3 px-6 rounded-md",
		"min-w-40",
		"border-b-4 hover:border-b-2 hover:border-t-2 hover:border-t-transparent hover:translate-y-[2px]",
		"text-center text-lg font-bold",
	);

	const primary = cn(
		"bg-kahoot-green-light hover:bg-kahoot-green-dark",
		"border-b-green-900",
		"text-white",
	);
	const secondary = cn("bg-gray-200 hover:bg-gray-300", "border-b-gray-400");

	return (
		<div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
			<div
				className={cn(
					"relative z-10",
					"w-156 bg-white p-8 rounded-md",
					"flex flex-col justify-center gap-8",
				)}
			>
				<h2 className="text-[2rem] font-bold">Log into Quiztopia!</h2>
				<div className="text-[1.2rem] font-medium whitespace-pre-line">
					Log in to play this quiz and discover millions more you'll love.
				</div>
				<div className="flex flex-col gap-5 items-center">
					<div className="flex justify-center gap-2">
						<Link href="/signup" className={cn(base, secondary)}>
							Sign up
						</Link>
						<Link
							href={`/login?redirectTo=/play/${quizId}`}
							className={cn(base, primary)}
						>
							Log in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
