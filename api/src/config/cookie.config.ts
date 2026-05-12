import { CookieOptions } from "express";

const baseCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
};

export const accessTokenCookieConfig: CookieOptions = {
  ...baseCookieConfig,
  maxAge: 1000 * 60 * 15,
};

export const refreshTokenCookieConfig: CookieOptions = {
  ...baseCookieConfig,
  maxAge: 1000 * 60 * 60 * 24 * 30,
};
