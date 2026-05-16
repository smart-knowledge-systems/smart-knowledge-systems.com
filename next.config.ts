const subdomains = ["rusted", "russ-fugal", "dialogue", "social"];

const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sara.ai",
      },
      {
        protocol: "https",
        hostname: "auriporia.us-west.host.bsky.network",
      },
      {
        protocol: "https",
        hostname: "*.bsky.network",
      },
    ],
  },
  async redirects() {
    return [
      ...subdomains.map((subdomain) => ({
        source: "/:path*",
        has: [
          {
            type: "host",
            value: `${subdomain}.smart-knowledge-systems.com`,
          },
        ],
        destination: `https://smart-knowledge-systems.com/${subdomain}/:path*`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
