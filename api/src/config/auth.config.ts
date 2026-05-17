import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("auth", () => {
  return {
    jwtAccessSecret: env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: env.JWT_REFRESH_SECRET,

    accessTokenExpiresMs: 1000 * 60 * 15,
    refreshTokenExpiresMs: 1000 * 60 * 60 * 24 * 30,

    bcryptRounds: 10,
  };
});
