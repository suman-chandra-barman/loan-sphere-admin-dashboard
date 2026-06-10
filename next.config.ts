import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Django dev server
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        // Django dev server (127.0.0.1 alias)
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        // Production — replace with your real API domain
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_HOSTNAME ?? "api.mamamind.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
