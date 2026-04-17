'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import GalleryLightbox from './GalleryLightbox';
import { useTranslations } from 'next-intl';

type PhotoCardProps = {
  src: string;
  alt: string;
  caption: string;
  grayscale?: boolean;
  onClick: () => void;
  bleedDirection?: 'left' | 'right' | 'none';
};

function PhotoCard({ src, alt, caption, grayscale = false, onClick, bleedDirection = 'none' }: PhotoCardProps) {
  const horizontalOffset = bleedDirection !== 'none' ? 'left-[-24px] right-[-24px]' : 'left-0 right-0';

  return (
    <motion.article
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      className="group relative cursor-pointer overflow-visible"
    >
      <motion.div
        className={`absolute bottom-0 z-0 h-4/5 bg-white ${horizontalOffset}`}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      <div className="relative z-10 px-8 pb-10 pt-8">
        <div className="relative overflow-hidden" style={{ aspectRatio: '1.22' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${grayscale ? 'grayscale' : ''}`}
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </div>
        <motion.p
          variants={{
            initial: { color: 'rgba(255, 255, 255, 0.9)' },
            hover: { color: '#000000' }
          }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center font-serif text-[1.1rem] font-bold leading-none tracking-wide md:text-[1.38rem]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {caption}
        </motion.p>
      </div>
    </motion.article>
  );
}

export default function FeaturedPhotography() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const t = useTranslations('FeaturedPhotography');

  const featuredPhotos = [
    { src: "https://fixteamstudio.com/wp-content/uploads/2026/03/J9833347-scaled.jpg", title: t('photo0') },
    { src: "https://fixteamstudio.com/wp-content/uploads/2026/01/J1082603.jpg", title: t('photo1') },
    { src: "https://fixteamstudio.com/wp-content/uploads/2026/03/J1120631.jpg", title: t('photo2') },
    { src: "https://fixteamstudio.com/wp-content/uploads/2025/12/J1073080-1.jpg", title: t('photo3') },
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-black text-white -mt-20 md:-mt-32 lg:-mt-48 xl:-mt-64">
      <div className="mx-auto max-w-[1780px] px-8 pt-12 pb-24 md:px-14 lg:px-20 lg:pt-28 lg:pb-32 xl:px-24">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 mb-24 relative">
          <div />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-8 lg:-ml-12 lg:gap-14 lg:min-h-[460px] relative"
          >
            <div className="hidden lg:flex items-center self-center h-full">
              <span className="block h-[640px] w-px bg-white/75 absolute top-0" />
            </div>

            <h2
              className="w-full text-center font-serif font-normal text-white lg:pl-10 lg:text-left"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.3rem, 4.15vw, 4.35rem)',
                lineHeight: 1,
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block lg:inline">{t('titleLine1')}</span>
              <br className="lg:hidden" />
              <span className="lg:ml-3">{t('titleLine2')}</span>
              <br className="lg:hidden" />
              <span className="block lg:inline lg:ml-0">
                {t('titleLine3')}
              </span>
              <br />
              <span className="block lg:mt-0 lg:inline">{t('titleLine4')}</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32 lg:-mr-6"
          >
            <PhotoCard
              src={featuredPhotos[0].src}
              alt={featuredPhotos[0].title}
              caption={featuredPhotos[0].title}
              onClick={() => openLightbox(0)}
              bleedDirection="right"
            />
            <PhotoCard
              src={featuredPhotos[1].src}
              alt={featuredPhotos[1].title}
              caption={featuredPhotos[1].title}
              onClick={() => openLightbox(1)}
              bleedDirection="right"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32 lg:pt-40 lg:-ml-6"
          >
            <PhotoCard
              src={featuredPhotos[2].src}
              alt={featuredPhotos[2].title}
              caption={featuredPhotos[2].title}
              onClick={() => openLightbox(2)}
              bleedDirection="left"
            />
            <PhotoCard
              src={featuredPhotos[3].src}
              alt={featuredPhotos[3].title}
              caption={featuredPhotos[3].title}
              onClick={() => openLightbox(3)}
              bleedDirection="left"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-32 flex justify-center"
        >
          <Link href="/galleries">
            <motion.button
              whileHover={{ backgroundColor: '#d1c1b7', y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="min-w-[240px] bg-[#c1b1a7] px-14 py-5 text-center font-serif text-[0.85rem] font-bold uppercase tracking-[0.5em] text-white transition-all duration-500 cursor-pointer"
            >
              {t('viewMore')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <GalleryLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={featuredPhotos}
        currentIndex={selectedImageIndex}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : featuredPhotos.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < featuredPhotos.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
