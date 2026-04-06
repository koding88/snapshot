'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Search,
  X,
  LayoutGrid,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.19-2.4.04-3.43.21-.93 1.34-5.69 1.34-5.69s-.34-.69-.34-1.7c0-1.59.92-2.79 2.08-2.79 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.56-.99 3.98-.28 1.18.59 2.15 1.76 2.15 2.11 0 3.73-2.23 3.73-5.44 0-2.84-2.04-4.83-4.96-4.83-3.38 0-5.36 2.54-5.36 5.15 0 1.02.39 2.11.89 2.71.1.12.11.23.08.35-.1.4-.31 1.25-.35 1.41-.05.21-.17.26-.4.15-1.48-.69-2.4-2.86-2.4-4.6 0-3.75 2.72-7.19 7.85-7.19 4.12 0 7.33 2.94 7.33 6.87 0 4.1-2.58 7.4-6.17 7.4-1.2 0-2.34-.63-2.73-1.37l-.74 2.82c-.27 1.03-1 2.32-1.49 3.12 1.13.35 2.33.54 3.58.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
  </svg>
);

const MenuIcon = ({ size = 24, strokeWidth = 1.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Navbar({
  forceVisible = false,
  manualHidden = false,
  isLightbox = false,
}: {
  forceVisible?: boolean;
  manualHidden?: boolean;
  isLightbox?: boolean;
}) {
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleriesOpen, setIsGalleriesOpen] = useState(false);
  const [isGalleriesHovered, setIsGalleriesHovered] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();

  const isEditorial = pathname === '/' || pathname === '/contact';
  const textColor = isEditorial ? 'text-white' : 'text-black';
  const bgColor = isEditorial ? 'bg-transparent' : 'bg-white shadow-sm';
  const navHeight =
    isEditorial && pathname === '/' && !isLightbox
      ? 'h-[450px] md:h-[650px]'
      : 'h-[135px] md:h-[480px]';
  const topPadding = 'pt-0 md:pt-40';
  const navLinksTop =
    isEditorial && pathname === '/' && !isLightbox
      ? 'top-[150px] md:top-[320px]'
      : 'top-[240px] md:top-[360px]';
  const navPosition =
    (isEditorial && pathname !== '/' && !pathname.startsWith('/galleries')) ? 'absolute' : 'fixed';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHidden(latest > 50);
  });

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Galleries', href: '/galleries' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const galleryLinks = [
    { name: 'Weddings', href: '/galleries/weddings' },
    { name: 'Elopements - PreWedding', href: '/galleries/elopements' },
    { name: 'Couples - Families', href: '/galleries/couples' },
    { name: 'Films', href: '/galleries/films' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { opacity: 1, pointerEvents: 'auto' },
          hidden: { opacity: 0, pointerEvents: 'none' },
        }}
        initial="visible"
        animate={
          ((manualHidden || (hidden && !forceVisible)) && navPosition === 'fixed' && !isMenuOpen)
            ? 'hidden'
            : 'visible'
        }
        transition={{ duration: 0.2, ease: 'linear' }}
        className={`${navPosition} inset-x-0 top-0 z-[100] transition-all duration-200 ${bgColor} ${navHeight}`}
      >
        <div className="flex w-full max-w-full items-start justify-between px-6 pt-6 md:hidden">
          <div className="mt-7 flex w-[70px] flex-col items-center justify-center">
            <div className={`mb-3 h-[1px] w-full ${isEditorial ? 'bg-white' : 'bg-black'} opacity-60`} />
            <button aria-label="Search" className={textColor}>
              <Search size={22} strokeWidth={1.2} />
            </button>
            <div className={`mt-3 h-[1px] w-full ${isEditorial ? 'bg-white' : 'bg-black'} opacity-60`} />
          </div>

          <Link href="/" className="flex flex-1 justify-center">
            <Image
              src="https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className={`h-auto w-44 ${!isEditorial ? 'invert' : ''}`}
              priority
            />
          </Link>

          <div className="mt-7 flex w-[70px] flex-col items-center justify-center">
            <div className={`mb-3 h-[1px] w-full ${isEditorial ? 'bg-white' : 'bg-black'} opacity-60`} />
            <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className={textColor}>
              <MenuIcon size={24} strokeWidth={1.2} />
            </button>
            <div className={`mt-3 h-[1px] w-full ${isEditorial ? 'bg-white' : 'bg-black'} opacity-60`} />
          </div>
        </div>

        <div className={`absolute inset-x-0 top-0 hidden items-start justify-between px-12 md:flex md:px-32 ${topPadding}`}>
          <div className={`ml-12 flex items-center gap-8 transition-all md:ml-24 ${textColor}`}>
            <Link href="#" className="transition-all hover:text-accent">
              <Facebook size={18} strokeWidth={1} />
            </Link>
            <Link href="#" className="transition-all hover:text-accent">
              <PinterestIcon size={18} />
            </Link>
            <Link href="#" className="transition-all hover:text-accent">
              <Instagram size={18} strokeWidth={1} />
            </Link>
          </div>

          <div className="absolute left-1/2 top-10 flex -translate-x-1/2 flex-col items-center transition-all duration-300 md:top-14">
            <Link href="/" className="group flex flex-col items-center">
              <Image
                src="https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png"
                alt="Logo"
                width={500}
                height={500}
                className={`h-32 w-auto transition-all md:h-[240px] ${!isEditorial ? 'invert' : ''}`}
                priority
              />
            </Link>
          </div>

          <div className={`mr-8 flex items-center transition-opacity md:mr-16 ${textColor}`}>
            <button className="transition-all hover:text-accent" aria-label="Search">
              <Search size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className={`absolute inset-x-0 hidden w-full justify-center transition-all duration-500 md:flex ${navLinksTop}`}>
          <div className={`flex flex-wrap items-center justify-center gap-12 text-[12px] font-bold uppercase tracking-[0.6em] md:gap-14 md:text-[15px] ${textColor}`}>
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative py-2"
                onMouseEnter={() => item.name === 'Galleries' && setIsGalleriesHovered(true)}
                onMouseLeave={() => item.name === 'Galleries' && setIsGalleriesHovered(false)}
              >
                <Link
                  href={item.href}
                  className={`border-b-2 pb-1.5 transition-all hover:text-accent ${item.name === 'Galleries' && isGalleriesHovered ? 'border-accent' : 'border-transparent'
                    }`}
                >
                  {item.name}
                </Link>

                {item.name === 'Galleries' && (
                  <AnimatePresence>
                    {isGalleriesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full mt-4 w-[360px] -translate-x-1/2 bg-[#bcab9b] p-10 shadow-[0_32px_80px_rgba(0,0,0,0.12)]"
                      >
                        <div className="flex flex-col items-center gap-8 py-4">
                          {galleryLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className="font-serif text-[0.88rem] font-bold uppercase tracking-[0.38em] text-white whitespace-nowrap transition-opacity hover:opacity-75"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#6e8787] text-black"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-6">
              <div className="flex items-start justify-between">
                <div className="mt-7 flex w-[70px] flex-col items-center justify-center">
                  <div className="mb-3 h-[1px] w-full bg-black/70" />
                  <button aria-label="Search" className="text-black">
                    <Search size={22} strokeWidth={1} />
                  </button>
                  <div className="mt-3 h-[1px] w-full bg-black/70" />
                </div>

                <Link href="/" className="flex flex-1 justify-center" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png"
                    alt="Logo"
                    width={200}
                    height={200}
                    className="h-auto w-44 invert"
                    priority
                  />
                </Link>

                <div className="mt-7 flex w-[70px] flex-col items-center justify-center">
                  <div className="mb-3 h-[1px] w-full bg-black/70" />
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-black">
                    <X size={24} strokeWidth={1.3} />
                  </button>
                  <div className="mt-3 h-[1px] w-full bg-black/70" />
                </div>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden px-8 pt-12">
                <div className="flex w-full gap-6">
                  <motion.span
                    animate={{ height: isGalleriesOpen ? 420 : 210 }}
                    className="mt-1 block w-px bg-black/70"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="flex flex-1 flex-col gap-8 pb-12">
                    {menuItems.map((item, idx) => {
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * idx + 0.2 }}
                          className="flex flex-col"
                        >
                          <div className="flex items-center justify-between">
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="font-serif text-[0.82rem] font-semibold tracking-[0.2em] text-black transition-opacity hover:opacity-70"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {item.name}
                            </Link>

                            {item.name === 'Galleries' && (
                              <button
                                type="button"
                                aria-label="Toggle galleries"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsGalleriesOpen((prev) => !prev);
                                }}
                                className="pr-2 text-black/80 transition-opacity hover:text-black"
                              >
                                {isGalleriesOpen ? <X size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                              </button>
                            )}
                          </div>

                          <AnimatePresence>
                            {item.name === 'Galleries' && isGalleriesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-6 pl-5 pt-7">
                                  {galleryLinks.map((subLink) => (
                                    <Link
                                      key={subLink.name}
                                      href={subLink.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="font-serif text-[0.7rem] font-medium tracking-[0.22em] text-black/65 transition-colors hover:text-black"
                                      style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mx-2 mt-auto border-t border-black/60 pt-8 pb-4">
                <div className="flex items-center justify-between px-2 text-black">
                  <button
                    type="button"
                    aria-label="Previous"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/60 transition-opacity hover:opacity-70"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </button>

                  <div className="flex items-center gap-12">
                    <Facebook size={20} strokeWidth={1.7} />
                    <PinterestIcon size={20} />
                  </div>

                  <button
                    type="button"
                    aria-label="Next"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/60 transition-opacity hover:opacity-70"
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
