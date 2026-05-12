import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("database", () => {
  return {
    url: env.DATABASE_URL,
  };
});
