export function buildInitWithCookie(
	cookieName: string,
	cookieValue: string,
	init?: RequestInit,
) {
	const headers = new Headers(init?.headers);
	const existingCookies = headers.get("cookie");
	const updatedCookies = addCookieToCookieHeader(
		existingCookies ?? "",
		cookieName,
		cookieValue,
	);

	headers.set("cookie", updatedCookies);

	return {
		...init,
		headers,
	};
}

function addCookieToCookieHeader(
	existingCookieHeader: string,
	cookieName: string,
	cookieValue: string,
) {
	const cookies = existingCookieHeader
		.split(";")
		.map((cookie) => cookie.trim())
		.filter(Boolean);

	return cookies
		.filter((cookie) => !cookie.startsWith(`${cookieName}=`))
		.concat(`${cookieName}=${encodeURIComponent(cookieValue)}`)
		.join("; ");
}
