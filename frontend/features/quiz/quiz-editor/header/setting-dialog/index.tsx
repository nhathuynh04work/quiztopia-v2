"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SettingDialogContent } from "./setting-dialog-content";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";

export function SettingDialog() {
	const title = useQuizEditorStore((s) => s.quiz.title);
	const isValid = title.length > 0;

	return (
		<Dialog.Root>
			<Dialog.Trigger className="flex items-center gap-2 w-sm border border-gray-200 rounded-md py-2 px-2 cursor-pointer">
				<span
					className={cn(
						"flex-1 text-left text-xl font-extrabold pl-4",
						isValid ? "text-black-soft" : "text-[#6e6e6e]",
					)}
				>
					{isValid ? title : "Enter quiz title..."}
				</span>
				<div className="py-2 px-4 bg-gray-100 font-bold text-lg rounded-sm">
					Settings
				</div>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/70 fixed inset-0" />
				<SettingDialogContent />
			</Dialog.Portal>
		</Dialog.Root>
	);
}
