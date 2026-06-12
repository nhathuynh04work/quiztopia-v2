import { MAX_QUESTION_TITLE_LENGTH } from "../../constants/constraints";


type Props = {
	title: string;
};

export function QuestionTitle({ title }: Props) {
	return (
		<div className="w-full relative group">
			<textarea
				maxLength={MAX_QUESTION_TITLE_LENGTH}
				placeholder="Start typing your question"
				className="py-4 px-12 bg-white rounded-md w-full text-4xl text-center font-semibold border-b-4 border-gray-300 outline-none field-sizing-content resize-none"
			/>
			<span className="absolute top-2 right-2 text-xl font-semibold hidden group-focus-within:inline-block text-gray-500">
				{MAX_QUESTION_TITLE_LENGTH - title.length}
			</span>
		</div>
	);
}
