import { QuizActions } from "./quiz-actions";
import { AuthorInfo } from "./author-info";
import { NavActions } from "./nav-actions";
import { QuizForDrawer } from "../../types/quiz-for-drawer";

type Props = {
	quiz: QuizForDrawer;
};

export function Header({ quiz }: Props) {
	return (
		<header className="w-full grid grid-cols-3 items-center px-6 py-4 border-b border-gray-200">
			<div>
				<AuthorInfo author={quiz.user} />
			</div>

			<div className="justify-self-center">
				<QuizActions id={quiz.id} />
			</div>

			<div className="justify-self-end">
				<NavActions />
			</div>
		</header>
	);
}
