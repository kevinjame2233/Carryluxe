/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_FONT_GOOGLE_OPTIMIZED: 'false',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
}

export default nextConfig
