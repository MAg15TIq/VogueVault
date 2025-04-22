/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure images
  images: {
    domains: ['*'], // Allow images from all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
