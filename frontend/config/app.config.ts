import { env } from "./env";

export const appConfig = {
	isProd: env.NODE_ENV === "production",
};
