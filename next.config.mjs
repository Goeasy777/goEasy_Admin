/** @type {import('next').NextConfig} */
let nextConfig = {};

nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3000/:path',
          },
        ]
      },
  };

export default nextConfig;
