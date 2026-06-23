import { QuizForDrawer } from "../../../types/quiz-for-drawer";
import { GeneralInfo } from "./general-info";
import { QuestionList } from "./question-list";

type Props = {
	quiz: QuizForDrawer;
};

export function Main({ quiz }: Props) {
	return (
		<div className="w-3/4 flex flex-col gap-12">
			<GeneralInfo quiz={quiz} />
			<QuestionList theme={quiz.theme} questions={quiz.questions} />
		</div>
	);
}
