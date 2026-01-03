import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  allowedDevOrigins: ['http://localhost:3000', 'http://localhost:5173/wedding-templates/classic/'],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.ALLOWED_ORIGIN || 'http://localhost:5173/wedding-templates/classic/',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
