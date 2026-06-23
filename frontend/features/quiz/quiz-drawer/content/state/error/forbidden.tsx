import { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";

type Props = {
	children?: ReactNode;
};

export function Forbidden({ children }: Props) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 text-center mx-auto my-auto">
			<div className="flex justify-center items-center bg-kahoot-red-light/10 p-8 rounded-full">
				<LockKeyhole className="size-16 text-kahoot-red-dark" />
			</div>

			<h3 className="text-3xl font-bold mt-4">This quiz is private</h3>
			<p className="text-lg leading-relaxed font-medium text-center text-kahoot-gray">
				You don't have permission to view this quiz. <br />
				Ask the owner to share it with you or make it public.
			</p>

			{children && (
				<div className="flex justify-center items-center gap-3 w-full mt-4">
					{children}
				</div>
			)}
		</div>
	);
}
