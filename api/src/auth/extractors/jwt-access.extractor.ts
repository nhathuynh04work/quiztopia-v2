import { Request } from "express";
import { AUTH_COOKIE_NAMES } from "@/config/constants/auth.constant";

export const accessTokenExtractor = {
  fromCookie: (req: Request) => {
    const cookies = req.cookies as Record<string, unknown>;

    if (!cookies || typeof cookies !== "object") {
      return null;
    }

    const accessToken = cookies[AUTH_COOKIE_NAMES.ACCESS_TOKEN];

    return typeof accessToken === "string" ? accessToken : null;
  },
};
