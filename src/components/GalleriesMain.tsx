'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';
import { useTranslations } from 'next-intl';

type GalleryCardProps = {
  src: string;
  alt: string;
  title: string;
  index: number;
  onClick: () => void;
  isLarge?: boolean;
};

function GalleryCard({ src, alt, title, index, onClick, isLarge = false }: GalleryCardProps) {
  const offsets = [
    "lg:mt-0",
    "lg:mt-40",
    "lg:mt-0",
    "lg:mt-40"
  ];

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group relative flex flex-col gap-6 cursor-pointer ${offsets[index % 4]}`}
    >
      <div className="relative overflow-hidden aspect-[1.15] md:aspect-[1.3]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          sizes="(max-width: 1024px) 90vw, 45vw"
        />
      </div>
      <div className="text-center transition-colors duration-500">
        <h3 className="font-serif text-[1rem] md:text-[1.25rem] leading-tight text-white tracking-wide">
          {title}
        </h3>
      </div>
    </motion.article>
  );
}

export default function GalleriesMain() {
  const t = useTranslations('GalleriesMain');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryStories = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2026/03/J9833347-scaled.jpg",
      title: "Huy & Diane | Love in Hanoi",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2026/03/J1120631.jpg",
      title: "Intimate wedding | Thái & Linh",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2026/01/J1082603.jpg",
      title: "Silky & Ron | Love in Hanoi",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/12/J1073080-1.jpg",
      title: "Elopement wedding in Ninh Binh | Sandra & Olivier",
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="relative min-h-screen bg-black text-white px-8 py-24 md:px-14 lg:px-24">
      <div className="mx-auto max-w-[1780px]">
        
        <div className="flex flex-col items-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-[0.05em] uppercase mb-4"
            
          >
            {t('heading')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-sans text-[0.75rem] md:text-[0.85rem] tracking-[0.4em] uppercase opacity-80"
          >
            {t('keepOnLovin')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-0">
          {galleryStories.map((story, index) => (
            <GalleryCard
              key={story.title}
              index={index}
              src={story.src}
              alt={story.title}
              title={story.title}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      <GalleryLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryStories}
        currentIndex={selectedImageIndex}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryStories.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < galleryStories.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
