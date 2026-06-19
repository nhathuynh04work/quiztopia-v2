import { SessionUser } from "@/features/auth/types/session-user";
import { UserMenu } from "./user-menu";
import { CreateResourceDropdown } from "./create-resource-dropdown";

type Props = {
	user: SessionUser;
};

export function AuthedActions({ user }: Props) {
	return (
		<div className="flex items-center gap-6">
			<CreateResourceDropdown />
			<UserMenu user={user} />
		</div>
	);
}
