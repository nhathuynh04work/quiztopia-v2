import { Button } from "@/components/ui/button";
import { THEMES } from "@/features/quiz/constants/themes";

type Props = {
	theme: (typeof THEMES)[number]["themes"][number];
};

export function ThemeItem({ theme }: Props) {
	const { textBackground, textColor, value, name } = theme;
	return (
		<Button
			className="flex flex-col w-full aspect-square rounded-md bg-cover bg-center"
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
