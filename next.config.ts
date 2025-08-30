import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname), // энэ фолдерийг root болгож заана
};

export default nextConfig;
