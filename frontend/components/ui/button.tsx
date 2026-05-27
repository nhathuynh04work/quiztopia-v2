import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

export function Button({
	type = "button",
	children,
	className,
	onClick,
}: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`cursor-pointer ${className ?? ""}`}>
			{children}
		</button>
	);
}
