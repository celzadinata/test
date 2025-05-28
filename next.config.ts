import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["asset.kompas.com", "res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
