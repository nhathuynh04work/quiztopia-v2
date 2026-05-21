import { TOKEN_TYPES } from "src/config/constants/auth.constant";

export type JwtAccessTokenPayload = {
  uid: string;
  type: typeof TOKEN_TYPES.ACCESS;
};

export type JwtRefreshTokenPayload = {
  uid: string;
  sid: string;
  type: typeof TOKEN_TYPES.REFRESH;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
