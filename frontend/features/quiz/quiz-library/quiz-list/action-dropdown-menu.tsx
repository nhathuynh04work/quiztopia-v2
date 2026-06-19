import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
	id: string;
};

export function ActionDropdownMenu({ id }: Props) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild className="outline-none">
				<Button className="p-1 hover:bg-gray-200 rounded-sm">
					<EllipsisVertical size={16} />
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					side="bottom"
					align="start"
					sideOffset={4}
					collisionPadding={8}
					className="p-2 rounded-sm bg-white shadow-md"
				>
					<DropdownMenu.Item asChild>
						<Link
							href={`/quiz/${id}/edit`}
							className="outline-none px-4 py-4 flex items-center gap-4 min-w-40 cursor-pointer hover:bg-gray-200 rounded-sm"
						>
							<Pencil size={22} className="stroke-kahoot-gray" />
							<span className="text-xl font-medium text-black-soft">Edit</span>
						</Link>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none px-4 py-4 flex items-center gap-4 min-w-40 cursor-pointer hover:bg-gray-200 rounded-sm">
						<Trash2 size={22} className="stroke-kahoot-red-dark" />
						<span className="text-xl font-medium text-kahoot-red-dark">
							Delete
						</span>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
