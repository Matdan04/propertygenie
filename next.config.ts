import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "loremflickr.com" },
      { hostname: "d1u14yaqwsw479.cloudfront.net" },
      { hostname: "agents.propertygenie.com.my" },
    ],
  },
};

export default nextConfig;
