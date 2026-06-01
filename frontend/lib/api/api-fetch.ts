import { apiConfig } from "@/config/api.config";
import { throwApiError } from "./throw-api-error";
import { parseResponse } from "./parse-response";
import { headers } from "next/headers";

const HEADERS_TO_STRIP = new Set([
	"host",
	"connection",
	"keep-alive",
	"transfer-encoding",
	"te",
	"trailer",
	"upgrade",
	"proxy-authorization",
	"proxy-authenticate",
	"cookie",
	"authorization",
	"content-type",
	"content-length",
]);

async function getForwardedHeaders() {
	const headerStore = await headers();
	const forwarded: Record<string, string> = {};

	for (const [key, value] of headerStore) {
		if (!HEADERS_TO_STRIP.has(key)) {
			forwarded[key] = value;
		}
	}

	const clientIp =
		headerStore.get("x-forwarded-for") ?? headerStore.get("x-real-ip");

	if (clientIp) {
		forwarded["x-forwarded-for"] = clientIp;
	}

	return forwarded;
}

export async function apiFetch<T>(
	endpoint: string,
	init?: RequestInit,
): Promise<T> {
	const forwardedHeaders = await getForwardedHeaders();

	const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
		...init,
		headers: {
			...forwardedHeaders,
			...init?.headers,
		},
	});

	if (!response.ok) {
		await throwApiError(response);
	}

	return parseResponse<T>(response);
}
