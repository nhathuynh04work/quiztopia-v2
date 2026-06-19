"use client";

import { Header } from "./header";
import { QuestionList } from "./question-list";
import { QuestionEditor } from "./question-editor";
import { SettingMenu } from "./setting-menu";
import { SettingPanel } from "./setting-panel";
import { useQuizEditorStore } from "./hooks/use-quiz-editor-store";
import { useAutoSave } from "./hooks/use-autosave";

export function QuizEditor() {
	const quizId = useQuizEditorStore((s) => s.quiz.id);
	const isAddDropdownOpen = useQuizEditorStore((s) => s.isAddDropdownOpen);
	const isSettingOpen = useQuizEditorStore((s) => s.selectedMenu !== null);

	useAutoSave(quizId);

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex-1 flex overflow-hidden">
				<div className="w-3xs h-full">
					<QuestionList />
				</div>

				<div className="flex-1 h-full flex relative">
					{isAddDropdownOpen && (
						<div className="absolute inset-0 bg-black/70 z-40 pointer-events-none" />
					)}

					<div className="flex-1 h-full overflow-y-scroll">
						<QuestionEditor />
					</div>

					{isSettingOpen && (
						<div className="w-sm h-full">
							<SettingPanel />
						</div>
					)}
				</div>

				<div className="h-full">
					<SettingMenu />
				</div>
			</div>
		</div>
	);
}
