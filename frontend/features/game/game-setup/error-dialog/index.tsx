import Link from "next/link";
import { DialogActions } from "./types/action";
import { cn } from "@/lib/utils/cn";

export interface ErrorDialogProps {
	title: string;
	content: string;
	actions: DialogActions;
}

export function ErrorDialog({ title, content, actions }: ErrorDialogProps) {
	const base = cn(
		"py-3 px-6 rounded-md",
		"min-w-40",
		"border-b-4 hover:border-b-2 hover:border-t-2 hover:border-t-transparent hover:translate-y-[2px]",
		"text-center text-lg font-bold",
	);

	const primary = cn(
		"bg-kahoot-blue-light hover:bg-kahoot-blue-dark",
		"border-b-blue-900",
		"text-white",
	);
	const secondary = cn("bg-gray-200 hover:bg-gray-300", "border-b-gray-400");
	const tertiary = cn("text-lg font-medium", "hover:underline");

	return (
		<div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
			<div
				className={cn(
					"relative z-10",
					"w-156 bg-white p-8 rounded-md",
					"flex flex-col justify-center gap-8",
				)}
			>
				<h2 className="text-[2rem] font-bold">{title}</h2>
				<div className="text-[1.2rem] font-medium whitespace-pre-line">{content}</div>
				<div className="flex flex-col gap-5 items-center">
					<div className="flex justify-center gap-2">
						<Link href={actions.secondary.href} className={cn(base, secondary)}>
							{actions.secondary.title}
						</Link>
						<Link href={actions.primary.href} className={cn(base, primary)}>
							{actions.primary.title}
						</Link>
					</div>
					{actions.tertiary && (
						<Link href={actions.tertiary.href} className={cn(tertiary)}>
							{actions.tertiary.title}
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
