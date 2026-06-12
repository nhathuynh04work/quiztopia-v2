import { Check, ChevronDown, Shapes } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Props = {
	allowMultiple: boolean;
};

export function AllowMultipleSelect({ allowMultiple }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Shapes size={16} />
				<span className="text-lg font-bold">Answer options</span>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button className="w-full flex items-center justify-center gap-2 border border-[#b2b2b2] rounded-md text-xl font-bold py-3 px-4">
						<div className="flex-1 flex gap-3 items-center">
							<span className="text-black font-medium text-lg">
								{allowMultiple ? "Multi-select" : "Single select"}
							</span>
						</div>
						<ChevronDown />
					</Button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={12}
						align="end"
						className="w-(--radix-dropdown-menu-trigger-width) bg-white flex flex-col p-2 rounded-md border border-gray-200 shadow-sm"
					>
						<Button
							className={cn(
								"flex flex-col gap-1 p-4 rounded-sm text-left",
								!allowMultiple ? "cursor-default" : "hover:bg-gray-100",
							)}
						>
							<div className="flex items-center justify-between">
								<span className="text-black font-bold text-lg">
									Single select
								</span>
								{!allowMultiple && <Check size={16} />}
							</div>
							<p className="font-medium">
								Participants can only select one of the answers
							</p>
						</Button>
						<Button
							className={cn(
								"flex flex-col gap-1 p-4 rounded-sm text-left",
								allowMultiple ? "cursor-default" : "hover:bg-gray-100",
							)}
						>
							<div className="flex items-center justify-between">
								<span className="text-black font-bold text-lg">
									Multi-select
								</span>
								{allowMultiple && <Check size={16} />}
							</div>
							<p className="font-medium">
								Participants can select multiple answers before submitting
							</p>
						</Button>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
