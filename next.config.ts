import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Apex domain (snaphanoi.com) -> www.snaphanoi.com with default locale
        source: '/:path*',
        has: [{ type: 'host', value: 'snaphanoi.com' }],
        destination: 'https://www.snaphanoi.com/vi/:path*',
        permanent: true,
      },
      {
        // Redirect non-locale paths to /vi/... (fallback for middleware bypass)
        source: '/:path((?!en|vi|zh|_next|api|images|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.ico$|.*\\.webp$).+)',
        destination: '/vi/:path',
        permanent: true,
      },
    ];
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fixteamstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'www.snaphanoi.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 's3-minio.koding88.top',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
