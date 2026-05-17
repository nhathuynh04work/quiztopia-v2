import type { NextConfig } from "next";
import { parseEnv } from "./app/config/env";

parseEnv();

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;
