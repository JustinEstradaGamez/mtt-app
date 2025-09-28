import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Allow deploy even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Allow deploy even with lint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
