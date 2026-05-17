import type { NextConfig } from "next";
import { parseEnv } from "./config/env";

parseEnv();

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;
