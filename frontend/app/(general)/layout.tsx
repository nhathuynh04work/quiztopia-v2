import { MainSidebar } from "@/components/layouts/main-sidebar";
import { TopBar } from "@/components/layouts/top-bar/top-bar";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function GeneralLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getCurrentUser();

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<TopBar user={user} />
			<div className="flex flex-1 min-h-0 overflow-hidden">
				{user && <MainSidebar />}
				<div className="flex-1 bg-[#f2f2f2] overflow-hidden">{children}</div>
			</div>
		</div>
	);
}
