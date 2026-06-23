import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export function Button({ children, className, ...props }: Props) {
	const { disabled } = props;
	return (
		<button
			{...props}
			className={cn(!disabled && "cursor-pointer", className ?? "")}
		>
			{children}
		</button>
	);
}
