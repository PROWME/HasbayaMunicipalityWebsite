/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // TEMPORARILY disable next/image optimization
    domains: ["localhost"],
  },
};

export default nextConfig;
