'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations('AboutUs');
  const locale = useLocale();
  return (
    <section className="relative min-h-screen bg-black text-white selection:bg-white/20">
      <div className="mx-auto max-w-[1780px] px-8 py-24 md:px-14 lg:px-20 lg:py-32 xl:px-24">

        <div className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.1] font-normal text-white inline-block w-fit" >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                {t('headline1')}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {t('headline2')}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pl-32 text-right"
              >
                {t('headline3')}
              </motion.div>
            </div>
          </div>

          <div className="lg:col-start-6 lg:col-span-3 pl-8 md:pl-16 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-serif tracking-[0.25em] text-[clamp(1.1rem,2.5vw,1.6rem)] uppercase font-bold text-white leading-none whitespace-nowrap"
                
              >
                {t('studioName')}
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden grayscale brightness-90">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2026/02/L1003452.jpg"
                alt="Trung and Vân - Fixteam Duo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-16 border-l border-white/20 pl-8 md:pl-16 relative mt-32">

            <div className="space-y-10 font-light text-[1.15rem] md:text-[1.25rem] leading-relaxed opacity-90 max-w-[720px] text-justify">
              {[
                "We are Trung and Vân, a duo in life and art. Our journey together began in the vibrant streets of Hanoi in 2013, leading us to say “I do” just a year later in January 2014. Since 2012, we have dedicated our lives to capturing the essence of love through weddings and elopements. Today, we call Hanoi home, where we are raised by the joy of our two daughters, Quynh Chi and Quynh Thy, while our work takes us across Vietnam, Asia, and far beyond.",
                "After a decade of exploring every corner of the photographic world, we discovered that our hearts beat fastest when telling the stories of couples. We are not interested in staged perfection; instead, we are passionate about raw, honest emotions—the quiet whispers, the unbridled laughter, and the authentic feelings that make your story unique. Our style is a fusion of cinematic atmosphere and documentary truth, captured through the timeless lens of the Leica M system.",
                "Recognized globally for our vision, we are honored to have been ranked among the elite. From being named the Best Wedding Photographer in Vietnam in 2023 to reaching the Top 20 Wedding Photographers in the World in 2025, these accolades are a testament to our commitment to the art of storytelling."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <div className="mt-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="font-serif text-[2rem] md:text-[2.5rem] mb-6 font-normal"
                
              >
                {t('awardsHeading')}
              </motion.h2>
              <ul className="space-y-3 font-light text-[0.95rem] md:text-[1.05rem] opacity-80 list-disc list-inside">
                {(t.raw('awards') as string[]).map((award, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
                    {award}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16"
            >
              <Link
                href={`/${locale}/contact`}
                className="font-serif text-[1.1rem] tracking-[0.3em] uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity"
                
              >
                {t('bookNow')}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-32 lg:mt-56 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2024/01/1.jpg"
                alt="Fixteam Story Image 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:col-span-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2025/05/3-1-scaled.jpg"
                alt="Fixteam Story Image 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.6 }}
            className="md:col-span-4"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2026/02/2025_3.jpg"
                alt="Fixteam Story Image 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mt-32 md:mt-48 mb-24 md:mb-32 text-center"
        >
          <p className="font-serif text-[clamp(0.95rem,1.5vw,1.3rem)] italic font-bold opacity-100 tracking-wider text-white px-8" >
            &ldquo;The enchantment of a story is hidden in its more subtle details&rdquo;.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
