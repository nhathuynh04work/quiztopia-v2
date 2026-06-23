import { ReactNode } from "react";
import { FileQuestion } from "lucide-react";

type Props = {
	children?: ReactNode;
};

export function NotFound({ children }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 text-center mx-auto my-auto">
			<div className="flex justify-center items-center bg-kahoot-red-light/10 p-8 rounded-full">
				<FileQuestion className="size-16 text-kahoot-red-dark" />
			</div>

			<h3 className="text-3xl font-bold mt-4">Quiz not found</h3>
			<p className="text-lg leading-relaxed font-medium text-center text-kahoot-gray">
				We couldn't find the quiz you're looking for. <br /> It might have been
				deleted, or the address is incorrect.
			</p>

			{children && (
				<div className="flex justify-center items-center gap-3 w-full mt-4">
					{children}
				</div>
			)}
		</div>
	);
}
