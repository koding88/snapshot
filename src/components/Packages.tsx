'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePublicPackages } from '@/hooks/usePackages';

export default function Packages() {
  const t = useTranslations('Packages');
  const currentLang = useLocale();
  const { data, isLoading } = usePublicPackages({ limit: 20 });
  const packages = data?.items ?? [];

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-445 px-8 py-24 md:px-14 lg:px-20 lg:py-32 xl:px-24">
          <div className="flex justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-445 px-8 py-24 md:px-14 lg:px-20 lg:py-32 xl:px-24">

        {/* Heading */}
        <div className="mb-20 flex justify-center lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-center font-serif font-normal text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 5.15vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              {t('heading')}
            </h2>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
              className="group flex flex-col overflow-hidden bg-white text-black"
            >
              {/* Cover image */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={pkg.coverImage.url}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col items-center px-6 py-8">
                <h3
                  className="mb-6 text-center font-serif text-xl font-normal tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pkg.name}
                </h3>

                {/* Best For */}
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {t('bestFor')}
                </p>
                <p className="mb-4 text-sm font-semibold">{pkg.bestFor}</p>

                {/* Duration */}
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {t('duration')}
                </p>
                <p className="mb-4 text-sm font-semibold">
                  {pkg.duration} {t('minutes')}
                </p>

                {/* Photo count */}
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {t('numberOfPhotos')}
                </p>
                <p className="mb-6 text-sm font-semibold">
                  {pkg.photoCount} {t('editedPhotos')}
                </p>

                {/* Price */}
                <p className="mb-6 text-lg font-bold">
                  ${pkg.pricing.amount} {pkg.pricing.currency}
                </p>

                {/* CTA */}
                <Link
                  href={`/${currentLang}/contact?packageId=${pkg.id}`}
                  className="mt-auto inline-block bg-[#c8b8ab] px-8 py-3 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#d6c7bb]"
                  scroll={false}
                >
                  {t('requestNow')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
