import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "@/styles/breakpoints.scss";`,
    silenceDeprecations: ["legacy-js-api"],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
      },
    ],
  },
};

export default nextConfig;
