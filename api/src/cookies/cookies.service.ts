import authConfiguration from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import type { Response } from "express";
import { AUTH_COOKIE_NAMES } from "src/config/constants/auth.constant";
import { AuthTokens } from "src/tokens/tokens.type";

@Injectable()
export class CookiesService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {}

  setAuthCookies(res: Response, tokens: AuthTokens) {
    res.cookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
      ...this.authConfig.cookie,
      maxAge: this.authConfig.accessTokenExpiresMs,
    });

    res.cookie(AUTH_COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
      ...this.authConfig.cookie,
      maxAge: this.authConfig.refreshTokenExpiresMs,
    });
  }
}
