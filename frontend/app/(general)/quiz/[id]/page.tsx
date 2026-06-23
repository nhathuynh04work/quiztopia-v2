import { Metadata } from "next";
import { getQuizForDrawerAction } from "@/features/quiz/actions/get-quiz";
import { ApiClientError } from "@/lib/api/api-client-error";
import { QuizDetailsClient } from "@/features/quiz/quiz-details/quiz-details-client";
import { NotFound } from "@/features/quiz/quiz-drawer/content/state/error/not-found";
import { Forbidden } from "@/features/quiz/quiz-drawer/content/state/error/forbidden";
import { GeneralError } from "@/features/quiz/quiz-drawer/content/state/error/general";
import { ReloadButton } from "@/components/button/reload-button";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	try {
		const { quiz } = await getQuizForDrawerAction(id);
		return {
			title: `${quiz.title} - Quiztopia`,
			description: quiz.description || "View this quiz on Quiztopia",
		};
	} catch {
		return {
			title: "Quiz - Quiztopia",
		};
	}
}

export default async function QuizDetails({ params }: Props) {
	const { id } = await params;

	try {
		const data = await getQuizForDrawerAction(id);
		return <QuizDetailsClient quiz={data.quiz} />;
	} catch (err) {
		const status = err instanceof ApiClientError ? err.status : 500;

		const exploreLink = (
			<Link
				href="/discover"
				className={cn(
					"px-6 py-3 bg-kahoot-blue-light border-b-4 border-blue-900 text-white font-bold text-md rounded-sm transition-all text-center",
					"hover:translate-y-[2px] hover:border-b-2 hover:bg-kahoot-blue-dark",
				)}
			>
				Explore quizzes
			</Link>
		);

		return (
			<div className="flex-1 flex flex-col min-h-0 justify-center items-center bg-white h-full">
				{status === 404 ? (
					<NotFound>{exploreLink}</NotFound>
				) : status === 403 ? (
					<Forbidden>{exploreLink}</Forbidden>
				) : (
					<GeneralError>
						<ReloadButton />
					</GeneralError>
				)}
			</div>
		);
	}
}
