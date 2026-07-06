"use client";

import { Search } from "lucide-react";

export function SearchBar() {
	return (
		<div className="flex items-center border border-gray-300 rounded-sm py-3 px-4 gap-6 w-lg">
			<Search size={18} />
			<input
				type="text"
				placeholder="Search public content"
				className="flex-1 text-xl font-medium outline-none ring-0"
			/>
		</div>
	);
}
