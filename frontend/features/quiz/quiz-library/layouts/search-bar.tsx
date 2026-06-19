import { Search } from "lucide-react";

export function SearchBar() {
	return (
		<div className="flex items-center bg-white border border-gray-300 rounded-sm py-2.5 px-4 gap-4 w-sm">
			<Search size={24} className="stroke-kahoot-gray" />
			<input
				type="text"
				placeholder="Search"
				className="text-lg font-medium outline-none ring-0"
			/>
		</div>
	);
}
