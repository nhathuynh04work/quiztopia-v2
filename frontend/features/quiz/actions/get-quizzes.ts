"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { ApiClientError } from "@/lib/api/api-client-error";
import { apiFetch } from "@/lib/api/api-fetch";
import { buildAuthHeader } from "@/lib/api/build-auth-header";
import { buildQueryString } from "@/lib/api/build-query-string";
import { QuizStatusFilter } from "../types/quiz-status";
import {
	CursorPaginationQuery,
	CursorPaginatedResponse,
} from "@/lib/types/pagination";
import { QuizListItem } from "../quiz-library/types/quiz-list-item";

export type GetQuizzesQuery = CursorPaginationQuery & {
	status: QuizStatusFilter;
};

export async function getQuizzesAction(query: GetQuizzesQuery) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw ApiClientError.unauthorized();
	}

	try {
		return apiFetch<CursorPaginatedResponse<QuizListItem>>(
			`/quizzes?${buildQueryString(query)}`,
			{
				headers: {
					...buildAuthHeader(accessToken),
				},
			},
		);
	} catch (error) {
		throw error;
	}
}
