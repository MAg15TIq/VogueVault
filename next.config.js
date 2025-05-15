/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Ensure output is properly configured for Vercel deployment
  output: 'standalone',
  // Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
  // Add trailing slash to URLs
  trailingSlash: true,
};

module.exports = nextConfig;
