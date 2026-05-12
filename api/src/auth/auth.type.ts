import { Request } from "express";

export type JwtAccessTokenPayload = {
  sub: string;
  email: string;
  type: "access";
};

export type JwtRefreshTokenPayload = {
  sub: string;
  jti: string;
  type: "refresh";
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
