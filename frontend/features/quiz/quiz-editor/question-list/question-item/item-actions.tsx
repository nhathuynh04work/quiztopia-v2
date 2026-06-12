import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";

const size = 12;
const strokeWidth = 2.5;
const baseClasses = "p-2 rounded-full hover:bg-gray-100";

export function ItemActions() {
	return (
		<div className="flex flex-col gap-2 text-gray-500 justify-end h-full">
			<Button className={baseClasses}>
				<Copy size={size} strokeWidth={strokeWidth} />
			</Button>
			<Button className={baseClasses}>
				<Trash2 size={size} strokeWidth={strokeWidth} />
			</Button>
		</div>
	);
}
