import { Button } from "@/components/button";
import { cn } from "@/lib/utils/cn";
import { ChevronRight, LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	Icon: LucideIcon;
	title: string;
	description: string;
};

export function ActionButton({
	Icon,
	title,
	description,
	className,
	...props
}: Props) {
	return (
		<Button
			className={cn(
				"flex items-center gap-6 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-lg border-b-2 border-gray-300 group",
				className,
			)}
			{...props}
		>
			<Icon />
			<div className="flex-1 h-[32px] flex flex-col justify-center text-left">
				<span className="text-lg font-bold leading-none">
					{title}
				</span>
				<div className="grid transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
					<div className="overflow-hidden">
						<span className="block font-medium leading-none opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 mt-1">
							{description}
						</span>
					</div>
				</div>
			</div>
			<ChevronRight className="stroke-[1.2]" />
		</Button>
	);
}
