import z from "zod";
import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),

  DATABASE_URL: z.url(),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  CACHE_STORE_URL: z.url(),
  REDIS_URL: z.url().startsWith("redis://"),
});

export const env = EnvSchema.parse(process.env);
