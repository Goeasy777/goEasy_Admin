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

  async headers() {
    return [
      {
        source: "/api/:path*", // Apply these headers to all API routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
