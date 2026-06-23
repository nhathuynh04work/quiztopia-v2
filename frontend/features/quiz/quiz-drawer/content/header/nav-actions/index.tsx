import { MoveLeft, MoveRight, X } from "lucide-react";
import { ActionButton } from "./action-button";
import { useDrawerStore } from "@/features/quiz/quiz-drawer/hooks/use-drawer-store";

export function NavActions() {
	const close = useDrawerStore((s) => s.close);

	return (
		<div className="flex items-center gap-3">
			<ActionButton Icon={MoveLeft} />
			<ActionButton Icon={MoveRight} />
			<ActionButton Icon={X} onClick={close} />
		</div>
	);
}
