import { Request } from "express";
import { AUTH_COOKIE_NAMES } from "src/config/constants/auth.constant";

export const refreshTokenExtractor = {
  fromCookie: (req: Request) => {
    const cookies = req.cookies as Record<string, unknown>;

    if (!cookies || typeof cookies !== "object") {
      return null;
    }

    const refreshToken = cookies[AUTH_COOKIE_NAMES.REFRESH_TOKEN];

    return typeof refreshToken === "string" ? refreshToken : null;
  },
};
