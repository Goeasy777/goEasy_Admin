/** @type {import('next').NextConfig} */
let nextConfig = {};

nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",

        // destination: "https://43.204.97.44/:path*",
        destination: "https://unfulo.in/:path*",
      },
    ];
  },
};

export default nextConfig;
