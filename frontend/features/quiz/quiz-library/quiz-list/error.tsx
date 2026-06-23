import { Button } from "@/components/button";
import { cn } from "@/lib/utils/cn";
import { CircleAlert } from "lucide-react";

type Props = {
	retry: () => void;
};

export function Error({ retry }: Props) {
	return (
		<div className="w-full flex flex-col items-center gap-6 py-18 border-2 border-dashed border-gray-400 rounded-sm">
			<CircleAlert className="stroke-kahoot-red-dark" size={72} />
			<p className="text-xl font-semibold text-kahoot-gray text-center">
				Couldn't load quizzes. <br /> Please try again.
			</p>
			<Button
				onClick={retry}
				className={cn(
					"flex items-center justify-center gap-2",
					"bg-kahoot-blue-light border-b-4 border-blue-900 rounded-md py-3 px-8",
					"hover:border-b-2 hover:border-t-2 hover:border-t-transparent hover:translate-y-[2px] hover:bg-kahoot-blue-dark",
					"text-white text-xl font-bold",
				)}
			>
				Try again
			</Button>
		</div>
	);
}
