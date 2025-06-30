import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if necessary, but https is recommended
        hostname: 'images.priceoye.pk',
         // Optional: specify a port if it's not the default (80 for http, 443 for https)
        // port: '',
        // Optional: specify a pathname if you want to restrict to a specific path pattern
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;