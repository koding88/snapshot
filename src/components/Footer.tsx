'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PinterestIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.19-2.4.04-3.43.21-.93 1.34-5.69 1.34-5.69s-.34-.69-.34-1.7c0-1.59.92-2.79 2.08-2.79 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.56-.99 3.98-.28 1.18.59 2.15 1.76 2.15 2.11 0 3.73-2.23 3.73-5.44 0-2.84-2.04-4.83-4.96-4.83-3.38 0-5.36 2.54-5.36 5.15 0 1.02.39 2.11.89 2.71.1.12.11.23.08.35-.1.4-.31 1.25-.35 1.41-.05.21-.17.26-.4.15-1.48-.69-2.4-2.86-2.4-4.6 0-3.75 2.72-7.19 7.85-7.19 4.12 0 7.33 2.94 7.33 6.87 0 4.1-2.58 7.4-6.17 7.4-1.2 0-2.34-.63-2.73-1.37l-.74 2.82c-.27 1.03-1 2.32-1.49 3.12 1.13.35 2.33.54 3.58.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#657f7f] px-8 py-20 text-white md:px-14 lg:px-24 lg:py-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1680px]"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <div className="pt-6 lg:pt-8">
            <p
              className="font-serif text-[1.05rem] italic text-white"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.08em' }}
            >
              fixteam studio
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/" className="flex flex-col items-center text-black/85 transition-transform duration-300 hover:-translate-y-1">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png"
                alt="Fixteam Studio logo"
                width={400}
                height={450}
                className="h-auto w-[220px] md:w-[320px]"
              />
            </Link>
          </div>

          <div />
        </div>

        <div className="mx-auto mt-20 h-px max-w-[1000px] bg-white/85" />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex items-center gap-8 text-white">
            <Link href="#" className="transition-opacity duration-300 hover:opacity-70">
              <Facebook size={18} strokeWidth={1.7} />
            </Link>
            <Link href="#" className="transition-opacity duration-300 hover:opacity-70">
              <PinterestIcon size={18} />
            </Link>
            <Link href="#" className="transition-opacity duration-300 hover:opacity-70">
              <Instagram size={18} strokeWidth={1.7} />
            </Link>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-10 text-[0.92rem] font-semibold uppercase tracking-[0.34em] text-white md:gap-16">
            <Link href="/" className="transition-opacity duration-300 hover:opacity-70">
              Home
            </Link>
            <Link href="/galleries" className="transition-opacity duration-300 hover:opacity-70">
              Galleries
            </Link>
            <Link href="/contact" className="transition-opacity duration-300 hover:opacity-70">
              Contact
            </Link>
          </nav>

          <div className="flex justify-start lg:justify-end">
            <button
              type="button"
              aria-label="Search"
              className="text-white transition-opacity duration-300 hover:opacity-70"
            >
              <Search size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
