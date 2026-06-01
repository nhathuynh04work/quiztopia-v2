import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("auth", () => {
  return {
    jwtAccessSecret: env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: env.JWT_REFRESH_SECRET,
    jwtSessionManagementSecret: env.JWT_SESSION_MANAGEMENT_SECRET,

    accessTokenExpiresMs: 1000 * 60 * 5,
    refreshTokenExpiresMs: 1000 * 60 * 60 * 24 * 30,
    sessionManagementTokenExpiresMs: 1000 * 60 * 15,

    bcryptRounds: 10,

    graceWindowMs: 5000,

    maxActiveSessionCount: 5,
  };
});
