import { appConfig } from "./app.config";

export const authConfig = {
	accessTokenExpiresMs: 1000 * 60 * 15,
	refreshTokenExpiresMs: 1000 * 60 * 60 * 24 * 30,

	cookie: {
		httpOnly: true,
		secure: appConfig.isProd,
		sameSite: "lax" as const,
		path: "/",
	},
};
