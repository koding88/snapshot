'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { COUNTRY_CODES, COUNTRY_NAME_TO_CODE } from '@/types/country-codes.constant';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePublicGalleries } from '@/hooks/useGalleries';
import { usePublicPackages } from '@/hooks/usePackages';
import { useRequestOrder } from '@/hooks/useOrders';


// Build country list with name and code for select
const countries = Object.entries(COUNTRY_NAME_TO_CODE)
  .map(([name, code]) => ({ code, name: name.replace(/\b\w/g, l => l.toUpperCase()) }))
  .sort((a, b) => a.name.localeCompare(b.name));

const howDidYouFindOptions = ['Search', 'Social media', 'Ads', 'Friends', 'Other'];


export default function ContactForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations('ContactForm');
  const [name, setName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [galleryId, setGalleryId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [howFound, setHowFound] = useState('');
  const [story, setStory] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: galleriesData } = usePublicGalleries({ limit: 50 });
  const { data: packagesData } = usePublicPackages({ limit: 50 });
  const { mutate: requestOrder, isPending } = useRequestOrder();

  const galleries = galleriesData?.items ?? [];
  const packages = packagesData?.items ?? [];

  // Auto-select package if packageId is in query params
  useEffect(() => {
    const selected = searchParams?.get('packageId');
    if (selected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPackageId(selected);
      // Scroll to form
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = `${emailPrefix}@gmail.com`;

    requestOrder(
      {
        name,
        email,
        countryCode,
        galleryId,
        packageId,
        discoverySource: howFound,
        personalStory: story || undefined,
        phoneNumber: phoneNumber || undefined,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setName('');
          setEmailPrefix('');
          setCountryCode('');
          setGalleryId('');
          setPackageId('');
          setHowFound('');
          setStory('');
        },
      },
    );
  };

  return (
    <section className="bg-black px-8 pb-24 pt-16 text-white md:px-14 lg:px-24 lg:pb-32 lg:pt-24 xl:px-32">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16"
        >
          <h1
            className="font-serif text-[2.5rem] font-normal uppercase leading-[1.1] tracking-[0.05em] text-white sm:text-[3.5rem] md:text-[4.5rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('heading')}
          </h1>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-24">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-9"
          >
            {submitted && (
              <div className="rounded-md border border-green-500/50 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {t('successMessage')}
              </div>
            )}

            {/* Name */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('nameLabel')}</label>
              <input
                type="text"
                required
                placeholder="*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            {/* Email with @gmail.com suffix */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('emailLabel')}</label>
              <div className="flex items-center overflow-hidden rounded-[4px] border border-white/45 transition-colors focus-within:border-white">
                <input
                  type="text"
                  required
                  placeholder="*"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  className="h-[62px] flex-1 bg-transparent px-4 text-[1.5rem] text-white outline-none placeholder:text-white"
                />
                <span className="shrink-0 border-l border-white/25 bg-white/10 px-4 py-4 text-[0.95rem] text-white/70">
                  @gmail.com
                </span>
              </div>
            </div>

            {/* Where are you based? - Country select */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('countryLabel')}</label>
              <div className="relative">
                <select
                  required
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code} className="bg-black">{c.name}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Categories (Gallery) */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('categoriesLabel')}</label>
              <div className="relative">
                <select
                  required
                  value={galleryId}
                  onChange={(e) => setGalleryId(e.target.value)}
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Please choose an option—</option>
                  {galleries.map((g) => (
                    <option key={g.id} value={g.id} className="bg-black">{g.name}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Price / Package */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('pricePackageLabel')}</label>
              <div className="relative">
                <select
                  required
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Select a package—</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id} className="bg-black">
                      {pkg.name} – ${pkg.pricing.amount} {pkg.pricing.currency}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="*"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            {/* How did you find Us? - Dropdown */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">{t('howFoundLabel')}</label>
              <div className="relative">
                <select
                  value={howFound}
                  onChange={(e) => setHowFound(e.target.value)}
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Please choose an option—</option>
                  {howDidYouFindOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-black">{opt}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Tell your story */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                {t('storyLabel')}
              </label>
              <textarea
                rows={5}
                placeholder="*"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="min-h-[160px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 py-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ backgroundColor: 'black', y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-md border border-white px-8 py-3 font-sans text-[0.9rem] font-bold tracking-[0.1em] text-white transition-all duration-300 disabled:opacity-50"
              >
                {isPending ? '...' : t('submitLabel')}
              </motion.button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.08, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 lg:pt-10"
          >
            <div className="flex flex-col">
              <p
                className="max-w-[520px] text-[0.95rem] leading-[1.85] text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('contactDesc')}
              </p>

              <div className="mt-14 space-y-10 text-[1.02rem] leading-[2.1] text-white">
                <div>
                  <p className="mb-2">{t('officeLabel')}</p>
                  <p>59/381 Nguyen Khang, Yen Hoa, Cau Giay, Ha Noi, Viet Nam</p>
                </div>

                <div>
                  <p className="mb-2">{t('mailLabel')}</p>
                  <p>fixteamstudio@mail.com</p>
                </div>

                <div>
                  <p className="mb-2">{t('whatsappLabel')}</p>
                  <p>+84 914901710</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
