import type { NextConfig } from "next";
import { parseEnv } from "./config/env";

parseEnv();

const nextConfig: NextConfig = {
	/* config options here */
	logging: {
		browserToTerminal: true,
	},
};

export default nextConfig;
