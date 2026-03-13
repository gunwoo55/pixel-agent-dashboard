// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '.',
};

module.exports = nextConfig;
