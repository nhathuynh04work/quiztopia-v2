import { QuizForDrawer } from "../../types/quiz-for-drawer";
import { Main } from "./main";
import { Sidebar } from "./sidebar";

type Props = {
	quiz: QuizForDrawer;
};

export function Body({ quiz }: Props) {
	return (
		<div className="p-10 flex-1 overflow-y-auto flex gap-8">
			<Main quiz={quiz} />
			<Sidebar quiz={quiz} />
		</div>
	);
}
