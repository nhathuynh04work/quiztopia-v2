"use client";

import { Button } from "@/components/button";
import { isActivePath } from "@/lib/utils/active-link";
import { cn } from "@/lib/utils/cn";
import { Folder, FolderClosed, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FolderNavItem } from "./folder-nav-item";
import { AddFolderInput } from "./add-folder-input";

const folders = [
	{
		id: "folder1",
		name: "folder 1",
	},
	{
		id: "folder2",
		name: "folder 2",
	},
];

export function FoldersNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [isAddingFolder, setIsAddingFolder] = useState(false);

	const isActive = isActivePath(pathname, "/library/folders", { exact: true });

	return (
		<nav className="flex flex-col gap-2">
			<div
				className={cn(
					"flex items-center hover:bg-blue-50 px-4 py-3 text-md font-medium rounded-md",
					isActive && "bg-blue-50",
				)}
			>
				<div
					className={cn(
						"flex-1 flex items-center gap-2",
						isActive && "text-blue-700 font-bold",
					)}
				>
					<div onClick={() => setOpen((prev) => !prev)}>
						{open ? <FolderOpen size={20} /> : <FolderClosed size={20} />}
					</div>
					<Link href="/library/folders" className="flex-1">
						Your folders
					</Link>
				</div>
				<Button
					className="hover:bg-gray-100 p-1 rounded-sm"
					onClick={() => setIsAddingFolder((prev) => !prev)}
				>
					<Plus size={12} strokeWidth={2.4} />
				</Button>
			</div>

			{isAddingFolder && (
				<div className="py-3 pr-4 pl-8">
					<AddFolderInput
						onSuccess={() => {
							setIsAddingFolder(false);
						}}
					/>
				</div>
			)}

			{open && folders.length > 0 && (
				<div className="flex flex-col gap-2">
					{folders.map((folder) => (
						<FolderNavItem key={folder.id} folder={folder} />
					))}
				</div>
			)}
		</nav>
	);
}
