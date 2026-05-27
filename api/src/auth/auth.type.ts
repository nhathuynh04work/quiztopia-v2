import { Request } from "express";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type RefreshAuthUser = AuthUser & {
  sid: string;
  refreshToken: string;
};

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

export interface RefreshAuthenticatedRequest extends Request {
  user: RefreshAuthUser;
}
