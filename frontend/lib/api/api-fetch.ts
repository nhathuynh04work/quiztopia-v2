"use server";

import { apiConfig } from "@/config/api.config";
import { ApiClientError } from "./api-client-error";

export async function apiFetch<T>(
	endpoint: string,
	init?: RequestInit,
): Promise<T> {
	const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, init);

	if (response.ok) {
		return response.json();
	}

	const errorBody = await response.json();

	throw new ApiClientError(response.status, errorBody);
}
