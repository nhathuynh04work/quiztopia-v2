import { descriptionStyle, titleStyle } from "../setting-dialog-content/styles";
import { SettingCard } from "../setting-dialog-content/setting-card";
import { cn } from "@/lib/utils/cn";
import {
	MAX_QUIZ_DESCRIPTION_LENGTH,
	MAX_QUIZ_TITLE_LENGTH,
} from "@/features/quiz/constants/constraints";
import {
	QUIZ_VISIBILITY,
	QUIZ_VISIBILITY_CONFIG,
} from "@/features/quiz/constants/quiz-visibility";
import { QuizVisibility } from "@/features/quiz/types/quiz-visibility";

type Props = {
	visibility: QuizVisibility;
	setVisibility: (visibility: QuizVisibility) => void;
};

export function VisibilitySetting({ visibility, setVisibility }: Props) {
	return (
		<SettingCard>
			<div className="w-full flex flex-col gap-2">
				<h3 className={titleStyle}>Visibility</h3>
				<p className={descriptionStyle}>Choose who can see this quiz.</p>
				{Object.values(QUIZ_VISIBILITY).map((value) => {
					const config = QUIZ_VISIBILITY_CONFIG[value];
					const isActive = visibility === value;

					return (
						<div
							key={value}
							onClick={isActive ? undefined : () => setVisibility(value)}
							className="flex flex-col gap-2 cursor-pointer group"
						>
							<div className="flex items-center py-4 px-6 gap-6 shadow-sm rounded-md">
								<div
									className={cn(
										"size-8 rounded-full",
										isActive ? "border-8 border-kahoot-blue-dark" : "border border-black group-hover:border-kahoot-blue-dark",
									)}
								/>
								<div className="flex flex-col gap-2 text-xl font-medium text-[#6e6e6e]">
									<span>{config.title}</span>
									<p>{config.description}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</SettingCard>
	);
}
