import { ApiErrorResponse } from "../api/api-error-response";

export class ApiClientError extends Error {
	constructor(
		public readonly status: number,
		public readonly response: ApiErrorResponse,
	) {
		super(response.error.message);
	}

	static unauthorized() {
		return new ApiClientError(401, {
			success: false,
			error: {
				code: "INVALID_CREDENTIALS",
				message: "Invalid credentials",
			},
		});
	}

	static somethingWentWrong() {
		return new ApiClientError(500, {
			success: false,
			error: {
				code: "SOMETHING_WENT_WRONG",
				message: "Something went wrong",
			},
		});
	}
}
