import { apiConfig } from "@/config/api.config";
import { throwApiError } from "./throw-api-error";
import { parseResponse } from "./parse-response";

export async function apiFetch<T>(
	endpoint: string,
	init?: RequestInit,
): Promise<T> {
	const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, init);

	if (!response.ok) {
		await throwApiError(response);
	}

	return parseResponse<T>(response);
}
