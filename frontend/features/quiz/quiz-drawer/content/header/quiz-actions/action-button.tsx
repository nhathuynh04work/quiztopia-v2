import { Button } from "@/components/button";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	Icon: LucideIcon;
	title: string;
};

export function ActionButton({ Icon, title, ...props }: Props) {
	return (
		<Button
			{...props}
			className="flex items-center gap-2 text-black-soft py-4 px-4 rounded-md hover:bg-[#f2f2f2]"
		>
			<Icon size={14} />
			<span className="text-lg font-medium">{title}</span>
		</Button>
	);
}
