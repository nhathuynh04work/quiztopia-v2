import { cn } from "@/lib/utils/cn";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";

type Props = {
	isActive: boolean;
	errors: string[];
};

export function ErrorTooltip({ errors, isActive }: Props) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setOpen(false);
			return;
		}

		setOpen(true);

		const timer = setTimeout(() => setOpen(false), 2000);

		return () => clearTimeout(timer);
	}, [isActive]);

	return (
		<Tooltip.Provider>
			<Tooltip.Root delayDuration={200} open={open} onOpenChange={setOpen}>
				<Tooltip.Trigger
					className={cn(
						"border-2 border-white bg-kahoot-purple rounded-full size-8",
						"text-white font-bold",
						"flex items-center justify-center",
						"absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
					)}
				>
					!
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						side="right"
						sideOffset={6}
						className="bg-kahoot-purple text-lg text-white font-bold py-3 px-4 rounded-md"
					>
						<ul>
							{errors.map((error) => (
								<li key={error}>- {error}</li>
							))}
						</ul>
						<Tooltip.Arrow className="fill-kahoot-purple" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
