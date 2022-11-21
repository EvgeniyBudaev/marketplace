/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "localhost:8000",
      "8000",
      "127.0.0.1",
      "backend",
      "backend:80",
      "backend:8000",
      "62.84.119.86",
      "62.84.119.86:80",
      "62.84.119.86:8000",
      "mirror-look-shop.ru",
      "www.mirror-look-shop.ru",
      "62.84.119.86",
      "62.84.119.86:80",
      "62.84.119.86:8000",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
