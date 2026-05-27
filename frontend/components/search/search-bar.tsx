"use client";

import { Search } from "lucide-react";

export function SearchBar() {
	return (
		<form
			action=""
			className="flex items-center border border-gray-300 rounded-sm p-2 gap-3 w-lg">
			<Search size={16} />
			<input type="text" placeholder="Search public content" className="text-xl outline-none ring-0"/>
		</form>
	);
}
