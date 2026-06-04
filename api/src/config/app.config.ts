import { registerAs } from "@nestjs/config";
import { env } from "./env";

export default registerAs("app", () => {
  return {
    isProd: env.NODE_ENV === "production",
  };
});
