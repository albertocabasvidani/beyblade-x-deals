import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/categoria/trottole', destination: '/beyblade-x-trottole', permanent: true },
      { source: '/categoria/stadium', destination: '/beyblade-x-stadium', permanent: true },
      { source: '/categoria/starter', destination: '/beyblade-x-starter', permanent: true },
      { source: '/categoria/set', destination: '/beyblade-x-set', permanent: true },
      { source: '/categoria/lanciatore', destination: '/beyblade-x-lanciatore', permanent: true },
      { source: '/categoria/random-booster', destination: '/beyblade-x-random-booster', permanent: true },
      { source: '/categoria/accessori', destination: '/beyblade-x-accessori', permanent: true },
      { source: '/categoria/booster', destination: '/beyblade-x-booster', permanent: true },
    ];
  },
};

export default nextConfig;
