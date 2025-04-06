import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Be more specific in production
      },
    ],
    unoptimized: true, // Add this for external images
  },
};

export default nextConfig;
