/** @type {import('next').NextConfig} */
const nextConfig = {};

export const config = {
    api: {
      bodyParser: false,
    },
    experimental: {
      // Disable Turbopack
      serverActions: false
    },
    webpack: (config) => {
      return config;
    },
  };
  

export default nextConfig;
