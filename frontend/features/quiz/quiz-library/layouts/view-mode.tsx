"use client";

import { Button } from "@/components/button";
import { VIEW_MODE, VIEW_MODE_CONFIG } from "../constants/view-mode";
import { useQuizLibraryStore } from "../stores/use-quiz-library-store";
import { cn } from "@/lib/utils/cn";

export function ViewMode() {
	const current = useQuizLibraryStore((s) => s.view);
	const setView = useQuizLibraryStore((s) => s.setView);

	return (
		<div className="flex items-center">
			{Object.values(VIEW_MODE).map((mode) => {
				const { Icon } = VIEW_MODE_CONFIG[mode];
				const isActive = current === mode;

				return (
					<Button
						key={mode}
						onClick={() => setView(mode)}
						className="p-2 hover:bg-gray-300 rounded-sm group"
					>
						<Icon
							size={30}
							className={cn(
								"stroke-kahoot-gray group-hover:stroke-kahoot-blue-dark",
								isActive && "fill-kahoot-blue-dark stroke-kahoot-blue-dark",
							)}
						/>
					</Button>
				);
			})}
		</div>
	);
}
