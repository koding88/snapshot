'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { IoCloseSharp, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { FaFacebookF, FaPinterestP } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

type ImageItem = {
  src: string;
  title: string;
};

type GalleryLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  images: ImageItem[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

function LightboxContent({
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}: Omit<GalleryLightboxProps, 'isOpen'>) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHeaderHidden(latest > 60);
  });

  const currentImage = images[currentIndex];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black overflow-y-auto scroll-smooth"
    >
      <Navbar forceVisible={true} manualHidden={headerHidden} isLightbox={true} />

      <div className="flex flex-col min-h-screen relative">
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 }
          }}
          animate="visible"
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-8 flex justify-between items-start md:mt-[70px] px-8 md:px-20 w-full"
        >
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-[0.8rem] tracking-[0.2em] uppercase hover:opacity-100 opacity-60 transition-opacity pointer-events-auto text-white"
          >
            <IoCloseSharp size={24} />
            <span>Close Gallery</span>
          </button>

          <div className="flex items-center gap-8 pointer-events-auto text-white">
            <button
              onClick={onPrev}
              className="text-[1rem] md:text-[1.1rem] tracking-[0.2em] underline uppercase font-bold hover:opacity-100 opacity-90 transition-opacity"
            >
              Prev.
            </button>
            <span className="opacity-80 font-bold text-lg">/</span>
            <button
              onClick={onNext}
              className="text-[1rem] md:text-[1.1rem] tracking-[0.2em] underline uppercase font-bold hover:opacity-100 opacity-90 transition-opacity"
            >
              Next
            </button>
          </div>
        </motion.div>

        <div className="flex-grow flex flex-col items-center justify-start pb-32 px-8 md:pt-[20px] lg:px-24">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[1.15] md:aspect-[1.5] max-w-[950px]"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="mt-20 w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between px-4 md:px-0 border-b border-white/20 pb-16 gap-10 md:gap-0 relative">
            <div className="flex flex-col gap-3 flex-1">
              <span className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-white/50">Share:</span>
              <div className="flex gap-8 text-white/70">
                <button
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => {
                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentImage.src)}`;
                    window.open(shareUrl, '_blank', 'noopener,noreferrer');
                  }}
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF size={15} />
                </button>
                <button
                  className="hover:text-white transition-colors duration-300"
                  onClick={() => {
                    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentImage.src)}&media=${encodeURIComponent(currentImage.src)}&description=${encodeURIComponent(currentImage.title)}`;
                    window.open(shareUrl, '_blank', 'noopener,noreferrer');
                  }}
                  aria-label="Share on Pinterest"
                >
                  <FaPinterestP size={15} />
                </button>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-white/20 rotate-[25deg] mx-10 hidden md:block" />

            <div className="flex-2 flex justify-center text-center px-10">
              <h3 className="font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] leading-none text-white font-normal whitespace-nowrap tracking-wide" >
                {currentImage.title}
              </h3>
            </div>

            <div className="h-12 w-[1px] bg-white/20 rotate-[25deg] mx-10 hidden md:block" />

            <div className="flex flex-col items-end gap-3 flex-1">
              <span className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-white/50">Photo</span>
              <div className="text-[0.8rem] italic font-serif tracking-[0.2em] text-white/40">
                {currentIndex + 1} of {images.length}
              </div>
            </div>
          </div>


       

          <div className="mt-24 w-full max-w-[1400px] flex flex-col gap-4 lg:gap-8 mb-20 px-4 lg:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8"
            >
              <div className="relative aspect-[3/4] md:aspect-square w-full group overflow-hidden">
                <Image src={images[(currentIndex + 1) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative aspect-[3/4] md:aspect-square w-full group overflow-hidden">
                <Image src={images[(currentIndex + 2) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8"
            >
              <div className="relative aspect-[4/3] w-full group overflow-hidden">
                <Image src={images[(currentIndex + 3) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative aspect-[4/3] w-full group overflow-hidden">
                <Image src={images[(currentIndex + 4) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative aspect-[4/3] w-full group overflow-hidden">
                <Image src={images[(currentIndex + 5) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative aspect-[16/9] md:aspect-[21/9] w-full group overflow-hidden"
            >
              <Image src={images[(currentIndex + 6) % images.length]?.src || currentImage.src} alt="Detail" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 mb-40 w-full max-w-[1400px] border-t border-white/10 pt-20 px-8 lg:px-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-0">
              <div 
                onClick={onPrev}
                className="flex flex-col items-center md:items-start text-center md:text-left group cursor-pointer"
              >
                <span className="text-[0.7rem] font-bold tracking-[0.4em] uppercase text-white/50 mb-3 block">PREV.</span>
                <span className="font-serif text-[1rem] md:text-[1.1rem] text-white/80 group-hover:text-white transition-colors duration-500" >
                  {images[(currentIndex - 1 + images.length) % images.length]?.title}
                </span>
              </div>

              <div className="flex justify-center gap-10">
                <button 
                  onClick={onPrev}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-500 group"
                >
                  <IoArrowBackOutline size={22} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onNext}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-500 group"
                >
                  <IoArrowForwardOutline size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div 
                onClick={onNext}
                className="flex flex-col items-center md:items-end text-center md:text-right group cursor-pointer"
              >
                <span className="text-[0.7rem] font-bold tracking-[0.4em] uppercase text-white/50 mb-3 block">NEXT</span>
                <span className="font-serif text-[1rem] md:text-[1.1rem] text-white/80 group-hover:text-white transition-colors duration-500" >
                  {images[(currentIndex + 1) % images.length]?.title}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-[40%] left-[10%] w-[1px] h-32 bg-white/10 rotate-[25deg] pointer-events-none hidden lg:block" />
          <div className="absolute top-[40%] right-[10%] w-[1px] h-32 bg-white/10 rotate-[-25deg] pointer-events-none hidden lg:block" />
        </div>

        <Footer />
      </div>

    </motion.div>
  );
}

export default function GalleryLightbox(props: GalleryLightboxProps) {
  const { isOpen } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!props.images || props.images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <LightboxContent
          onClose={props.onClose}
          images={props.images}
          currentIndex={props.currentIndex}
          onPrev={props.onPrev}
          onNext={props.onNext}
        />
      )}
    </AnimatePresence>
  );
}
