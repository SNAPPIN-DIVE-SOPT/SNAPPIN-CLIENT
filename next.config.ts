import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      //TODO: 아래 삭제 및 추가 필요
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 't1.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 't1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'snappin-dev-images.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd2rmq8808ov4o.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd2rmq8808ov4o.cloudfront.net',
      },
      
    ],
  },
};

export default nextConfig;
