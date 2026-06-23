import { Dispatch, SetStateAction } from "react";
import { VIEW_MODE, VIEW_MODE_CONFIG, ViewMode } from "./view-mode";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils/cn";

type Props = {
	currentMode: ViewMode;
	setMode: Dispatch<SetStateAction<ViewMode>>;
};

export function ViewModeTabs({ currentMode, setMode }: Props) {
	const modes = Object.values(VIEW_MODE);

	return (
		<div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
			{modes.map((mode, index) => {
				const { Icon, description } = VIEW_MODE_CONFIG[mode];
				const isLast = index < modes.length - 1;
				const isActive = currentMode === mode;

				return (
					<Button
						key={mode}
						onClick={() => setMode(mode)}
						className={cn(
							"p-3.5 border-gray-300 hover:bg-gray-100",
							isLast && "border-r",
							isActive && "bg-gray-100",
						)}
					>
						<Icon
							size={20}
							className={cn("stroke-[1.5]", isActive && "fill-black-soft")}
						/>
					</Button>
				);
			})}
		</div>
	);
}
