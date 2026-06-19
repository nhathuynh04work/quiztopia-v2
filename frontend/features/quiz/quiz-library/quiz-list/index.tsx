"use client";

import { useInfiniteQuizzes } from "../hooks/use-infinite-quizzes";
import { QuizStatusFilter } from "../../types/quiz-status";
import { useInfiniteScroll } from "@/lib/hooks/use-infinite-scroll";
import { Loading } from "./loading";
import { Empty } from "./empty";
import { Error } from "./error";
import { QuizCard } from "./quiz-card";

type Props = {
	status: QuizStatusFilter;
};

export function QuizList({ status }: Props) {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		refetch,
	} = useInfiniteQuizzes(status);

	const loadMoreRef = useInfiniteScroll(
		fetchNextPage,
		!isFetchingNextPage && hasNextPage,
	);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Error retry={refetch} />;
	}

	const quizzes = data?.pages.flatMap((page) => page.data) ?? [];

	if (quizzes.length === 0) {
		return <Empty />;
	}

	return (
		<div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(164px,1fr))] gap-4">
			{quizzes.map((quiz) => (
				<QuizCard key={quiz.id} quiz={quiz} />
			))}
		</div>
	);
}
