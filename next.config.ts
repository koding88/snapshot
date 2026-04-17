import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Redirect non-locale paths to /en/... (requires at least 1 char, so / is excluded)
        source: '/:path((?!en|vi|zh|_next|api|images|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.ico$|.*\\.webp$).+)',
        destination: '/en/:path',
        permanent: false,
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
        hostname: 'snapshothanoi.com',
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
