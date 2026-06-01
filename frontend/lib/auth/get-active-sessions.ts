import "server-only";

import { authConstants } from "@/constants/auth";
import { cookies } from "next/headers";
import { apiFetch } from "../api/api-fetch";
import { redirect } from "next/navigation";
import { ApiClientError } from "../api/api-client-error";
import { Session } from "@/features/auth/types/session";
import { buildAuthHeader } from "../api/build-auth-header";

export async function getActiveSessions() {
	const sessionManagementToken = (await cookies()).get(
		authConstants.COOKIE_NAMES.SESSION_MANAGEMENT_TOKEN,
	)?.value;

	if (!sessionManagementToken) {
		redirect("/sessions/verify");
	}

	try {
		return await apiFetch<Session[]>("/sessions", {
			headers: buildAuthHeader(sessionManagementToken),
		});
	} catch (error) {
		if (error instanceof ApiClientError && error.status === 401) {
			redirect("/sessions/verify");
		}
		throw error;
	}
}
