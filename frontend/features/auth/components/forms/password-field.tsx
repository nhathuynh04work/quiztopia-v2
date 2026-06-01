"use client";

import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
};

export function PasswordField({ className, ...props }: Props) {
	const [show, setShow] = useState<Boolean>(false);

	const toggleShow = () => {
		setShow((s) => !s);
	};

	return (
		<div
			className={cn(
				"flex focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-[#005fcc]",
				className,
			)}
		>
			<input
				className="flex-1 outline-none"
				{...props}
				type={show ? "text" : "password"}
			/>
			<div className="cursor-pointer" onClick={toggleShow}>
				{show ? <EyeOff /> : <Eye />}
			</div>
		</div>
	);
}
