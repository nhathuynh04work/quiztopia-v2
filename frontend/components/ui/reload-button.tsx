"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	reload?: () => void;
};

export function ReloadButton({ reload, className, ...props }: Props) {
	const handleReload = () => {
		if (reload) {
			reload();
			return;
		}

		window.location.reload();
	};

	return (
		<Button
			onClick={handleReload}
			className={cn(
				"px-6 py-3 bg-kahoot-blue-light border-b-4 border-blue-900 text-white font-bold text-md rounded-sm transition-all text-center",
				"hover:translate-y-[2px] hover:border-b-2 hover:bg-kahoot-blue-dark",
				className,
			)}
			{...props}
		>
			Try again
		</Button>
	);
}
