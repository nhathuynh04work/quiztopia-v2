import "server-only";

import { SessionUser } from "@/features/auth/types/session-user";
import { ApiClientError } from "../api/api-client-error";
import { cache } from "react";
import { apiFetch } from "../api/api-fetch";
import { getAccessToken } from "./cookies";

export const getCurrentUser = cache(async () => {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		return null;
	}

	try {
		return await apiFetch<SessionUser>("/auth/me", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	} catch (error) {
		if (error instanceof ApiClientError && error.status === 401) {
			return null;
		}
		throw error;
	}
});
