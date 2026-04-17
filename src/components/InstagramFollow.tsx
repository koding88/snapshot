'use client';

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function InstagramFollow() {
  const t = useTranslations('InstagramFollow');
  return (
    <section className="bg-black px-8 py-20 text-white md:px-14 lg:px-24 lg:py-24 xl:px-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="h-px w-full bg-white/75" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center pt-16"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-8 bg-[#f5f3ef] px-8 py-6 text-black transition-transform duration-300 hover:-translate-y-1"
          >
            <Instagram size={24} strokeWidth={1.7} />
            <span className="font-serif text-[1rem] tracking-[0.34em]">
              {t('cta')}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
