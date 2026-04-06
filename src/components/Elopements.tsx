'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

type ElopementCardProps = {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
};

function ElopementCard({ src, alt, title, onClick }: ElopementCardProps) {
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

export default function Elopements() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const elopementDataPage1 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/12/J1073080-1-768x511.jpg",
      title: "Elopement wedding in Ninh Binh | Sandra & Olivier",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/09/JZRY8901-768x513.jpg",
      title: "Storytelling | In Dreams | H & P",
    },
    {
      src: "	https://fixteamstudio.com/wp-content/uploads/2025/05/JZRY3483-768x513.jpg",
      title: "Storytelling | In Bloom | A & R",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2024/02/J1022787-768x513.jpg",
      title: "Elopement in Northern Vietnam",
    }
  ];

  const elopementDataPage2 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/11/GTTR6134-768x512.jpg",
      title: "Elopement Wedding at Moroccan Lodge",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/09/DSCF9887-2-768x512.jpg",
      title: "Love and vows in the forest",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/07/GTTR5446-768x512.jpg",
      title: "Surprise Letter In The Tuscany, Italia",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/07/GTTR5905-768x512.jpg",
      title: "Dolomites Storytelling Wedding In Italia",
    }
  ];

  const elopementDataPage3 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/08/GTTR8593-768x512.jpg",
      title: "Storytelling Into the wind",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/08/DSCF7873-768x512.jpg",
      title: "Hanoi Rainy day love story",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/07/DSC_1308-768x511.jpg",
      title: "Elopement in Sapa | Into the Wild",
    },
    {
      src: "	https://fixteamstudio.com/wp-content/uploads/2023/07/QVAN0986-768x512.jpg",
      title: "DaLat Elopement Photographer",
    }
  ];

  const elopementDataPage4 = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/07/DSCF5141-768x512.jpg",
      title: "Elopement in Ha Giang",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/04/GTTR9075-768x512.jpg",
      title: "Storytelling | Unexpected Love Letter",
    }
  ];

  const currentData = 
    currentPage === 1 ? elopementDataPage1 : 
    currentPage === 2 ? elopementDataPage2 :
    currentPage === 3 ? elopementDataPage3 :
    elopementDataPage4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="elopements" className="relative overflow-hidden bg-black text-white">
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
              Elopements
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
                <ElopementCard
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
                <ElopementCard
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
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10"
            >
              <span className="font-serif text-lg font-bold text-white">«</span>
            </button>
          )}

          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10 ${currentPage === page ? 'border-red-500/50' : ''}`}
            >
              <span className={`font-serif text-lg font-bold ${currentPage === page ? 'text-red-500' : 'text-white'}`}>{page}</span>
            </button>
          ))}

          {currentPage < 4 && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-md border border-white/80 text-center transition-colors hover:bg-white/10"
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
