import z from "zod";

export const EnvSchema = z.object({
	API_URL: z.url(),
});

export function parseEnv() {
	return EnvSchema.parse(process.env);
}

export const env = parseEnv();
