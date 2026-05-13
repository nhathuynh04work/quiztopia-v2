import { Request } from "express";

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
