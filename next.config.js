/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nextjs.org', 'www.prisma.io', 'www.apollographql.com', 'tailwindui.com', 'res.cloudinary.com', 'asistatic.azureedge.net'],
  },
};

module.exports = nextConfig;
