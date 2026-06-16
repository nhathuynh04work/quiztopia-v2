"use server";

import { ApiClientError } from "@/lib/api/api-client-error";
import { apiFetch } from "@/lib/api/api-fetch";
import { buildAuthHeader } from "@/lib/api/build-auth-header";
import { getAccessToken } from "@/lib/auth/cookies";
import { Quiz } from "../types/quiz";

export async function getQuizAction(quizId: string) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw ApiClientError.unauthorized();
	}

	try {
		return apiFetch<Quiz>(`/quizzes/${quizId}`, {
			headers: {
				...buildAuthHeader(accessToken),
			},
		});
	} catch (error) {
		throw error;
	}
}
