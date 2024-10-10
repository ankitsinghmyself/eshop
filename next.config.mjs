/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // External domain
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
