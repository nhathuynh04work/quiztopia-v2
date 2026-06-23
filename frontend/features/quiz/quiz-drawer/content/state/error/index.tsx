"use client";

import { ApiClientError } from "@/lib/api/api-client-error";
import { Forbidden } from "./forbidden";
import { NotFound } from "./not-found";
import { GeneralError } from "./general";
import { NavActions } from "../../header/nav-actions";
import { useDrawerStore } from "@/features/quiz/quiz-drawer/hooks/use-drawer-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ReloadButton } from "@/components/ui/reload-button";

type Props = {
	error: unknown;
	retry: () => void;
};

export function Error({ error, retry }: Props) {
	const close = useDrawerStore((s) => s.close);
	const status = error instanceof ApiClientError ? error.status : null;

	const exploreLink = (
		<Link
			href="/discover"
			onClick={close}
			className={cn(
				"px-6 py-3 bg-kahoot-blue-light border-b-4 border-blue-900 text-white font-bold text-md rounded-sm transition-all text-center",
				"hover:translate-y-[2px] hover:border-b-2 hover:bg-kahoot-blue-dark",
			)}
		>
			Explore quizzes
		</Link>
	);

	const closeButton = (
		<Button
			onClick={close}
			className={cn(
				"px-6 py-3 bg-gray-100 border-b-4 border-gray-300 font-semibold text-md rounded-sm transition-all",
				"hover:translate-y-[2px] hover:border-b-2 hover:bg-gray-200",
			)}
		>
			Close
		</Button>
	);

	return (
		<div className="flex-1 flex flex-col min-h-0 bg-white">
			<header className="w-full flex justify-end px-6 py-4 border-b border-gray-200">
				<NavActions />
			</header>
			<div className="flex-1 flex flex-col min-h-0 justify-center">
				{status === 404 ? (
					<NotFound>
						{exploreLink}
						{closeButton}
					</NotFound>
				) : status === 403 ? (
					<Forbidden>
						{exploreLink}
						{closeButton}
					</Forbidden>
				) : (
					<GeneralError>
						<ReloadButton reload={retry} />
						{closeButton}
					</GeneralError>
				)}
			</div>
		</div>
	);
}
