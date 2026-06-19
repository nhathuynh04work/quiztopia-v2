import Link from "next/link";

export function ExitAction() {
	return (
		<Link
			href="/library"
			className="py-3 px-6 bg-gray-200 hover:bg-gray-300 font-bold text-lg rounded-sm"
		>
			Exit
		</Link>
	);
}
