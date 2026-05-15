import { defineRouting } from 'next-intl/routing';
import { siteConfig } from '@/lib/site-config';

export const routing = defineRouting({
  locales: siteConfig.locales as unknown as string[],
  defaultLocale: siteConfig.defaultLocale,
  localeDetection: true,
});
