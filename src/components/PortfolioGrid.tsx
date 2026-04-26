'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PortfolioGrid() {
  const t = useTranslations('PortfolioGrid');
  return (
    <section className="relative -mt-20 overflow-visible text-white md:-mt-24 lg:-mt-36 xl:-mt-44">
      <div className="absolute inset-x-0 bottom-0 top-[24%] bg-black" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1720px] grid-cols-1 gap-14 px-8 pb-8 pt-16 md:px-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-20 lg:px-24 lg:pb-8 lg:pt-18 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-center lg:justify-start"
        >
          <div className="w-full max-w-[620px] border-[10px] border-white/95 bg-white/95 p-[10px] shadow-[0_24px_80px_rgba(255,255,255,0.08)]">
            <div className="relative aspect-[0.78] overflow-hidden bg-[#2f2f2f]">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2024/02/1-2.jpg"
                alt="The ones behind the camera"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 92vw, 620px"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-full flex-col lg:pt-12"
        >
          <div className="ml-auto w-full max-w-[850px]">
            <h2 className="text-center font-serif text-[2.80rem] font-normal uppercase leading-[1.15] tracking-[-0.02em] text-white sm:text-[3.6rem] md:text-[4rem] lg:text-left lg:text-[4.9rem] lg:leading-[1.02] lg:tracking-[-0.03em] xl:text-[5.4rem]">
              <span className="lg:hidden">
                {t('titleMobile1')}
                <br />
                {t('titleMobile2')}
                <br />
                {t('titleMobile3')}
              </span>
              <span className="hidden lg:block">
                {t('titleDesktop1')}
                <br />
                {t('titleDesktop2')}
              </span>
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-[52px_minmax(0,1fr)] lg:gap-8">
              <div className="hidden lg:block">
                <span className="mt-1 block h-[600px] w-px bg-white/85" />
              </div>

              <div className="max-w-[720px] lg:-ml-1">
                <p className="font-sans text-[1.05rem] leading-[1.7] text-white/88 italic sm:text-[1.15rem] md:text-[1.28rem]">
                  {t('intro')}
                </p>

                <p className="mt-16 font-serif text-[1.02rem] leading-[1.85] font-semibold text-white sm:text-[1.12rem] md:text-[1.22rem]">
                  {t('body')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:-ml-14 lg:-mt-20 lg:justify-start">
            <Link href="/about">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                className="min-w-[320px] bg-[#c8b8ab] px-14 py-5 text-center font-serif text-[0.95rem] uppercase tracking-[0.34em] text-white shadow-xl transition-colors duration-300 hover:bg-[#d6c7bb] cursor-pointer"
              >
                {t('readMore')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
