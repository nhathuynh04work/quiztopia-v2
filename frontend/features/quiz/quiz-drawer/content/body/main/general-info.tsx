import { QuizFallbackCover } from "@/components/ui/quiz-fallback-cover";
import { Grid2X2, Play, User } from "lucide-react";
import { QuizForDrawer } from "../../../types/quiz-for-drawer";

type Props = {
	quiz: QuizForDrawer;
};

export function GeneralInfo({ quiz }: Props) {
	const { title, description } = quiz;

	return (
		<div className="flex items-start gap-20">
			<div className="w-9/40 rounded-lg overflow-hidden shrink-0">
				<QuizFallbackCover />
			</div>

			<div className="flex flex-col">
				<div className="flex items-center gap-2">
					<Grid2X2 size={16} className="stroke-kahoot-gray stroke-2" />
					<span className="text-kahoot-gray text-lg font-medium">Quiz</span>
				</div>

				<h3 className="text-3xl font-bold break-all mt-2 mb-4 leading-normal">
					{title}
				</h3>

				<p className="mb-6 text-lg text-black-soft font-medium">
					{description}
				</p>

				<div className="flex items-center gap-8">
					<div className="flex items-center gap-2">
						<Play className="fill-kahoot-gray stroke-kahoot-gray" size={14} />
						<span className="text-lg font-semibold text-kahoot-gray">
							<span className="font-extrabold">0</span> plays
						</span>
					</div>
					<div className="flex items-center gap-2">
						<User className="fill-kahoot-gray stroke-kahoot-gray" size={18} />
						<span className="text-lg font-semibold text-kahoot-gray">
							<span className="font-extrabold">0</span> participants
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
