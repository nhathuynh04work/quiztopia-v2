import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("redis", () => {
  return {
    url: env.REDIS_URL,
  };
});
