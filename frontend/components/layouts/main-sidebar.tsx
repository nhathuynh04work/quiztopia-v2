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
		exact: true,
	},
	{
		text: "Discover",
		href: "/discover",
		icon: Compass,
		exact: true,
	},
	{
		text: "Library",
		href: "/library",
		icon: List,
		exact: false,
	},
	{
		text: "Reports",
		href: "/reports",
		icon: ChartNoAxesColumn,
		exact: true,
	},
];

export function MainSidebar() {
	const pathname = usePathname();
	const baseItemClasses =
		"flex items-center gap-2 px-4 py-3 rounded-md font-medium text-md";
	const iconSize = 20;

	return (
		<nav className="flex flex-col self-stretch w-3xs shadow-md border-r border-gray-200 px-2 relative z-10">
			<div className="flex flex-col gap-2 py-2">
				{items.map((item) => {
					const isActive = isActivePath(pathname, item.href, {
						exact: item.exact,
					});

					return (
						<Link
							key={item.text}
							href={item.href}
							className={cn(
								baseItemClasses,
								isActive ? "bg-kahoot-purple text-white" : "hover:bg-gray-200",
							)}
						>
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
