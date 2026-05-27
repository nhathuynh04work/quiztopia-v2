import { cookies } from "next/headers";
import { authConstants } from "@/constants/auth";
import { authConfig } from "@/config/auth.config";
import { AuthTokens } from "@/features/auth/types/auth-tokens";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

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

export function getAuthCookies(cookieStore: CookieStore): Partial<AuthTokens> {
	return {
		accessToken: cookieStore.get(authConstants.COOKIE_NAMES.ACCESS_TOKEN)
			?.value,
		refreshToken: cookieStore.get(authConstants.COOKIE_NAMES.REFRESH_TOKEN)
			?.value,
	};
}
