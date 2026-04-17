'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const testimonialImages = [
  'https://fixteamstudio.com/wp-content/uploads/2023/09/DSCF0345-2.jpg',
  'https://fixteamstudio.com/wp-content/uploads/2019/05/DSCF6037.jpg',
  'https://fixteamstudio.com/wp-content/uploads/2019/05/DSC_0310.jpg',
  'https://fixteamstudio.com/wp-content/uploads/2023/06/ql.jpg',
];

const testimonialEmojis = ['❤️', '✨', '🌿', '🤍'];

export default function NiceWords() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations('NiceWords');

  const testimonials = (t.raw('testimonials') as Array<{ category: string; quote: string; author: string }>).map(
    (item, i) => ({ ...item, image: testimonialImages[i], color: testimonialEmojis[i] })
  );

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-black text-white px-14 pb-20 lg:pb-32">
      <div className="max-w-[1680px] ml-0 text-left">
        <div className="grid grid-cols-1 items-start lg:grid-cols-[0.5fr_0.5fr]">
          <div className="flex flex-col  pb-16  lg:pb-20 ">
            <div className="mb-8 block lg:hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 6vw, 3.2rem)',
                    fontWeight: 200,
                    lineHeight: 1.1,
                  }}
                >
                  {current.category}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="relative overflow-hidden" style={{ aspectRatio: '1.62' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={current.image}
                    alt={current.author}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 92vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-14 py-8 text-white/90">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="text-3xl transition-transform duration-300 hover:-translate-x-2 p-4 cursor-pointer"
              >
                &#8249;
              </button>
              <span className="block h-[72px] w-px bg-white/70 rotate-[-25deg]" />
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="text-3xl transition-transform duration-300 hover:translate-x-2 p-4 cursor-pointer"
              >
                &#8250;
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="hidden lg:block lg:pl-72 lg:pt-4 lg:pb-14">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  {current.category}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="relative lg:pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-white px-10 py-18 text-black shadow-[0_28px_70px_rgba(0,0,0,0.18)] sm:px-16 sm:py-22  lg:px-18 lg:py-24"
                >
                  <div
                    className="mb-10 text-center leading-none text-black/80"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '3.5rem',
                      fontWeight: 600,
                    }}
                  >
                    &ldquo;
                  </div>

                  <div className="mx-auto max-w-[580px]">
                    <p
                      className="text-center leading-[1.85] text-black/85 min-h-[140px]"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
                      }}
                    >
                      {current.quote}
                    </p>

                    <div className="mt-8 text-left text-lg opacity-80">{current.color}</div>

                    <p
                      className="mt-12 text-center font-bold uppercase tracking-[0.52em] text-black/80"
                      style={{ fontSize: '0.75rem' }}
                    >
                      - {current.author}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
