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

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
