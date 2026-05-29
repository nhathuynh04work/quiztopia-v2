import "server-only";

import { authConfig } from "@/config/auth.config";
import { authConstants } from "@/constants/auth";
import { AuthTokens } from "@/features/auth/types/auth-tokens";
import { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export async function getAccessToken() {
	return (await cookies()).get(authConstants.COOKIE_NAMES.ACCESS_TOKEN)?.value;
}

export function setAuthCookies(cookieStore: CookieStore, tokens: AuthTokens) {
	cookieStore.set(authConstants.COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
		...authConfig.cookie,
		maxAge: authConfig.accessTokenExpiresMs / 1000,
	});

	cookieStore.set(
		authConstants.COOKIE_NAMES.REFRESH_TOKEN,
		tokens.refreshToken,
		{
			...authConfig.cookie,
			maxAge: authConfig.refreshTokenExpiresMs / 1000,
		},
	);
}
