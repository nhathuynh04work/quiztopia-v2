import { EllipsisVertical, Pencil, Share, Star } from "lucide-react";
import { ActionButton } from "./action-button";
import { useRouter } from "next/navigation";
import { useDrawerStore } from "../../../hooks/use-drawer-store";

type Props = {
	id: string;
};

export function QuizActions({ id }: Props) {
	const router = useRouter();
	const setId = useDrawerStore((s) => s.setId);

	const handleEdit = () => {
		setId(null);
		router.push(`/quiz/${id}/edit`);
	};

	return (
		<div className="flex items-center gap-4">
			<ActionButton Icon={Pencil} title="Edit" onClick={handleEdit} />
			<ActionButton Icon={Star} title="Favorite" />
			<ActionButton Icon={Share} title="Share" />
			<ActionButton Icon={EllipsisVertical} title="Options" />
		</div>
	);
}
