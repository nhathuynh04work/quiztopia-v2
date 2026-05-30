import { ReactNode } from "react";
import { fieldErrorStyle, labelStyle } from "../styles/form";

type Props = {
	label: string;
	htmlFor: string;
	error?: string;
	children: ReactNode;
};

export function AuthField({ label, htmlFor, error, children }: Props) {
	return (
		<div className="flex flex-col gap-3">
			<label htmlFor={htmlFor} className={labelStyle}>
				{label}
			</label>

			{children}

			{error && <p className={fieldErrorStyle}>{error}</p>}
		</div>
	);
}
