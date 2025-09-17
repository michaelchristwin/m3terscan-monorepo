import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dune/:path*",
        destination: "https://api.dune.com/:path*", // external API
      },
    ];
  },
};

export default nextConfig;
