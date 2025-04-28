const subdomains = ["rusted", "russ-fugal", "dialogue", "social"];

const nextConfig = {
  /* config options here */
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
