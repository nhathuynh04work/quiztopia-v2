import { getQuizForGameSetup } from "@/features/quiz/queries/get-quiz";
import { ApiClientError } from "@/lib/api/api-client-error";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { LoginPromptDialog } from "@/features/game/game-setup/login-dialog";
import {
	PrivateQuizAnonDialog,
	PrivateQuizAuthDialog,
} from "@/features/game/game-setup/error-dialog/private-quiz-dialog";
import {
	QuizNotFoundAnonDialog,
	QuizNotFoundAuthDialog,
} from "@/features/game/game-setup/error-dialog/quiz-not-found-dialog";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/button";
import { Avatar } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QuizFallbackCover } from "@/components/ui/quiz-fallback-cover";
import { TopBar } from "@/features/game/game-setup/top-bar";
import { SetupDrawer } from "@/features/game/game-setup/setup-drawer";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ origin?: string }>;
};

export default async function GameSetup({ params, searchParams }: Props) {
	const { id } = await params;
	const { origin } = await searchParams;

	const user = await getCurrentUser();
	const isLoggedIn = !!user;

	try {
		const { quiz } = await getQuizForGameSetup(id);
		const bgImage = `url(/themes/${quiz.theme}.webp)`;

		return (
			<div
				className={cn(
					"bg-cover bg-center w-full h-screen flex flex-col items-center",
				)}
				style={{ backgroundImage: bgImage }}
			>
				{!isLoggedIn ? <LoginPromptDialog quizId={id} /> : <div />}
				<TopBar user={user} />
				<SetupDrawer quiz={quiz} />
			</div>
		);
	} catch (error) {
		if (!(error instanceof ApiClientError)) {
			throw error;
		}

		const status = error.status;
		const isForbidden = status === 403;
		const isNotFound = status === 404;

		if (!isForbidden && !isNotFound) {
			throw error;
		}

		if (isForbidden && isLoggedIn && origin === "not-owner") {
			redirect("/");
		}

		return (
			<div
				className={cn("bg-cover bg-center w-full h-screen")}
				style={{ backgroundImage: "url(/themes/standard.webp)" }}
			>
				{isForbidden && isLoggedIn && <PrivateQuizAuthDialog />}
				{isForbidden && !isLoggedIn && <PrivateQuizAnonDialog quizId={id} />}
				{isNotFound && isLoggedIn && <QuizNotFoundAuthDialog />}
				{isNotFound && !isLoggedIn && <QuizNotFoundAnonDialog />}
			</div>
		);
	}
}
