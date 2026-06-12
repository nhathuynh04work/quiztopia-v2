import { descriptionStyle, inputStyle, titleStyle } from "./styles";
import { SettingCard } from "./setting-card";
import { cn } from "@/lib/utils/cn";
import {
	MAX_QUIZ_DESCRIPTION_LENGTH,
	MAX_QUIZ_TITLE_LENGTH,
} from "@/features/quiz/constants/constraints";

export function TitleDescriptionSetting() {
	return (
		<SettingCard>
			<div className="w-full flex flex-col gap-6">
				<div className="w-full flex flex-col gap-2">
					<h3 className={titleStyle}>Title</h3>
					<p className={descriptionStyle}>Enter a title for your quiz.</p>
					<div className={cn(inputStyle, "flex")}>
						<input name="title" type="text" className="flex-1 outline-none" />
						<span className="text-[#6e6e6e] pl-2">{MAX_QUIZ_TITLE_LENGTH}</span>
					</div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<h3 className={titleStyle}>
						Description{" "}
						<span className="text-[#6e6e6e] font-medium">(Optional)</span>
					</h3>
					<p className={descriptionStyle}>
						Provide a short description for your quiz to increase visibility.
					</p>
					<div className={cn(inputStyle, "flex")}>
						<textarea
							name="description"
							rows={4}
							className="flex-1 outline-none resize-none"
						/>
						<span className="text-[#6e6e6e] pl-2">
							{MAX_QUIZ_DESCRIPTION_LENGTH}
						</span>
					</div>
				</div>
			</div>
		</SettingCard>
	);
}
