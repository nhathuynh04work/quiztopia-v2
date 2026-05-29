import "server-only";

import { ApiClientError } from "./api-client-error";

export async function parseResponse<T>(response: Response): Promise<T> {
	try {
		const text = await response.text();

		if (!text) {
			return undefined as T;
		}

		return JSON.parse(text);
	} catch (error) {
		console.error("[ResponseParsing] Error:", error);

		throw ApiClientError.somethingWentWrong();
	}
}
