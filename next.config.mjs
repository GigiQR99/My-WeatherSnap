/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Disable persistent caching to fix PackFileCacheStrategy errors
    config.cache = false;
    return config;
  },
  webpack: (config) => {
    // Disable persistent caching to fix PackFileCacheStrategy errors
    config.cache = false;
    return config;
  },
};

export default nextConfig;
