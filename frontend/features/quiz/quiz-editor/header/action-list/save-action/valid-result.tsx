import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { DialogClose } from "@radix-ui/react-dialog";
import { MonitorUp, Play, Share } from "lucide-react";

export function ValidResult() {
	return (
		<div className="w-2xl px-8 py-10 flex flex-col gap-10">
			<header className="text-3xl font-bold">Your quiz is ready</header>

			<div className="flex-1 flex flex-col gap-4">
				<Button className="w-full py-4 px-6 shadow-sm bg-[#f2f2f2] hover:bg-[#ccc] transition-all rounded-md flex items-center gap-4">
					<Play />
					<div className="flex flex-col text-left">
						<p className="text-xl font-bold">Launch demo</p>
						<p className="font-semibold text-kahoot-gray">
							Run a test session before hosting live
						</p>
					</div>
				</Button>
				<Button className="w-full py-4 px-6 shadow-sm bg-[#f2f2f2] hover:bg-[#ccc] transition-all rounded-md flex items-center gap-4">
					<MonitorUp />
					<div className="flex flex-col text-left">
						<p className="text-xl font-bold">Host live</p>
						<p className="font-semibold text-kahoot-gray">
							Display on a big screen
						</p>
					</div>
				</Button>
				<Button className="w-full py-4 px-6 shadow-sm bg-[#f2f2f2] hover:bg-[#ccc] transition-all rounded-md flex items-center gap-4">
					<Share />
					<div className="flex flex-col text-left">
						<p className="text-xl font-bold">Share</p>
						<p className="font-semibold text-kahoot-gray">
							Allow other hosts to use this quiz
						</p>
					</div>
				</Button>
			</div>

			<div className="flex justify-center items-center gap-2">
				<DialogClose asChild>
					<Button
						className={cn(
							"bg-[#f2f2f2] hover:bg-[#ccc] border-b-4",
							"border-[#b5b5b5] hover:border-b-2 hover:translate-y-[2px]",
							"rounded-md text-black text-xl font-bold py-4 px-6",
						)}
					>
						Back to edit
					</Button>
				</DialogClose>
				<Button
					className={cn(
						"bg-kahoot-blue-light hover:bg-kahoot-blue-dark border-b-4",
						"border-blue-900 hover:border-b-2 hover:translate-y-[2px]",
						"rounded-md text-white text-xl font-bold py-4 px-6",
					)}
				>
					Done
				</Button>
			</div>
		</div>
	);
}
