/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // ensure Supabase works correctly on edge/runtime
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },

  images: {
    domains: ["pwyqfygocqmimxdufopi.supabase.co"], // your Supabase storage domain
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
