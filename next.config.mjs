/** @type {import('next').NextConfig} */
let nextConfig = {};

nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://api.unfulo.in/:path*',
          },
        ]
      },
  };

export default nextConfig;
