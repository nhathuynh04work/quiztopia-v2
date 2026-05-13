import { TOKEN_TYPES } from "src/config/constants/auth.constant";

export type JwtAccessTokenPayload = {
  sub: string;
  type: typeof TOKEN_TYPES.ACCESS;
};

export type JwtRefreshTokenPayload = {
  sub: string;
  jti: string;
  type: typeof TOKEN_TYPES.REFRESH;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
