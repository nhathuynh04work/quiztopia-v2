import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Settings } from "lucide-react";
import { useState } from "react";
import { TitleDescriptionSetting } from "./title-description-setting";
import { VisibilitySetting } from "./visibility-setting";
import { CoverImageSetting } from "./cover-image-setting";
import { FolderSetting } from "./folder-setting";
import { LanguageSetting } from "./language-setting";
import { LobbyVideoSetting } from "./lobby-video-setting";
import { LobbyMusicSetting } from "./lobby-music-setting";

const tabs = [
	{
		value: "basic-info",
		name: "Basic information",
	},
	{
		value: "live-game",
		name: "Live game",
	},
] as const;

export function SettingDialogContent() {
	const [currentTab, setCurrentTab] = useState<"basic-info" | "live-game">(
		"basic-info",
	);

	return (
		<Dialog.Content className="w-11/12 h-13/14 rounded-md bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
			<VisuallyHidden asChild>
				<Dialog.Description>
					This is a dialog to set the quiz title, descriptions,... and live game
					related configurations
				</Dialog.Description>
			</VisuallyHidden>

			<header className="flex justify-between px-8 py-4 border-b border-gray-200">
				<div className="flex items-center gap-4">
					<Settings size={20} />
					<Dialog.Title className="text-xl font-bold">
						Quiz settings
					</Dialog.Title>
				</div>

				<div className="flex gap-2">
					<Dialog.Close asChild>
						<Button className="py-2 px-4 bg-gray-200 hover:bg-gray-300 font-bold text-lg rounded-sm">
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close asChild>
						<Button className="py-2 px-4 bg-kahoot-blue-light hover:bg-kahoot-blue-dark font-bold text-lg rounded-sm text-white">
							Done
						</Button>
					</Dialog.Close>
				</div>
			</header>

			<div className="flex flex-1">
				<div className="w-xs flex flex-col">
					{tabs.map((tab) => {
						const isActive = currentTab === tab.value;
						return (
							<Button
								key={tab.value}
								onClick={() => setCurrentTab(tab.value)}
								className={cn(
									"w-full text-xl font-medium p-6 border-l-4 border-l-transparent hover:bg-gray-50 text-left border-b border-b-gray-200",
									isActive && "border-l-kahoot-blue-dark bg-gray-50 font-bold",
								)}
							>
								{tab.name}
							</Button>
						);
					})}
				</div>

				<div className="flex-1 bg-gray-50 rounded-br-md border-l border-l-gray-200 p-6 grid grid-cols-5 gap-6">
					{currentTab === "basic-info" ? (
						<>
							<div className="flex flex-col gap-6 col-span-3">
								<TitleDescriptionSetting />
								<VisibilitySetting />
							</div>

							<div className="flex flex-col gap-6 col-span-2">
								<CoverImageSetting />
								<FolderSetting />
								<LanguageSetting />
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col gap-6 col-span-3">
								<LobbyVideoSetting />
								<LobbyMusicSetting />
							</div>

							<div className="flex flex-col gap-6 col-span-2"></div>
						</>
					)}
				</div>
			</div>

			<Dialog.Close />
		</Dialog.Content>
	);
}
