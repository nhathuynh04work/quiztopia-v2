import Link from "next/link";
import { Logo } from "../ui/logo";
import { UnderlineOnHoverText } from "../ui/underline-on-hover-text";

export const items = [
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

export function TopBar() {
	return (
		<header>
			<nav className="flex items-center py-4 px-6 shadow-sm">
				<Link href="/">
					<Logo size="lg" />
				</Link>

				<Link
					href="/news"
					className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition font-semibold ml-6">
					News
				</Link>

				<div className="flex items-center gap-6 ml-6">
					{items.map((item) => (
						<Link key={item.href} href={item.href} className="font-semibold">
							<UnderlineOnHoverText>{item.text}</UnderlineOnHoverText>
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-6 font-semibold">
					<Link href="/play">
						<UnderlineOnHoverText>Play</UnderlineOnHoverText>
					</Link>
					<Link
						href="/signup"
						className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-md transition">
						Start for FREE
					</Link>
					<Link href="/login">
						<UnderlineOnHoverText>Login</UnderlineOnHoverText>
					</Link>
				</div>
			</nav>
		</header>
	);
}
