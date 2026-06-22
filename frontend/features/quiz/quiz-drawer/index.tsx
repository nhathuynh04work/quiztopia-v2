"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useDrawerStore } from "../quiz-library/stores/use-drawer-store";
import { useSyncDrawerWithUrl } from "./hooks/use-sync-drawer-with-url";
import { Header } from "./header";
import { Metadata } from "./metadata";
import { Overlay } from "./overlay";

export function QuizDrawer() {
	const { id, close } = useDrawerStore();
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

						<Dialog.Content asChild forceMount>
							<motion.div
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								exit={{ y: "100%" }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="absolute inset-0 z-50 bg-white rounded-t-2xl flex flex-col outline-none overflow-hidden"
							>
								<Metadata />
								<Header />
							</motion.div>
						</Dialog.Content>
					</>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
