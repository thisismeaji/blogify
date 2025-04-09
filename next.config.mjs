/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
  images: {
    domains: ["dashboard.blogify.my.id"],
  },
};

export default nextConfig;
