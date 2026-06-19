"use client";

import { isActivePath } from "@/lib/utils/active-link";
import { cn } from "@/lib/utils/cn";
import { Folder } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	folder: { id: string; name: string };
};

export function FolderNavItem({ folder }: Props) {
	const href = `/library/folders/${folder.id}`;

	const pathname = usePathname();
	const isActive = isActivePath(pathname, href, { exact: true });

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center hover:bg-blue-50 px-4 py-3 text-md font-medium rounded-md gap-2",
				isActive && "text-blue-700 font-bold bg-blue-50",
			)}
		>
			<Folder size={20} />
			<span>{folder.name}</span>
		</Link>
	);
}
