"use client";

import { Button } from "@/components/ui/button";
import { revokeSessionAction } from "../actions/sessions";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
	sessionId: string;
};

export function SessionItemActions({ sessionId }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			const { error } = await revokeSessionAction(sessionId);

			if (error) {
				toast.error(error);
				return;
			}

			toast.success("Logged out successfully");
			router.refresh();
		});
	};

	return (
		<div>
			<Button
				onClick={handleLogout}
				disabled={isPending}
				className="text-xl font-medium text-red-500 hover:text-red-600"
			>
				{isPending ? "Logging out..." : "Log out"}
			</Button>
		</div>
	);
}
