import { SessionUser } from "@/features/auth/types/session-user";
import { UserMenu } from "./user-menu";
import { CreateMenu } from "./create-menu";

type Props = {
	user: SessionUser;
};

export function AuthedActions({ user }: Props) {
	return (
		<div className="flex items-center gap-6">
			<CreateMenu />
			<UserMenu user={user} />
		</div>
	);
}
