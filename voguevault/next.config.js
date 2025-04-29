/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configure experimental features
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Add output option
  output: 'standalone',
};

module.exports = nextConfig;
