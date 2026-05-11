import { Request } from "express";

export type JwtPayload = {
  sub: string;
  email: string;
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
