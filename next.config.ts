/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.notion.so'], // Notion 이미지 도메인 추가
  },
}

module.exports = nextConfig