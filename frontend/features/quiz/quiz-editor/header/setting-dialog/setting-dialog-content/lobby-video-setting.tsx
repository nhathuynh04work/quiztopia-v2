import { descriptionStyle, inputStyle, titleStyle } from "./styles";
import { SettingCard } from "./setting-card";
import { cn } from "@/lib/utils/cn";
import { MAX_QUIZ_TITLE_LENGTH } from "@/features/quiz/constants/constraints";

export function LobbyVideoSetting() {
  return (
    <SettingCard>
      <div className="w-full flex flex-col gap-2">
        <h3 className={titleStyle}>Lobby video</h3>
        <p className={descriptionStyle}>Add a video link to your quiz lobby.</p>
        <div className={cn(inputStyle, "flex")}>
          <input name="title" type="text" className="flex-1 outline-none" />
          <span className="text-kahoot-gray pl-2">{MAX_QUIZ_TITLE_LENGTH}</span>
        </div>
      </div>
    </SettingCard>
  );
}
