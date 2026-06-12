import Link from "next/link";
import { UnderlineOnHoverText } from "@/components/ui/underline-on-hover-text";

const items = [
	{
		text: "Physics",
		href: "/quiz?category=physics",
	},
	{
		text: "Chemistry",
		href: "/quiz?category=chemistry",
	},
	{
		text: "Biology",
		href: "/quiz?category=biology",
	},
	{
		text: "History",
		href: "/quiz?category=history",
	},
	{
		text: "Geography",
		href: "/quiz?category=geography",
	},
];

export function GuestNav() {
	return (
		<div className="flex items-center gap-6">
			<Link
				href="/news"
				className="bg-kahoot-blue-light hover:bg-kahoot-blue-dark text-white py-2 px-4 rounded-md transition font-semibold ml-6">
				News
			</Link>
			{items.map((item) => (
				<Link key={item.href} href={item.href} className="font-semibold">
					<UnderlineOnHoverText>{item.text}</UnderlineOnHoverText>
				</Link>
			))}
		</div>
	);
}
