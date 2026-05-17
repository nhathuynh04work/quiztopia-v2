import { ApiErrorResponse } from "../types/api/api-error-response";

export class ApiClientError extends Error {
	constructor(
		public readonly status: number,
		public readonly response: ApiErrorResponse,
	) {
		super(response.error.message);
	}
}
