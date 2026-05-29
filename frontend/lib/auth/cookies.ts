import "server-only";

import { authConfig } from "@/config/auth.config";
import { authConstants } from "@/constants/auth";
import { AuthTokens } from "@/features/auth/types/auth-tokens";
import { cookies } from "next/headers";

export async function getAccessToken() {
  return (await cookies()).get(authConstants.COOKIE_NAMES.ACCESS_TOKEN)?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get(authConstants.COOKIE_NAMES.REFRESH_TOKEN)?.value;
}

export async function setAuthCookies(tokens: AuthTokens) {
  const cookieStore = await cookies();

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

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  const expiredOptions = { ...authConfig.cookie, maxAge: 0 };

  cookieStore.set(authConstants.COOKIE_NAMES.ACCESS_TOKEN, "", expiredOptions);
  cookieStore.set(authConstants.COOKIE_NAMES.REFRESH_TOKEN, "", expiredOptions);
}
