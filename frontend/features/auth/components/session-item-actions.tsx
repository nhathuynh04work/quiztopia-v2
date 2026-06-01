"use client";

import { Button } from "@/components/ui/button";

type Props = {
	sessionId: string;
};

export function SessionItemActions({ sessionId }: Props) {
	return (
		<div>
			<Button className="text-xl font-medium text-red-500 hover:text-red-600">
				Log out
			</Button>
		</div>
	);
}
