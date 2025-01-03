import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer'

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ],
      },
    ]
  },
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['text-escape.jcommon.top'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default withContentlayer(nextConfig)
