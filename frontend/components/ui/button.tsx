import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export function Button({ children, className, ...props }: Props) {
	return (
		<button {...props} className={`cursor-pointer ${className ?? ""}`}>
			{children}
		</button>
	);
}
