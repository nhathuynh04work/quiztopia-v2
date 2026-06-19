"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { FolderPlus } from "lucide-react";
import { useState } from "react";

type Props = {
	onSuccess: () => void;
};

export function AddFolderInput({ onSuccess }: Props) {
	const [name, setName] = useState("");
	const disabled = name.length === 0;

	return (
		<div className="flex items-center gap-2">
			<Button disabled={disabled}>
				<FolderPlus
					size={20}
					className={cn("shrink-0", disabled && "opacity-30")}
				/>
			</Button>
			<input
				type="text"
        autoFocus
				value={name}
				onChange={(e) => setName(e.target.value.trim())}
				className="min-w-0 flex-1 border border-gray-200 rounded-sm px-4 py-2 font-semibold"
			/>
		</div>
	);
}
