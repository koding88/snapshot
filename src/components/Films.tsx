'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

type FilmCardProps = {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
};

function FilmCard({ src, alt, title, onClick }: FilmCardProps) {
  return (
    <article 
      onClick={onClick}
      className="group relative mx-auto w-full max-w-[560px] cursor-pointer"
    >
      <div className="relative z-10">
        <div className="relative overflow-hidden" style={{ aspectRatio: '1.25' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
        </div>
        <div className="mt-5 text-center">
          <p className="font-serif text-[1rem] md:text-[1.15rem] leading-tight text-white transition-colors duration-500 px-4">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Films() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filmData = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/10/JZRY9051-768x513.jpg",
      title: "Nhung & Issac's story film",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/09/JZRY8683-768x513.jpg",
      title: "Phuong & Hugo's Story film",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/05/JZRY3169-768x513.jpg",
      title: "Rozenn & Alex's Story film",
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="films" className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1780px] px-8 py-24 md:px-14 lg:px-20 lg:py-32 xl:px-24">
        <div className="mb-24 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-serif font-normal text-white text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 5.15vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              Films
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-start gap-32 lg:grid-cols-2 lg:gap-40">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32"
          >
            <FilmCard
              src={filmData[0].src}
              alt={filmData[0].title}
              title={filmData[0].title}
              onClick={() => openLightbox(0)}
            />
            <FilmCard
              src={filmData[2].src}
              alt={filmData[2].title}
              title={filmData[2].title}
              onClick={() => openLightbox(2)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32 lg:pt-32"
          >
            <FilmCard
              src={filmData[1].src}
              alt={filmData[1].title}
              title={filmData[1].title}
              onClick={() => openLightbox(1)}
            />
          </motion.div>
        </div>
      </div>

      <GalleryLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={filmData}
        currentIndex={selectedImageIndex}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filmData.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < filmData.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
