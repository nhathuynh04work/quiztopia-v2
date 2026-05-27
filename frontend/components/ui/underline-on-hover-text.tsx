"use client";

import { smoothTransition } from "@/animations/transitions";
import { underlineVariants } from "@/animations/variants/underline";
import { motion } from "motion/react";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function UnderlineOnHoverText({ children }: Props) {
	return (
		<motion.span
			className="relative inline-block"
			initial="initial"
			whileHover="hover">
			{children}

			<motion.span
				className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-current"
				variants={underlineVariants}
				transition={smoothTransition}
			/>
		</motion.span>
	);
}
