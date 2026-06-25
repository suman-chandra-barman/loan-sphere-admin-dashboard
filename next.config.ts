import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "s8j2pdrb-8010.inc1.devtunnels.ms",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
