import { Button } from "@/components/button";
import { THEMES } from "@/features/quiz/constants/themes";
import { useQuizEditorStore } from "../../hooks/use-quiz-editor-store";
import { cn } from "@/lib/utils/cn";

type Props = {
	theme: (typeof THEMES)[number]["themes"][number];
};

export function ThemeItem({ theme }: Props) {
	const { textBackground, textColor, value, name } = theme;
	const isActive = useQuizEditorStore((s) => s.quiz.theme === value);
	const setTheme = useQuizEditorStore((s) => s.setQuizTheme);

	return (
		<Button
			onClick={() => setTheme(value)}
			className={cn(
				"flex flex-col w-full aspect-square rounded-md bg-cover bg-center",
				isActive && "ring-2 ring-kahoot-blue-dark ring-offset-1",
			)}
			style={{
				backgroundImage: `url(/themes/${value}.webp)`,
			}}
		>
			<div className="flex-1" />
			<div
				className={`text-center font-semibold p-1 rounded-b-md ${textColor} ${textBackground}`}
			>
				{name}
			</div>
		</Button>
	);
}
