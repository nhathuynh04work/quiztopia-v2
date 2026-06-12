import { THEMES } from "@/features/quiz/constants/themes";
import { ThemeGroup } from "./theme-group";

export function ThemeSetting() {
	return (
		<div className="flex flex-col gap-2 py-4">
			{THEMES.map((group) => (
				<ThemeGroup key={group.key} group={group} />
			))}
		</div>
	);
}
