import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.kompas.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
