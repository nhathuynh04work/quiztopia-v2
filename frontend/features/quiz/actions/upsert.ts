"use server";

import { getAccessToken } from "@/lib/auth/cookies";
import { Quiz } from "../types/quiz";
import { ApiClientError } from "@/lib/api/api-client-error";
import { apiFetch } from "@/lib/api/api-fetch";
import { ValidationReport } from "../types/validation-report";
import { buildAuthHeader } from "@/lib/api/build-auth-header";

export async function upsertQuizAction(quiz: Quiz) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw ApiClientError.unauthorized();
	}

	try {
		return apiFetch<{ quiz: Quiz; validation: ValidationReport }>(`/quizzes`, {
			method: "POST",
			headers: buildAuthHeader(accessToken),
			body: JSON.stringify(quiz),
		});
	} catch (error) {
		throw error;
	}
}
