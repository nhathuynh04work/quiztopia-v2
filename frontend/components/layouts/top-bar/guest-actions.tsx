import Link from "next/link";
import { UnderlineOnHoverText } from "@/components/ui/underline-on-hover-text";

export function GuestActions() {
	return (
		<div className="flex items-center gap-6 font-semibold">
			<Link href="/play">
				<UnderlineOnHoverText>Play</UnderlineOnHoverText>
			</Link>
			<Link
				href="/signup"
				className="bg-kahoot-purple hover:bg-green-900 text-white py-2 px-4 rounded-md transition">
				Start for FREE
			</Link>
			<Link href="/login">
				<UnderlineOnHoverText>Login</UnderlineOnHoverText>
			</Link>
		</div>
	);
}
