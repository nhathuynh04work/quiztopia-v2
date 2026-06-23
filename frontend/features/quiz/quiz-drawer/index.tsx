"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "motion/react";
import { useDrawerStore } from "./hooks/use-drawer-store";
import { useSyncDrawerWithUrl } from "./hooks/use-sync-drawer-with-url";
import { Overlay } from "./overlay";
import { Content } from "./content";

export function QuizDrawer() {
	const id = useDrawerStore((s) => s.id);
	const close = useDrawerStore((s) => s.close);
	const isOpen = id !== null;

	useSyncDrawerWithUrl();

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(isOpen) => {
				if (!isOpen) close();
			}}
		>
			<AnimatePresence>
				{isOpen && (
					<>
						<Overlay />
						<Content id={id} />
					</>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
