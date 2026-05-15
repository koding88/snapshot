import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site-config';

const locales = siteConfig.locales;
const defaultLocale = siteConfig.defaultLocale;

function getLocaleFromAcceptLanguage(acceptLanguage: string): string {
  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes('vi')) return 'vi';
  if (normalized.includes('zh')) return 'zh';
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Root URL always redirects to default locale (vi) with permanent redirect
  if (pathname === '/') {
    const redirectUrl = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const acceptLanguage = request.headers.get('Accept-Language') ?? '';
  const locale = getLocaleFromAcceptLanguage(acceptLanguage);

  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
