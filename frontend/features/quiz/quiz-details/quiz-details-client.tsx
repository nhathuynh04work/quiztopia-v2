"use client";

import { AuthorInfo } from "@/features/quiz/quiz-drawer/content/header/author-info";
import { QuizActions } from "@/features/quiz/quiz-drawer/content/header/quiz-actions";
import { Body } from "@/features/quiz/quiz-drawer/content/body";
import { QuizForDrawer } from "@/features/quiz/quiz-drawer/types/quiz-for-drawer";

type Props = {
	quiz: QuizForDrawer;
};

export function QuizDetailsClient({ quiz }: Props) {
	return (
		<div className="h-full bg-white flex flex-col outline-none overflow-hidden relative">
			<header className="w-full grid grid-cols-3 items-center px-6 py-4 border-b border-gray-200">
				<div>
					<AuthorInfo author={quiz.user} />
				</div>

				<div className="justify-self-center">
					<QuizActions id={quiz.id} />
				</div>

				<div className="justify-self-end" />
			</header>
			<Body quiz={quiz} />
		</div>
	);
}
