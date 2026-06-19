"use client";

import { isActivePath } from "@/lib/utils/active-link";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
	{
		key: "all",
		title: "Recent",
	},
	{
		key: "drafts",
		title: "Drafts",
	},
	{
		key: "favorites",
		title: "Favorites",
	},
	{
		key: "shared-with-me",
		title: "Shared with you",
	},
];

export function Tabs() {
	const pathname = usePathname();

	return (
		<div className="flex border border-gray-300 rounded-sm">
			{TABS.map((tab) => {
				const { key, title } = tab;
				const isActive = isActivePath(pathname, key, { exact: false });

				return (
					<Link
						key={key}
						href={`/library/quizzes/${key}`}
						className={cn(
							"text-lg font-bold py-3 px-6 border border-gray-200",
							isActive
								? "text-kahoot-blue-light bg-white"
								: "hover:bg-gray-100",
						)}
					>
						{title}
					</Link>
				);
			})}
		</div>
	);
}
