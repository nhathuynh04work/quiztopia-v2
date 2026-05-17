export type ApiErrorPayload = {
	code: string;
	message: string;
	fieldErrors?: Record<string, string[]>;
};

export type ApiErrorResponse = {
	success: false;
	error: ApiErrorPayload;
};
