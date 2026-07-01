import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion", "@react-three/drei"]
  }
};

export default nextConfig;
