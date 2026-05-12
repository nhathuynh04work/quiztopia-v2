import { Request } from "express";
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

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type RefreshAuthUser = AuthUser & { jti: string };

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

export interface RefreshAuthenticatedRequest extends Request {
  user: RefreshAuthUser;
}
