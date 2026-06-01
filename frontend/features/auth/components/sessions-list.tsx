import { cn } from "@/lib/utils/cn";
import { Session } from "../types/session";
import { SessionItem } from "./session-item";

type Props = {
	sessions: Session[];
};

export function SessionsList({ sessions }: Props) {
	return (
		<div className="flex flex-col">
			{sessions.map((session, index) => (
				<div
					key={session.id}
					className={cn(
						index > 0 && "pt-6",
						index < sessions.length - 1 && "border-b pb-6",
						"border-gray-200",
					)}
				>
					<SessionItem session={session} />
				</div>
			))}
		</div>
	);
}
