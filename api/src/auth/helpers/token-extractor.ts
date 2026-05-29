import { ExtractJwt } from "passport-jwt";

export const extractJwtFromAuthBearer =
  ExtractJwt.fromAuthHeaderAsBearerToken();
