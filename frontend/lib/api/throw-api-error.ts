import { ApiClientError } from "./api-client-error";
import { parseResponse } from "./parse-response";

export async function throwApiError(response: Response): Promise<never> {
	throw new ApiClientError(response.status, await parseResponse(response));
}
