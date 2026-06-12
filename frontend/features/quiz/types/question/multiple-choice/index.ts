import { QUESTION_TYPE } from "../../../constants/question-type";
import { BaseQuestion } from "../base";
import { Option } from "./option";

export type MultipleChoiceQuestion = BaseQuestion & {
	type: typeof QUESTION_TYPE.MULTIPLE_CHOICE;
	metadata: MultipleChoiceMetadata;
};

export type MultipleChoiceMetadata = {
	allowMultiple: boolean;
	options: Option[];
};
