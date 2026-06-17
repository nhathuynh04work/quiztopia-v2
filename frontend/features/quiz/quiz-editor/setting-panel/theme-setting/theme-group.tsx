import { Button } from "@/components/ui/button";
import { THEMES } from "@/features/quiz/constants/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ThemeItem } from "./theme-item";

type Props = {
	group: (typeof THEMES)[number];
};

export function ThemeGroup({ group }: Props) {
	const [show, setShow] = useState(true);

	return (
		<div className="flex flex-col">
			<header className="flex items-center justify-between text-kahoot-gray">
				<span className="text-xl font-medium ">{group.name}</span>
				<Button
					onClick={() => setShow((prev) => !prev)}
					className="p-1 hover:bg-gray-200 rounded-sm"
				>
					{show ? (
						<ChevronDown size={30} strokeWidth={1.2} />
					) : (
						<ChevronUp size={30} strokeWidth={1.2} />
					)}
				</Button>
			</header>

			{show && (
				<div className="grid grid-cols-2 gap-6 pt-2 pb-6">
					{group.themes.map((theme) => (
						<ThemeItem key={theme.value} theme={theme} />
					))}
				</div>
			)}
		</div>
	);
}
