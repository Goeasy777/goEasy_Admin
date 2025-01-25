/** @type {import('next').NextConfig} */
let nextConfig = {};

nextConfig = {

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://43.240.97.44/:path*",

        // destination: "https://api.unfulo.in/:path*",

      }
    ];
  },
 
};

export default nextConfig;
