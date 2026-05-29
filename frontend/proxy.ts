import { NextRequest, NextResponse } from "next/server";
import { authConstants } from "./constants/auth";
import { apiFetch } from "./lib/api/api-fetch";
import { AuthTokens } from "./features/auth/types/auth-tokens";
import { ApiClientError } from "./lib/api/api-client-error";
import { authConfig } from "./config/auth.config";

export async function proxy(req: NextRequest) {
	const { accessToken, refreshToken } = getAuthTokens(req);

	if (!accessToken && !refreshToken) {
		return NextResponse.next();
	}

	if (accessToken) {
		return NextResponse.next();
	}

	try {
		const rotatedTokens = await apiFetch<AuthTokens>("/auth/refresh", {
			method: "POST",
			headers: { Authorization: `Bearer ${refreshToken}` },
		});

		const newHeaders = new Headers(req.headers);
		newHeaders.set("cookie", buildCookiesHeader(req, rotatedTokens));

		const res = NextResponse.next({ request: { headers: newHeaders } });
		setAuthTokens(res, rotatedTokens);
		return res;
	} catch (error) {
		if (error instanceof ApiClientError) {
			const res = NextResponse.next();
			clearAuthTokens(res);
			return res;
		}

		console.error(`[Middleware Error]: ${error}`);
		throw error;
	}
}

export const config = {
	matcher: [
		/*
		 * Match all paths EXCEPT:
		 * - _next/static (static files)
		 * - _next/image (image optimization)
		 * - favicon.ico
		 * - public folder files (png, jpg, svg, etc.)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff2?)$).*)",
	],
};

function getAuthTokens(req: NextRequest): Partial<AuthTokens> {
	return {
		accessToken: req.cookies.get(authConstants.COOKIE_NAMES.ACCESS_TOKEN)
			?.value,
		refreshToken: req.cookies.get(authConstants.COOKIE_NAMES.REFRESH_TOKEN)
			?.value,
	};
}

function setAuthTokens(res: NextResponse, tokens: AuthTokens) {
	res.cookies.set(authConstants.COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
		...authConfig.cookie,
		maxAge: authConfig.accessTokenExpiresMs / 1000,
	});
	res.cookies.set(
		authConstants.COOKIE_NAMES.REFRESH_TOKEN,
		tokens.refreshToken,
		{
			...authConfig.cookie,
			maxAge: authConfig.refreshTokenExpiresMs / 1000,
		},
	);
}

function clearAuthTokens(res: NextResponse) {
	res.cookies.delete(authConstants.COOKIE_NAMES.ACCESS_TOKEN);
	res.cookies.delete(authConstants.COOKIE_NAMES.REFRESH_TOKEN);
}

function buildCookiesHeader(req: NextRequest, authTokens: AuthTokens): string {
	const authCookieNames = authConstants.COOKIE_NAMES;

	const cookiesHeader = req.headers.get("cookie") ?? "";
	const existingCookies = cookiesHeader
		.split(";")
		.map((cookie) => cookie.trim())
		.filter(Boolean);

	const updatedCookiesHeader = existingCookies
		.filter(
			(cookie) =>
				!cookie.startsWith(`${authCookieNames.ACCESS_TOKEN}=`) &&
				!cookie.startsWith(`${authCookieNames.REFRESH_TOKEN}=`),
		)
		.concat(`${authCookieNames.ACCESS_TOKEN}=${authTokens.accessToken}`)
		.concat(`${authCookieNames.REFRESH_TOKEN}=${authTokens.refreshToken}`)
		.join("; ");

	return updatedCookiesHeader;
}
