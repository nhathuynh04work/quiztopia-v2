import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("cache", () => {
  return {
    storeUrl: env.CACHE_STORE_URL,
    defaultTTL: 60_000,
  };
});
