import { SearchBar } from "@/features/quiz/quiz-library/layouts/search-bar";
import { Tabs } from "@/features/quiz/quiz-library/layouts/tabs";
import { ViewMode } from "@/features/quiz/quiz-library/layouts/view-mode";
import { ReactNode } from "react";

export default function QuizzesLayout({ children }: { children: ReactNode }) {
	return (
		<div className="p-8 flex flex-col gap-6 h-full overflow-y-auto">
			<div className="flex">
				<Tabs />
			</div>

			<div className="flex justify-between items-center">
				<SearchBar />
				<ViewMode />
			</div>

			<div className="flex w-full">{children}</div>
		</div>
	);
}
