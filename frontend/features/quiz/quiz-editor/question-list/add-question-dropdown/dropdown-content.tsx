import {
	QUESTION_TYPE,
	QUESTION_TYPE_CONFIG,
} from "@/features/quiz/constants/question-type";
import { Content, Arrow, Item } from "@radix-ui/react-dropdown-menu";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";

export function DropdownContent() {
	const addQuestion = useQuizEditorStore((s) => s.addQuestion);

	return (
		<Content
			side="right"
			sideOffset={36}
			collisionPadding={12}
			className="w-2xl bg-white grid grid-cols-3 gap-2 p-4 rounded-md filter drop-shadow-md z-50"
		>
			<Arrow className="fill-white" width={16} height={8} />
			{Object.values(QUESTION_TYPE).map((type) => {
				const config = QUESTION_TYPE_CONFIG[type];

				return (
					<Item
						onClick={() => addQuestion(type)}
						key={type}
						className="flex flex-col items-center gap-2 px-4 py-8 bg-gray-200 hover:bg-gray-300 transition-all cursor-pointer rounded-sm shadow-sm"
					>
						<img src={config.iconPath} className="max-w-10" />
						<span className="font-bold text-md">{config.text}</span>
					</Item>
				);
			})}
		</Content>
	);
}
