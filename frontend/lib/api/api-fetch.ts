  import "server-only";

  import { apiConfig } from "@/config/api.config";
  import { cookies } from "next/headers";
  import { getAuthCookies, setAuthCookies } from "../auth/cookies";
  import { AuthTokens } from "@/features/auth/types/auth-tokens";
  import { ApiClientError } from "./api-client-error";
  import { throwApiError } from "./throw-api-error";
  import { authConstants } from "@/constants/auth.constant";
  import { parseResponse } from "./parse-response";
  import { buildInitWithCookie } from "./build-init";

  export async function apiFetch<T>(
    endpoint: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, init);

    if (!response.ok) {
      await throwApiError(response);
    }

    return parseResponse<T>(response);
  }

  export async function apiFetchWithAuth<T>(
    endpoint: string,
    init?: RequestInit,
  ): Promise<T> {
    const cookieStore = await cookies();
    const tokens = getAuthCookies(cookieStore);

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw ApiClientError.unauthorized();
    }

    const response = await fetch(
      `${apiConfig.baseUrl}${endpoint}`,
      buildInitWithCookie(
        authConstants.COOKIE_NAMES.ACCESS_TOKEN,
        tokens.accessToken,
        init,
      ),
    );

    if (response.ok) {
      return parseResponse<T>(response);
    }

    if (response.status !== 401) {
      await throwApiError(response);
    }

    const rotatedTokens = await getRotatedTokens(tokens.refreshToken);
    setAuthCookies(cookieStore, rotatedTokens);

    const newResponse = await fetch(
      `${apiConfig.baseUrl}${endpoint}`,
      buildInitWithCookie(
        authConstants.COOKIE_NAMES.ACCESS_TOKEN,
        rotatedTokens.accessToken,
        init,
      ),
    );

    if (!newResponse.ok) {
      await throwApiError(newResponse);
    }

    return parseResponse<T>(newResponse);
  }

  async function getRotatedTokens(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(
      `${apiConfig.baseUrl}/auth/refresh`,
      buildInitWithCookie(
        authConstants.COOKIE_NAMES.REFRESH_TOKEN,
        refreshToken,
        { method: "POST" },
      ),
    );

    if (!response.ok) {
      await throwApiError(response);
    }

    return parseResponse<AuthTokens>(response);
  }
