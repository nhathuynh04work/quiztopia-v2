"use client";

import Link from "next/link";
import {
	ChartNoAxesColumn,
	Compass,
	Home,
	List,
	MessageCircleQuestionMark,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils/active-link";
import { cn } from "@/lib/utils/cn";
import { Button } from "../ui/button";

const items = [
	{
		text: "Home",
		href: "/",
		icon: Home,
	},
	{
		text: "Discover",
		href: "/discover",
		icon: Compass,
	},
	{
		text: "Library",
		href: "/library",
		icon: List,
	},
	{
		text: "Reports",
		href: "/reports",
		icon: ChartNoAxesColumn,
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const baseItemClasses =
		"flex items-center gap-2 px-4 py-3 rounded-md font-medium text-md";
	const iconSize = 20;

	return (
		<nav className="flex flex-col self-stretch w-3xs shadow-sm border-r border-gray-200 px-1">
			<div className="flex flex-col gap-1 py-2">
				{items.map((item) => {
					const isActive = isActivePath(pathname, item.href, { exact: false });

					return (
						<Link
							key={item.text}
							href={item.href}
							className={cn(
								baseItemClasses,
								isActive ? "bg-kahoot-purple text-white" : "hover:bg-gray-200",
							)}>
							<item.icon size={iconSize} />
							<span>{item.text}</span>
						</Link>
					);
				})}
			</div>

			<div className="mt-auto border-t border-gray-200 py-2">
				<Button className={cn(baseItemClasses, "hover:bg-gray-200 w-full")}>
					<MessageCircleQuestionMark size={iconSize} />
					<span>Help</span>
				</Button>
			</div>
		</nav>
	);
}
