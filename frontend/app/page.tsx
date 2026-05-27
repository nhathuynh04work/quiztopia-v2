import { Sidebar } from "@/components/layouts/sidebar";
import { TopBar } from "@/components/layouts/top-bar/top-bar";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Home() {
	const user = await getCurrentUser();

	return (
		<div className="min-h-screen flex flex-col">
			<TopBar user={user} />
			<div className="flex flex-1 min-h-0">
				{user && <Sidebar />}
				<div className="flex-1 bg-gray-50"></div>
			</div>
		</div>
	);
}
