import { motion } from "motion/react";
import { DialogOverlay } from "@radix-ui/react-dialog";

export function Overlay() {
	return (
		<DialogOverlay asChild forceMount>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="fixed inset-0 bg-overlay z-50"
			/>
		</DialogOverlay>
	);
}
