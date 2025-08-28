/** @type {import('next').NextConfig} */
const nextConfig = {
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