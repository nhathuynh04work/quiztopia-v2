import { Separator } from "@/components/layouts/separator";
import { Button } from "@/components/ui/button";
import { Palette, SlidersVertical } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils/cn";
import React from "react";
import { useQuizEditorStore } from "../hooks/use-quiz-editor-store";

const menuItems = [
	{
		icon: Palette,
		text: "Themes",
		menu: "themes" as const,
	},
	{
		icon: SlidersVertical,
		text: "Properties",
		menu: "properties" as const,
	},
];

export function SettingMenu() {
	const [selectedMenu, setSelectedMenu] = useQuizEditorStore(
		useShallow((s) => [s.selectedMenu, s.setSelectedMenu]),
	);

	const handleSetMenu = (menu: "themes" | "properties") => {
		if (selectedMenu === menu) {
			return setSelectedMenu(null);
		}

		setSelectedMenu(menu);
	};

	const iconSize = 18;
	const baseClasses =
		"flex flex-col gap-1 items-center py-5 px-3 hover:bg-gray-100 rounded-sm text-xs font-semibold border-2 border-transparent";

	return (
		<div className="h-full flex flex-col px-2 py-3 gap-1 border-l border-gray-200">
			{menuItems.map((item, index) => {
				const isActive = item.menu === selectedMenu;

				return (
					<React.Fragment key={item.menu}>
						<Button
							className={cn(
								baseClasses,
								isActive && "border-kahoot-blue-light bg-blue-50",
							)}
							onClick={() => handleSetMenu(item.menu)}
						>
							<item.icon size={iconSize} />
							<span>{item.text}</span>
						</Button>

						{index < menuItems.length - 1 && <Separator />}
					</React.Fragment>
				);
			})}
		</div>
	);
}
