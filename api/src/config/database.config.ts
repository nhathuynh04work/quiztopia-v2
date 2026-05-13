import { registerAs } from "@nestjs/config";
import { env } from "./env";
import { Prisma } from "src/generated/prisma/client";

export default registerAs("database", () => {
  const isProd = env.NODE_ENV === "production";

  return {
    url: env.DATABASE_URL,
    logLevels: isProd
      ? (["warn", "error"] satisfies Prisma.LogLevel[])
      : (["query", "info", "warn", "error"] satisfies Prisma.LogLevel[]),
  };
});
