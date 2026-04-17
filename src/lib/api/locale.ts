import { useLocale } from 'next-intl';

export function getCurrentLocale() {
  // SSR/SSG: fallback to 'en' if not in browser
  if (typeof window === 'undefined') return 'en';
  try {
    // Use next-intl's useLocale hook if in a React component
    // Otherwise, try to read from <html lang="...">
    const htmlLang = document.documentElement.lang;
    if (htmlLang) return htmlLang.split('-')[0];
  } catch {}
  return 'en';
}
