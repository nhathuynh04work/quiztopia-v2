import Image from "next/image";
import { QuizListItem } from "../types/quiz-list-item";
import { FallbackCover } from "./fallback-cover";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { ActionDropdownMenu } from "./action-dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
	quiz: QuizListItem;
};

export function QuizCard({ quiz }: Props) {
	const router = useRouter();
	const {
		id,
		title,
		coverImage,
		user,
		questionCount,
		isDraft,
		hasUnsavedChanges,
	} = quiz;

	const handleOpen = () => {
		const path = isDraft ? `/quiz/${id}/edit` : `/quiz/${id}`;
		router.push(path);
	};

	return (
		<div className="rounded-md shadow-md bg-white hover:animate-hover-bounce">
			<header
				onClick={handleOpen}
				className="flex items-center gap-1 px-3 py-1.5 cursor-pointer"
			>
				<Image
					src="/resource-type-icons/quiz.svg"
					alt="hello"
					width={16}
					height={16}
				/>
				<span className="text-sm font-medium">Quiz</span>
			</header>

			<div
				onClick={isDraft ? handleOpen : undefined}
				className={cn("relative group", isDraft && "cursor-pointer")}
			>
				{coverImage ? (
					<img src={coverImage} className="object-cover object-center" />
				) : (
					<FallbackCover />
				)}

				<div className="absolute bottom-2 right-2 py-0.5 px-1.5 rounded-sm bg-black-soft text-white text-sm font-semibold">
					{questionCount} {questionCount > 1 ? "questions" : "question"}
				</div>

				{isDraft && (
					<div className="absolute top-2 left-2 px-1 rounded-sm bg-kahoot-red-light text-white font-bold">
						Draft
					</div>
				)}

				{hasUnsavedChanges && (
					<div className="absolute top-2 left-2 px-1 rounded-sm bg-kahoot-red-light text-white font-bold">
						Unsaved
					</div>
				)}

				{!isDraft && (
					<div
						className={cn(
							"absolute z-100 inset-0 p-4 bg-black/70",
							"flex flex-col items-center justify-center gap-2",
							"text-white font-bold",
							"invisible group-hover:visible",
						)}
					>
						<Button className="w-full bg-kahoot-blue-light hover:bg-kahoot-blue-dark border-b-3 border-b-[#0c4386] p-2 rounded-sm">
							Host live
						</Button>
						<Button className="hover:bg-white/10 rounded-sm px-4 py-2">
							Assign
						</Button>
					</div>
				)}
			</div>

			<div className="p-3 flex flex-col gap-2 cursor-pointer">
				<div className="flex">
					<p
						onClick={handleOpen}
						className="flex-1 line-clamp-2 min-h-[2lh] font-bold text-xl break-all"
					>
						{title.length > 0 ? title : "Enter quiz title..."}
					</p>
					<div>
						<ActionDropdownMenu id={id} />
					</div>
				</div>
				<p onClick={handleOpen} className="text-kahoot-gray font-semibold">
					{user.name}
				</p>
			</div>
		</div>
	);
}
