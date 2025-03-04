/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed old Strapi rewrites and public runtime config
  
  // Configure allowed image domains for next/image
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
