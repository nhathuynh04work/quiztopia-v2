export function buildQueryString(params: Record<string, any>) {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			searchParams.set(key, String(value));
		}
	}

	return searchParams.toString();
}
