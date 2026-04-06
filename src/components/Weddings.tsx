'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

type WeddingCardProps = {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
};

function WeddingCard({ src, alt, title, onClick }: WeddingCardProps) {
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

export default function Weddings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const weddingDataPage1 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2026/03/J1120631.jpg",
      title: "Intimate wedding | Thái & Linh",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/10/DSC_8157-768x512.jpg",
      title: "Intimate wedding | Issac & Nhung",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2024/12/T1070159-768x512.jpg",
      title: "Romatic wedding in the forest | Long & Vân",
    },
    {
      src: "	https://fixteamstudio.com/wp-content/uploads/2024/11/L1010668-768x512.jpg",
      title: "Indian Wedding | A&R | Festival of Colors",
    }
  ];

  const weddingDataPage2 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2024/01/J1021730-1.jpg",
      title: "Grand Mercure Hanoi destination wedding | Phát & Trang",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/08/GTTR0170-768x512.jpg",
      title: "Intimate wedding in the Forest | A&N",
    }
  ];

  const currentData = currentPage === 1 ? weddingDataPage1 : weddingDataPage2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="weddings" className="relative overflow-hidden bg-black text-white">
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
              Weddings
            </h2>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 items-start gap-32 lg:grid-cols-2 lg:gap-40"
          >
            <div className="flex flex-col gap-32">
              {currentData.filter((_, i) => i % 2 === 0).map((item) => (
                <WeddingCard
                  key={item.title}
                  src={item.src}
                  alt={item.title}
                  title={item.title}
                  onClick={() => openLightbox(currentData.indexOf(item))}
                />
              ))}
            </div>

            <div className="flex flex-col gap-32 lg:pt-32">
              {currentData.filter((_, i) => i % 2 !== 0).map((item) => (
                <WeddingCard
                  key={item.title}
                  src={item.src}
                  alt={item.title}
                  title={item.title}
                  onClick={() => openLightbox(currentData.indexOf(item))}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-20 flex justify-center items-center gap-3 pb-12">
          {currentPage === 2 && (
            <button
              onClick={() => handlePageChange(1)}
              className="flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10"
              aria-label="Previous Page"
            >
              <span className="font-serif text-lg font-bold text-white">«</span>
            </button>
          )}

          <button
            onClick={() => handlePageChange(1)}
            className={`flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10 ${currentPage === 1 ? 'border-red-500/50' : ''}`}
          >
            <span className={`font-serif text-lg font-bold ${currentPage === 1 ? 'text-red-500' : 'text-white'}`}>1</span>
          </button>

          <button
            onClick={() => handlePageChange(2)}
            className={`flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10 ${currentPage === 2 ? 'border-red-500/50' : ''}`}
          >
            <span className={`font-serif text-lg font-bold ${currentPage === 2 ? 'text-red-500' : 'text-white'}`}>2</span>
          </button>

          {currentPage === 1 && (
            <button
              onClick={() => handlePageChange(2)}
              className="flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10"
              aria-label="Next Page"
            >
              <span className="font-serif text-lg font-bold text-white">»</span>
            </button>
          )}
        </div>
      </div>

      <GalleryLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={currentData}
        currentIndex={selectedImageIndex}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : currentData.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < currentData.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
