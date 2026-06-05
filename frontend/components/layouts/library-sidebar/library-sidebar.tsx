"use client";

import Link from "next/link";
import {
	BadgeQuestionMark,
	FolderClosed,
	LibraryBig,
	Plus,
	Presentation,
	Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils/active-link";
import { cn } from "@/lib/utils/cn";
import { Button } from "../../ui/button";
import { Separator } from "../separator";
import { FoldersNav } from "./folders-nav";

const items = [
	{
		text: "Quiz",
		href: "/library/quizzes",
		icon: BadgeQuestionMark,
	},
	{
		text: "Slide",
		href: "/library/slides",
		icon: Presentation,
	},
	{
		text: "Course",
		href: "/library/courses",
		icon: LibraryBig,
	},
];

export function LibrarySidebar() {
	const pathname = usePathname();
	const baseItemClasses =
		"flex items-center gap-2 rounded-md font-medium text-md px-4 py-3";
	const iconSize = 20;

	return (
		<nav className="flex flex-col h-full w-3xs shadow-sm border-r border-gray-200 px-3 py-2">
			<div className="flex flex-col gap-2 py-4">
				{items.map((item) => {
					const isActive = isActivePath(pathname, item.href, { exact: true });

					return (
						<Link
							key={item.text}
							href={item.href}
							className={cn(
								baseItemClasses,
								isActive
									? "bg-blue-50 text-blue-700 font-bold"
									: "hover:bg-blue-50",
							)}
						>
							<item.icon size={iconSize} />
							<span>{item.text}</span>
						</Link>
					);
				})}
			</div>
			<Separator />
			<div className="flex flex-col gap-2 py-4">
				<FoldersNav />
			</div>
			<Separator />
			<div className="flex flex-col gap-2 py-4">
				<Link href="/trash" className={cn(baseItemClasses, "hover:bg-blue-50")}>
					<Trash2 size={iconSize} />
					<span>Trash</span>
				</Link>
			</div>
		</nav>
	);
}
