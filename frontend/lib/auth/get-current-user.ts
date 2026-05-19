import "server-only";
import { apiFetchWithAuth } from "../api/api-fetch";
import { SessionUser } from "@/features/auth/types/session-user";
import { ApiClientError } from "../api/api-client-error";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
	try {
		return await apiFetchWithAuth<SessionUser>("/auth/me");
	} catch (error) {
		if (error instanceof ApiClientError && error.status === 401) {
			return null;
		}
		throw error;
	}
});
