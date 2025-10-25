import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '919876543210',
  },
};

export default nextConfig;
