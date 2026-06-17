"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { Quiz } from "../types/quiz";
import { ApiClientError } from "@/lib/api/api-client-error";
import { apiFetch } from "@/lib/api/api-fetch";
import { buildAuthHeader } from "@/lib/api/build-auth-header";
import { QuizValidationError } from "../types/validation-error";

export async function upsertQuizAction(quiz: Quiz) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw ApiClientError.unauthorized();
	}

	try {
		return apiFetch<{ errors: QuizValidationError | null }>(
			`/quizzes`,
			{
				method: "POST",
				headers: buildAuthHeader(accessToken),
				body: JSON.stringify(quiz),
			},
		);
	} catch (error) {
		throw error;
	}
}
