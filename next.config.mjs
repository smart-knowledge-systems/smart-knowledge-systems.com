/** @type {import('next').NextConfig} */
const subdomains = ["rusted"];

const nextConfig = {
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
}

export default nextConfig;
