import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'vi', 'zh'] as const;
const defaultLocale = 'en';

function getLocaleFromAcceptLanguage(acceptLanguage: string): string {
  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes('vi')) return 'vi';
  if (normalized.includes('zh')) return 'zh';
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a valid locale prefix — pass through
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') ?? '';
  const locale = getLocaleFromAcceptLanguage(acceptLanguage);

  // Redirect to locale-prefixed path
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl, 307);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
