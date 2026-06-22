"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { QuizForDrawer } from "../quiz-drawer/types/quiz-for-drawer";
import { getAccessToken } from "@/lib/auth/cookies";
import { buildAuthHeader } from "@/lib/api/build-auth-header";

export async function getQuizForDrawerAction(quizId: string) {
	const accessToken = await getAccessToken();
	const headers = accessToken ? buildAuthHeader(accessToken) : undefined;

	return apiFetch<{ quiz: QuizForDrawer }>(`/quizzes/${quizId}`, {
		headers,
	});
}
