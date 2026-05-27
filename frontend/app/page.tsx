import { Sidebar } from "@/components/layouts/sidebar";
import { TopBar } from "@/components/layouts/top-bar/top-bar";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Home() {
	const user = await getCurrentUser();

	return (
		<div>
			<TopBar user={user} />
			{user && <Sidebar user={user} />}
		</div>
	);
}
