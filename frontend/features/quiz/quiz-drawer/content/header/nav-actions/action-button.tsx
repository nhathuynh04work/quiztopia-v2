import { Button } from "@/components/button";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	Icon: LucideIcon;
};

export function ActionButton({ Icon, ...props }: Props) {
	return (
		<Button
			{...props}
			className="p-3 rounded-sm bg-[#f2f2f2] hover:bg-[#dadada]"
		>
			<Icon size={22} className="stroke-black-soft" />
		</Button>
	);
}
