import z from "zod";

export const EnvSchema = z.object({
	NODE_ENV: z.enum(["production", "development", "test"]),

	API_URL: z.url(),
});

export function parseEnv() {
	return EnvSchema.parse(process.env);
}

export const env = parseEnv();
