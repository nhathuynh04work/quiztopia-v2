import appConfiguration from "./app.config";
import authConfiguration from "./auth.config";
import cacheConfiguration from "./cache.config";
import databaseConfiguration from "./database.config";
import redisConfiguration from "./redis.config";

export { default as appConfiguration } from "./app.config";
export { default as authConfiguration } from "./auth.config";
export { default as cacheConfiguration } from "./cache.config";
export { default as databaseConfiguration } from "./database.config";
export { default as redisConfiguration } from "./redis.config";

export default [
  appConfiguration,
  authConfiguration,
  cacheConfiguration,
  databaseConfiguration,
  redisConfiguration,
];
