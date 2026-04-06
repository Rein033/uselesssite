/** @type {import('next').NextConfig} */
const isDemo = process.env.USE_DEMO_DATA === 'true'

const nextConfig = {
  ...(isDemo && {
    output: 'export',
    basePath: '',
    trailingSlash: true,
  }),
  images: {
    unoptimized: isDemo,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
}

module.exports = nextConfig
