import { Separator } from "@/components/layouts/separator";
import {
	AllowMultipleSelect,
	PointsSelect,
	QuestionTypeSelect,
	TimeLimitSelect,
} from "./selects";
import { QuestionSettingActionList } from "./action-list";
import { Question } from "@/features/quiz/types/question";
import { QUESTION_TYPE } from "@/features/quiz/constants/question-type";

type Props = {
	question: Question;
};

export function QuestionSetting({ question }: Props) {
	return (
		<>
			<div className="pt-6 pb-8">
				<QuestionTypeSelect type={question.type} />
			</div>

			<Separator />

			<div className="flex-1 flex flex-col gap-6 py-6">
				<TimeLimitSelect timeLimitMs={question.timeLimitMs} />
				<PointsSelect points={question.points} />

				{question.type === QUESTION_TYPE.MULTIPLE_CHOICE && (
					<AllowMultipleSelect
						allowMultiple={question.metadata.allowMultiple}
					/>
				)}
			</div>

			<Separator />

			<QuestionSettingActionList />
		</>
	);
}
