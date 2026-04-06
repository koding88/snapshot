'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2025/12/J1073080-1.jpg',
  },
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2025/10/JZRY9110.jpg',
  },
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2026/03/J1120631.jpg',
  },
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2026/01/J1082603.jpg',
  },
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2025/10/L1060203.jpg',
  },
  {
    image: 'https://fixteamstudio.com/wp-content/uploads/2026/03/J9833347-scaled.jpg',
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={current}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={slides[current].image}
              alt="Cinematic Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-10 text-white/60 md:left-auto md:right-12 md:translate-x-0">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="hover:text-white transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={1} />
        </button>

        <div className="text-[11px] tracking-[0.4em] font-medium uppercase min-w-[80px] text-center">
          {current + 1} of {slides.length}
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="hover:text-white transition-colors"
        >
          <ChevronRight size={16} strokeWidth={1} />
        </button>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}
