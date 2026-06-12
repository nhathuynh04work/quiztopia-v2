import { descriptionStyle, inputStyle, titleStyle } from "./styles";
import { SettingCard } from "./setting-card";
import { cn } from "@/lib/utils/cn";
import { MAX_QUIZ_TITLE_LENGTH } from "@/features/quiz/constants/constraints";

export function CoverImageSetting() {
	return (
		<SettingCard>
			<div className="w-full flex flex-col gap-2">
				<h3 className={titleStyle}>Cover image</h3>
				<p className={descriptionStyle}>
					Add a cover image to make your quiz stand out.
				</p>
				<div className={cn(inputStyle, "flex")}>
					<input name="title" type="text" className="flex-1 outline-none" />
					<span className="text-[#6e6e6e] pl-2">{MAX_QUIZ_TITLE_LENGTH}</span>
				</div>
			</div>
		</SettingCard>
	);
}
