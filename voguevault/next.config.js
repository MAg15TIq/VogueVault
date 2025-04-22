/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for hosting on standard web servers
  output: 'standalone',
  // Configure images to work with static exports
  images: {
    unoptimized: true,
  },
  // Add your domain to the list of allowed domains
  // Replace 'yourdomain.com' with your actual domain from GoDaddy
  // This will be needed if you're using Next.js Image component
  // with external image sources
  // images: {
  //   domains: ['yourdomain.com'],
  // },
};

module.exports = nextConfig;
