"use server";

import { apiFetch } from "@/lib/api/api-fetch";
import { buildAuthHeader } from "@/lib/api/build-auth-header";
import { clearAuthCookies, getRefreshToken } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    await clearAuthCookies();
    return redirect("/");
  }

  try {
    await apiFetch("/auth/logout", {
      method: "POST",
      headers: buildAuthHeader(refreshToken),
    });
  } catch (error) {
    console.error(`[Logging out] Error revoking session`, error);
  }

  await clearAuthCookies();
  redirect("/");
}
