import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  matcher: [
    '/admin/home/:path*',
    '/admin/dashboard/:path*',
    '/admin/add/:path*',
    '/admin/products/:path*',
    '/admin/edit/:path*',
  ],
};

export default nextConfig;
