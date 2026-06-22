import "server-only";

import { ApiClientError } from "@/lib/api/api-client-error";
import { apiFetch } from "@/lib/api/api-fetch";
import { buildAuthHeader } from "@/lib/api/build-auth-header";
import { getAccessToken } from "@/lib/auth/cookies";
import { QuizValidationError } from "../types/validation-error";
import { notFound, redirect } from "next/navigation";
import { QuizForEditor } from "../quiz-editor/types/quiz-for-editor";

export async function getQuizForEditor(quizId: string) {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw ApiClientError.unauthorized();
	}

	try {
		return apiFetch<{
			quiz: QuizForEditor;
			errors: QuizValidationError | null;
		}>(`/quizzes/${quizId}/edit`, {
			headers: {
				...buildAuthHeader(accessToken),
			},
		});
	} catch (error) {
		if (error instanceof ApiClientError) {
			if (error.status === 401) {
				redirect("/");
			}

			if (error.status === 403) {
				redirect("/quiz/forbidden");
			}

			if (error.status === 404) {
				notFound();
			}
		}

		throw error;
	}
}
