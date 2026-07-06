import { Button } from "@/components/button";
import { QuizFallbackCover } from "@/components/ui/quiz-fallback-cover";
import { QuizForGameSetup } from "@/features/quiz/types/quiz-for-game-setup";
import { cn } from "@/lib/utils/cn";
import {
	ChevronLeft,
	ChevronRight,
	LayoutGrid,
	PartyPopper,
	Users,
} from "lucide-react";
import { GAME_MODE, GAME_MODE_CONFIG } from "../../constants/game-mode";

type Props = {
	quiz: QuizForGameSetup;
};

export function SetupDrawer({ quiz }: Props) {
	const { coverImage, title, theme } = quiz;
	const bgImage = `url(/themes/${theme}.webp)`;

	return (
		<div className="flex-1 w-9/10 rounded-t-3xl overflow-hidden flex flex-col">
			<main className="bg-[#052745ec] backdrop-blur-sm flex flex-col h-3/5">
				<div className="flex justify-end gap-2 p-4">
					<Button className="rounded-full bg-gray-900/70 p-1 text-white">
						<ChevronLeft size={20} strokeWidth={2.4} />
					</Button>
					<Button className="rounded-full bg-gray-900/70 p-1 text-white">
						<ChevronRight size={20} strokeWidth={2.4} />
					</Button>
				</div>

				<div className="flex px-10 py-12">
					<div className="w-4/9 relative">
						<div className="w-4/5 h-[95%]">
							<div
								className="w-full h-full border-2 border-gray-700 rounded-xl overflow-hidden bg-cover bg-center"
								style={{ backgroundImage: bgImage }}
							></div>

							<div className="flex justify-center items-center gap-2 mt-4">
								<div className="rounded-full size-3.5 border-2 bg-white border-white" />
								<div className="rounded-full size-3.5 border-2 border-white/40" />
								<div className="rounded-full size-3.5 border-2 border-white/40" />
							</div>
						</div>
						<div
							className="absolute right-[6%] bottom-0 w-9/50 h-[75%] border-2 border-gray-700 rounded-xl overflow-hidden bg-cover bg-center z-10"
							style={{ backgroundImage: bgImage }}
						></div>
					</div>

					<div className="flex-1 flex flex-col gap-6 text-white min-w-0">
						<h1 className="text-6xl font-bold">Classic</h1>

						<div className="flex items-center gap-4 text-lg font-semibold">
							<p className="px-3 py-1 bg-white/10 rounded-md">
								Up to 10 participants
							</p>
							<p className="px-3 py-1 bg-white/10 rounded-md">Competition</p>
							<p className="px-3 py-1 bg-white/10 rounded-md">Engagement</p>
						</div>

						<p className="text-xl font-semibold">
							Bring friendly competition to this kahoot. Participants need to
							answer quickly and correctly to secure a top spot on the podium.
						</p>

						<div className="flex flex-col gap-1">
							<span className="text-xl font-bold">Content</span>
							<div className="flex gap-4 items-stretch min-w-0">
								<div className="flex-1 p-2 bg-gray-800 rounded-md flex items-center gap-4 min-w-0">
									<div className="w-24 h-14 overflow-hidden flex items-center justify-center">
										{coverImage ? (
											<img src={coverImage} />
										) : (
											<QuizFallbackCover />
										)}
									</div>
									<p className="flex-1 text-2xl font-bold truncate">{title}</p>
								</div>

								<div className="p-2 bg-gray-800 rounded-md flex">
									<Button className="px-10 bg-white rounded-sm text-black text-xl font-bold h-full">
										Start
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<section className="flex-1 bg-[linear-gradient(rgba(5,39,69,0.7)_0%,rgb(5,39,69)_100%)] backdrop-blur-sm flex flex-col gap-4 px-8 py-4 text-white">
				<div className="flex items-center gap-2">
					<Button className="flex items-center gap-2 px-4 py-1.5 border border-transparent hover:border-gray-500 rounded-sm bg-gray-700/70">
						<LayoutGrid size={14} />
						<span className="text-lg font-bold">All</span>
					</Button>
					<Button className="flex items-center gap-2 px-4 py-1.5 border border-transparent hover:border-gray-500 rounded-sm bg-gray-700/70">
						<PartyPopper size={14} />
						<span className="text-lg font-bold">Engagement</span>
					</Button>
					<Button className="flex items-center gap-2 px-4 py-1.5 border border-transparent hover:border-gray-500 rounded-sm bg-gray-700/70">
						<Users size={14} />
						<span className="text-lg font-bold">Collaboration</span>
					</Button>
				</div>

				<p className="text-xl font-bold">Select experience</p>

				<div className="grid grid-cols-[repeat(auto-fill,10rem)] gap-6 justify-start justify-items-start">
					{Object.values(GAME_MODE).map((mode) => {
						const { key, title } = GAME_MODE_CONFIG[mode];

						return (
							<div key={key} className="flex flex-col items-center gap-2">
								<div
									className={cn(
										"w-40 aspect-5/3 bg-cover bg-center rounded-md overflow-hidden cursor-pointer",
										"outline-2 outline-offset-3 outline-transparent hover:outline-gray-500",
									)}
									style={{ backgroundImage: `url(/game-mode/${key}.webp)` }}
								/>
								<p className="font-bold">{title}</p>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}
