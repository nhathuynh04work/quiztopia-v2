import { TopBar } from "@/components/layouts/top-bar";
import { SessionUser } from "@/features/auth/types/session-user";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Home() {
	const user = await getCurrentUser();

	if (user) {
		return <LoggedInHome user={user} />;
	}

	return (
		<div>
			<TopBar />
		</div>
	);
}

function LoggedInHome({ user }: { user: SessionUser }) {
	return <div>Hello {user.name}! Welcome to Quiztopia</div>;
}
