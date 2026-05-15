'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const leftFilmMarks = [24, 62, 101, 140, 179, 218, 257, 296, 335];
const rightFilmMarks = [30, 242];

export default function CinematicStory() {
  const t = useTranslations('CinematicStory');
  return (
    <section className="relative overflow-hidden bg-transparent text-[#f2e8cf]">
      <div className="flex min-h-screen flex-col items-center px-8 pt-16 md:hidden">
        <div className="relative mt-4 aspect-[4/5] w-full max-w-[320px] bg-black p-4 shadow-2xl">
          <div className="absolute left-1 top-4 flex flex-col gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={`l-${i}`} className="h-3 w-4 border-[0.5px] border-white/30 bg-black/40" />
            ))}
          </div>
          <div className="absolute right-1 top-4 flex flex-col gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={`r-${i}`} className="h-3 w-4 border-[0.5px] border-white/30 bg-black/40" />
            ))}
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-sm">
            <Image
              src="https://fixteamstudio.com/wp-content/uploads/2023/07/1.jpg"
              alt="Cinematic Story"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>

          <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-white/20" />
          <div className="absolute top-2 right-2 text-[8px] text-white/40 uppercase tracking-tighter font-mono">▲ 12.5A</div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <div className="h-3 w-2 bg-white/20" />
            <div className="h-1.5 w-1.5 bg-white/40 rotate-45" />
          </div>
        </div>

        <div className="mt-1 pl-12 self-start">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-serif text-[2.1rem] font-bold leading-[1.25] tracking-[0.12em] text-[#f2e8cf]"
            
          >
            {t('titleLine1')}<br />
            {t('titleLine2')}<br />
            {t('titleLine3')}
          </motion.h2>
        </div>

        <div className="mt-2 max-w-[280px] self-end text-right">
          <p
            className="font-serif text-[0.7rem] italic leading-[2.4] tracking-[0.42em] text-[#ffc89a]"
          >
            {t('quote1')}<br />
            {t('quote2')}<br />
            {t('quote3')}
          </p>
        </div>

        <div className="mt-auto pb-12 w-full px-4">
          <p className="font-serif text-[0.54rem] font-semibold uppercase tracking-[0.34em] text-black text-center leading-[2.4]">
            <span className="inline-block whitespace-nowrap">Mỗi khung hình được kể bằng ánh sáng,</span><br />
            <span className="inline-block whitespace-nowrap">cảm xúc và vẻ đẹp tự nhiên của Việt Nam.</span><br />
          </p>
        </div>
      </div>

      {/* Tablet safe layout */}
      <div className="hidden md:flex xl:hidden min-h-screen flex-col items-center px-10 pt-32 pb-24">
        <div className="w-full max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-[2rem] leading-tight tracking-[0.08em] text-[#f2e8cf] sm:text-[2.5rem]"
          >
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
            <br />
            {t('titleLine3')}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-xl text-center font-serif text-sm leading-[2.2] tracking-[0.35em] text-[#ffc89a]"
        >
          {t('quote1')}<br />
          {t('quote2')}<br />
          {t('quote3')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative mt-16 w-[320px] max-w-[70vw] aspect-[0.68] overflow-hidden shadow-xl"
        >
          <Image
            src="https://fixteamstudio.com/wp-content/uploads/2023/07/1.jpg"
            alt="Cinematic Love Story"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 70vw, 320px"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 max-w-2xl text-center font-serif text-xs font-semibold leading-[2.2] tracking-[0.32em] text-black"
        >
          Every frame is shaped by light, emotion, and the natural beauty of Vietnam.
        </motion.p>
      </div>

      {/* Desktop cinematic layout */}
      <div className="hidden xl:flex mx-auto min-h-screen max-w-[1600px] items-center px-6 py-12 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <div className="grid w-full grid-cols-1 items-center gap-y-16 lg:-translate-y-28 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.72fr)] lg:items-end lg:gap-x-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[760px] lg:flex lg:min-h-[540px] lg:items-end"
          >
            <div className="ml-0 lg:ml-10 lg:w-full xl:ml-16">
              <h2
                className="font-serif text-[1.5rem] leading-[0.9] tracking-[0.08em] sm:text-[1.85rem] md:text-[2.2rem] lg:translate-x-16 lg:text-[2.55rem]"
                style={{
                  color: '#ffebdd',
                  fontStyle: 'normal',
                  fontWeight: 200,
                  textTransform: 'capitalize',
                }}
              >
                Cinematic
                <br />
                {t('titleDesktop2')}
              </h2>

              <div className="mt-10 flex justify-end lg:mt-12 lg:pr-2">
                <p className="max-w-[38rem] text-right font-serif text-[0.72rem] leading-[2.6] tracking-[0.52em] text-[#ffc89a] sm:text-[0.78rem] md:text-[0.86rem]">
                  We adore quiet,
                  <br />
                  {t('quote2')}
                  <br />
                  {t('quote3')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 42 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-[240px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:w-[280px] md:w-[300px] aspect-[0.68]">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2023/07/1.jpg"
                alt="Cinematic Love Story"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 70vw, 300px"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop caption (absolute overlay only from xl) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ delay: 0.25, duration: 1 }}
        className="hidden xl:block absolute inset-x-0 bottom-[29%] px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32"
      >
        <p className="mx-auto max-w-[1200px] text-center font-serif text-[0.72rem] font-semibold tracking-[0.42em] text-black sm:text-[0.82rem] md:text-[0.92rem]">
          Every frame is shaped by light, emotion, and the natural beauty of Vietnam.
        </p>
      </motion.div>
    </section>
  );
}
