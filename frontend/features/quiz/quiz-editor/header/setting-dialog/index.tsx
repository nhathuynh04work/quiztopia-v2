"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { SettingDialogContent } from "./setting-dialog-content";
import { DialogData } from "./dialog-data";

export function SettingDialog() {
	const [open, setOpen] = useState(false);

	const quiz = useQuizEditorStore((s) => s.quiz);
	const setData = useQuizEditorStore((s) => s.setQuizDataUsingDialog);

	const [draft, setDraft] = useState<DialogData>({
		title: quiz.title,
		description: quiz.description,
		visibility: quiz.visibility,
	});

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setDraft({
				title: quiz.title,
				description: quiz.description,
				visibility: quiz.visibility,
			});
		}

		setOpen(open);
	};

	const handleDone = () => {
		setData(draft);
		setOpen(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger className="flex items-center gap-2 w-sm border border-gray-200 rounded-md py-2 px-2 cursor-pointer">
				<span
					className={cn(
						"flex-1 text-left text-xl font-extrabold pl-4 truncate",
						quiz.title.length > 0 ? "text-black-soft" : "text-kahoot-gray",
					)}
				>
					{quiz.title.length > 0 ? quiz.title : "Enter quiz title..."}
				</span>
				<div className="py-2 px-4 bg-gray-100 font-bold text-lg rounded-sm">
					Settings
				</div>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-black/70 fixed inset-0" />
				<SettingDialogContent
					draft={draft}
					setDraft={setDraft}
					onDone={handleDone}
				/>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
