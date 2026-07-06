import { Button } from "@/components/button";
import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { SessionUser } from "@/features/auth/types/session-user";

type Props = {
	user: SessionUser | null;
};

export function TopBar({ user }: Props) {
	return (
		<div className="flex justify-between w-full px-6 py-6">
			<Logo size="xl" />
			{user ? (
				<div className="flex items-center gap-4">
					<Button className="p-2 bg-gray-800/75 rounded-md">
						<Avatar url={user.avatar} name={user.name} size="sm" />
					</Button>
				</div>
			) : (
				<Button className="text-xl font-bold px-6 py-2 bg-gray-800/75 rounded-md text-white">
					Login
				</Button>
			)}
		</div>
	);
}
