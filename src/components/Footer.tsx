'use client';

import { Facebook, Globe, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  return (
    <footer className="bg-[#f5f3ef] text-[#2c2c2c]">
      {/* Main footer content */}
      <div className="mx-auto max-w-300 px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo-snapshot.svg"
                alt="Logo"
                width={160}
                height={40}
                unoptimized
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#2c2c2c]/60">
              {t('tagline')}
            </p>
          </div>

          {/* Product column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {t('servicesHeading')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}/galleries`} className="text-[#a08c7b] font-medium transition-colors hover:text-[#2c2c2c]">
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/galleries/couples`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('clientStories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {t('resourcesHeading')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}/blogs`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blogs`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('guides')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('helpCenter')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {t('companyHeading')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {t('mediaKit')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-normal text-[#2c2c2c] tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>{t('bookHeading')}</h3>
            <p className="text-sm leading-relaxed text-[#2c2c2c]/60">
              {t('bookSubtitle')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-2 inline-flex items-center gap-2 bg-[#2c2c2c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#444]"
            >
              {t('bookToday')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2c2c2c]/10">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-4 px-8 py-5 md:px-12 lg:px-16">
          {/* Left: language + links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#2c2c2c]/40">
<button type="button" className="flex items-center gap-1.5 transition-colors hover:text-[#2c2c2c] cursor-pointer">
              <Globe size={15} />
              <span>English</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-[#2c2c2c]">{t('terms')}</Link>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-[#2c2c2c]">{t('security')}</Link>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-[#2c2c2c]">{t('status')}</Link>
            <span>©{new Date().getFullYear()} {t('copyright')}</span>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-4 text-[#2c2c2c]/40">
            <Link href="#" aria-label="Facebook" className="transition-colors hover:text-[#2c2c2c]">
              <Facebook size={17} strokeWidth={1.8} />
            </Link>
            <Link href="#" aria-label="Twitter" className="transition-colors hover:text-[#2c2c2c]">
              <Twitter size={17} strokeWidth={1.8} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#2c2c2c]">
              <Linkedin size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
