import Link from "next/link";
import { SessionUser } from "@/features/auth/types/session-user";
import { AuthedActions } from "./authed-actions/authed-actions";
import { GuestNav } from "./guest-nav";
import { GuestActions } from "./guest-actions";
import { Logo } from "@/components/ui/logo";
import { SearchBar } from "@/components/search/search-bar";

type Props = {
	user: SessionUser | null;
};

export function TopBar({ user }: Props) {
	return (
		<header>
			<nav className={`flex items-center py-4 px-6 shadow-sm`}>
				<div className="flex items-center">
					<Link href="/" className="mr-6">
						<Logo size="lg" />
					</Link>
				</div>

				<div
					className={`flex-1 flex items-center ${user ? "justify-center" : ""}`}>
					{user ? <SearchBar /> : <GuestNav />}
				</div>

				<div className={`flex items-center ml-auto`}>
					{user ? <AuthedActions user={user} /> : <GuestActions />}
				</div>
			</nav>
		</header>
	);
}
