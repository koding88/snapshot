'use client';

import { Facebook, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { usePublicSiteSettings } from '@/hooks/useSiteSettings';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const locale = useLocale();
  const { data: siteSettings } = usePublicSiteSettings();
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Vietnamese' },
    { code: 'zh', label: 'Chinese' },
  ];
  const switchLocale = (code: string) => {
    const segments = window.location.pathname.split('/');
    if (["en","vi","zh"].includes(segments[1])) {
      segments[1] = code;
      window.location.assign(segments.join('/'));
    } else {
      window.location.assign(`/${code}${window.location.pathname}`);
    }
  };
  // Social links fallback
  const facebookUrl = siteSettings?.socialLinks.facebookUrl || 'https://www.facebook.com/';
  const pinterestUrl = siteSettings?.socialLinks.pinterestUrl || 'https://www.pinterest.com/Snaphanoi/';
  const instagramUrl = siteSettings?.socialLinks.instagramUrl || 'https://www.instagram.com/snaphanoi.photo/';
  const whatsappUrl = siteSettings?.socialLinks.whatsappUrl || 'https://wa.me/84944659659';
  const contactEmail = siteSettings?.contactInfo.contactEmail || 'fixteamstudio@mail.com';
  const officeAddress = siteSettings?.contactInfo.officeAddress || '59/381 Nguyen Khang, Yen Hoa, Cau Giay, Ha Noi, Viet Nam';

  return (
    <footer className="bg-[#f5f3ef] text-[#2c2c2c]">
      {/* Main footer content */}
      <div className="mx-auto max-w-300 px-8 py-16 md:px-8 lg::px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex items-center justify-center border border-gray-200  p-1 bg-white">
                <Image
                  src="/logo-snapshot.svg"
                  alt="Logo"
                  width={220}
                  height={60}
                  unoptimized
                  className="h-16 w-auto"
                />
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#2c2c2c]/60">
              {t('tagline')}
            </p>
          </div>

          {/* Home column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {tNav('home')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {tNav('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Galleries column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {tNav('galleries')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}/galleries`} className="text-[#a08c7b] font-medium transition-colors hover:text-[#2c2c2c]">
                  {tNav('galleries')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/packages`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {tNav('packages')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Blogs column */}
          <div>
            <h3 className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#2c2c2c]/40">
              {tNav('blogs')}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href={`/${locale}/blogs`} className="text-[#2c2c2c]/60 transition-colors hover:text-[#2c2c2c]">
                  {tNav('blogs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xl font-normal text-[#2c2c2c] tracking-wide" >{tNav('contact')}</h3>
            <p className="text-sm leading-relaxed text-[#2c2c2c]/60">
              {officeAddress && (<>
                {t('officeLabel')}: <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2c2c2c]">{officeAddress}</a><br/>
              </>)}
              {contactEmail && (<>
                {t('mailLabel')}: <a href={`mailto:${contactEmail}`} className="underline hover:text-[#2c2c2c]">{contactEmail}</a><br/>
              </>)}
              {whatsappUrl && (<>
                WhatsApp: <a href="https://api.whatsapp.com/send?phone=84944659659" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2c2c2c]">+84944659659</a><br/>
              </>)}
              {instagramUrl && (<>
                Instagram: <a href={instagramUrl} className="underline hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">{instagramUrl.replace('https://www.instagram.com/', '').replace(/\/$/, '')}</a><br/>
              </>)}
              {pinterestUrl && (<>
                Pinterest: <a href={pinterestUrl} className="underline hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">{pinterestUrl.replace('https://www.pinterest.com/', '').replace(/\/$/, '')}</a>
              </>)}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-2 inline-flex items-center gap-2 bg-[#2c2c2c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#444] max-w-max"
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
            <div className="relative">
              <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-[#2c2c2c] cursor-pointer">
                <Globe size={15} />
                <span>{languages.find(l => l.code === locale)?.label || 'English'}</span>
              </button>
              <div className="absolute left-0 mt-2 min-w-28 rounded bg-white shadow-lg z-10 hidden group-hover:block">
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => switchLocale(lang.code)} className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${locale === lang.code ? 'font-bold' : ''}`}>{lang.label}</button>
                ))}
              </div>
            </div>
            <Link href={`/${locale}`} className="transition-colors hover:text-[#2c2c2c]">{tNav('home')}</Link>
            <Link href={`/${locale}/about`} className="transition-colors hover:text-[#2c2c2c]">{tNav('about')}</Link>
            <Link href={`/${locale}/galleries`} className="transition-colors hover:text-[#2c2c2c]">{tNav('galleries')}</Link>
            <Link href={`/${locale}/packages`} className="transition-colors hover:text-[#2c2c2c]">{tNav('packages')}</Link>
            <Link href={`/${locale}/blogs`} className="transition-colors hover:text-[#2c2c2c]">{tNav('blogs')}</Link>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-[#2c2c2c]">{tNav('contact')}</Link>
            <span>©{new Date().getFullYear()} {t('copyright')}</span>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-4 text-[#2c2c2c]/40">
            {facebookUrl && (
              <Link href={facebookUrl} aria-label="Facebook" className="transition-colors hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">
                <Facebook size={17} strokeWidth={1.8} />
              </Link>
            )}
            {instagramUrl && (
              <Link href={instagramUrl} aria-label="Instagram" className="transition-colors hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">
                <Instagram size={17} strokeWidth={1.8} />
              </Link>
            )}
            {whatsappUrl && (
              <Link href={whatsappUrl} aria-label="WhatsApp" className="transition-colors hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 32 32" fill="currentColor"><path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.264.6 4.472 1.736 6.408l-1.832 6.696a1.6 1.6 0 0 0 1.96 1.96l6.696-1.832a12.74 12.74 0 0 0 6.24 1.624h.008c7.064 0 12.8-5.736 12.8-12.8s-5.736-12.8-12.8-12.8zm0 23.2a10.4 10.4 0 0 1-5.36-1.504l-.384-.224-5.008 1.368 1.368-5.008-.224-.384a10.4 10.4 0 1 1 9.608 5.752zm5.68-7.36c-.312-.156-1.848-.912-2.136-1.016-.288-.104-.496-.156-.704.156-.208.312-.808 1.016-.992 1.224-.184.208-.368.232-.68.08-.312-.156-1.32-.488-2.512-1.552-.928-.824-1.552-1.84-1.736-2.152-.184-.312-.02-.48.136-.632.14-.14.312-.368.468-.552.156-.184.208-.312.312-.52.104-.208.052-.392-.024-.552-.08-.156-.704-1.704-.968-2.336-.256-.616-.52-.528-.704-.536-.184-.008-.392-.008-.6-.008-.208 0-.552.08-.84.392-.288.312-1.104 1.08-1.104 2.632 0 1.552 1.128 3.048 1.288 3.256.156.208 2.224 3.4 5.392 4.632.756.324 1.344.52 1.808.664.76.24 1.456.208 2.008.128.616-.092 1.848-.752 2.112-1.48.264-.728.264-1.352.184-1.48-.08-.128-.288-.208-.6-.36z"/></svg>
              </Link>
            )}
            {pinterestUrl && (
              <Link href={pinterestUrl} aria-label="Pinterest" className="transition-colors hover:text-[#2c2c2c]" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.19-2.4.04-3.43.21-.93 1.34-5.69 1.34-5.69s-.34-.69-.34-1.7c0-1.59.92-2.79 2.08-2.79 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.56-.99 3.98-.28 1.18.59 2.15 1.76 2.15 2.11 0 3.73-2.23 3.73-5.44 0-2.84-2.04-4.83-4.96-4.83-3.38 0-5.36 2.54-5.36 5.15 0 1.02.39 2.11.89 2.71.1.12.11.23.08.35-.1.4-.31 1.25-.35 1.41-.05.21-.17.26-.4.15-1.48-.69-2.4-2.86-2.4-4.6 0-3.75 2.72-7.19 7.85-7.19 4.12 0 7.33 2.94 7.33 6.87 0 4.1-2.58 7.4-6.17 7.4-1.2 0-2.34-.63-2.73-1.37l-.74 2.82c-.27 1.03-1 2.32-1.49 3.12 1.13.35 2.33.54 3.58.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
