"use client";

import { useState, useRef, useEffect } from "react";
import { usePublicSiteSettings } from "@/hooks/useSiteSettings";
import { usePublicGalleries } from "@/hooks/useGalleries";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Instagram, Facebook, X, Plus, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const GALLERIES_KEY = "galleries";

const PinterestIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.19-2.4.04-3.43.21-.93 1.34-5.69 1.34-5.69s-.34-.69-.34-1.7c0-1.59.92-2.79 2.08-2.79 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.56-.99 3.98-.28 1.18.59 2.15 1.76 2.15 2.11 0 3.73-2.23 3.73-5.44 0-2.84-2.04-4.83-4.96-4.83-3.38 0-5.36 2.54-5.36 5.15 0 1.02.39 2.11.89 2.71.1.12.11.23.08.35-.1.4-.31 1.25-.35 1.41-.05.21-.17.26-.4.15-1.48-.69-2.4-2.86-2.4-4.6 0-3.75 2.72-7.19 7.85-7.19 4.12 0 7.33 2.94 7.33 6.87 0 4.1-2.58 7.4-6.17 7.4-1.2 0-2.34-.63-2.73-1.37l-.74 2.82c-.27 1.03-1 2.32-1.49 3.12 1.13.35 2.33.54 3.58.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
  </svg>
);

const MenuIcon = ({ size = 24, strokeWidth = 1.2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const languages = [
  { code: "en", label: "English" },
  { code: "vi", label: "Vietnamese" },
  { code: "zh", label: "Chinese" },
];

function replaceLocaleInPath(pathname: string, newLocale: string): string {
  const segments = pathname.split("/");
  // pathname starts with /locale/...
  if (routing.locales.includes(segments[1] as "en" | "vi" | "zh")) {
    segments[1] = newLocale;
    return segments.join("/");
  }
  return `/${newLocale}${pathname}`;
}

export default function Navbar({
  forceVisible: _forceVisible = false,
  manualHidden = false,
  isLightbox: _isLightbox = false,
}: {
  forceVisible?: boolean;
  manualHidden?: boolean;
  isLightbox?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleriesOpen, setIsGalleriesOpen] = useState(false);
  const [isGalleriesHovered, setIsGalleriesHovered] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLang = useLocale();
  const t = useTranslations("Navbar");

  const { data: galleriesData } = usePublicGalleries({ limit: 20 });
  const { data: siteSettings } = usePublicSiteSettings();

  const { scrollY } = useScroll();
  const pathname = usePathname();

  const switchLocale = (code: string) => {
    const newPath = replaceLocaleInPath(pathname, code);
    window.location.assign(newPath);
    setIsLangOpen(false);
  };

  const isEditorial = pathname === "/" || pathname === "/contact";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showSolid = scrolled || !isEditorial;
  const textColor = showSolid ? "text-black" : "text-white";
  const bgClass = showSolid
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const galleryLinks = (galleriesData?.items ?? []).map((gallery) => ({
    id: gallery.id,
    name: gallery.name,
    href: `/${currentLang}/galleries/${gallery.id}`,
  }));

  const firstGalleryHref =
    galleryLinks.length > 0
      ? galleryLinks[0].href
      : `/${currentLang}/galleries`;

  const menuItems = [
    { name: t("home"), href: `/${currentLang}`, key: "home" },
    { name: t("about"), href: `/${currentLang}/about`, key: "about" },
    { name: t("galleries"), href: firstGalleryHref, key: GALLERIES_KEY },
    { name: t("packages"), href: `/${currentLang}/packages`, key: "packages" },
    { name: t("blogs"), href: `/${currentLang}/blogs`, key: "blogs" },
    { name: t("contact"), href: `/${currentLang}/contact`, key: "contact" },
  ];

  const desktopMenuTextClass =
    currentLang === "zh"
      ? "text-[12px] tracking-[0.16em] lg:text-[12px]"
      : "text-[10px] tracking-[0.3em] lg:text-[10px]";

  const { facebookUrl, pinterestUrl, instagramUrl, whatsappUrl } =
    siteSettings?.socialLinks ?? {};

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1, pointerEvents: "auto" as const },
          hidden: { y: -100, opacity: 0, pointerEvents: "none" as const },
        }}
        initial="visible"
        animate={manualHidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-100 transition-colors duration-300 ${bgClass}`}
      >
        <div className="mx-auto flex h-17.5 max-w-420 items-center justify-between px-6 md:px-12 lg:px-16">
          {/* Left: Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-snapshot.svg"
              alt="Logo"
              width={260}
              height={260}
              unoptimized
              className="h-20 w-auto transition-all"
              priority
            />
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden items-center gap-8 lg:flex lg:gap-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.key === GALLERIES_KEY && setIsGalleriesHovered(true)
                }
                onMouseLeave={() =>
                  item.key === GALLERIES_KEY && setIsGalleriesHovered(false)
                }
              >
                <Link
                  href={item.href}
                  className={`border-b-2 pb-0.5 font-bold uppercase transition-all hover:opacity-70 ${desktopMenuTextClass} ${textColor} ${
                    pathname === item.href
                      ? "border-current"
                      : "border-transparent"
                  }`}
                >
                  {item.name}
                </Link>

                {item.key === GALLERIES_KEY && (
                  <AnimatePresence>
                    {isGalleriesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-5 w-75 -translate-x-1/2 bg-[#bcab9b] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
                      >
                        <div className="flex flex-col items-center gap-6">
                          {galleryLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className="text-[0.8rem] font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap transition-opacity hover:opacity-75"
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

          {/* Right: Social icons + Language selector (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-5">
            {/* Social icons - desktop only */}
            <div className={`hidden items-center gap-4 lg:flex ${textColor}`}>
              {facebookUrl && (
                <Link
                  href={facebookUrl}
                  className="transition-opacity hover:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={16} strokeWidth={1.2} />
                </Link>
              )}
              {pinterestUrl && (
                <Link
                  href={pinterestUrl}
                  className="transition-opacity hover:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PinterestIcon size={16} />
                </Link>
              )}
              {instagramUrl && (
                <Link
                  href={instagramUrl}
                  className="transition-opacity hover:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} strokeWidth={1.2} />
                </Link>
              )}
              {whatsappUrl && (
                <Link
                  href={whatsappUrl}
                  className="transition-opacity hover:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.264.6 4.472 1.736 6.408l-1.832 6.696a1.6 1.6 0 0 0 1.96 1.96l6.696-1.832a12.74 12.74 0 0 0 6.24 1.624h.008c7.064 0 12.8-5.736 12.8-12.8s-5.736-12.8-12.8-12.8zm0 23.2a10.4 10.4 0 0 1-5.36-1.504l-.384-.224-5.008 1.368 1.368-5.008-.224-.384a10.4 10.4 0 1 1 9.608 5.752zm5.68-7.36c-.312-.156-1.848-.912-2.136-1.016-.288-.104-.496-.156-.704.156-.208.312-.808 1.016-.992 1.224-.184.208-.368.232-.68.08-.312-.156-1.32-.488-2.512-1.552-.928-.824-1.552-1.84-1.736-2.152-.184-.312-.02-.48.136-.632.14-.14.312-.368.468-.552.156-.184.208-.312.312-.52.104-.208.052-.392-.024-.552-.08-.156-.704-1.704-.968-2.336-.256-.616-.52-.528-.704-.536-.184-.008-.392-.008-.6-.008-.208 0-.552.08-.84.392-.288.312-1.104 1.08-1.104 2.632 0 1.552 1.128 3.048 1.288 3.256.156.208 2.224 3.4 5.392 4.632.756.324 1.344.52 1.808.664.76.24 1.456.208 2.008.128.616-.092 1.848-.752 2.112-1.48.264-.728.264-1.352.184-1.48-.08-.128-.288-.208-.6-.36z" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Divider - desktop only */}
            <div
              className={`hidden h-5 w-px lg:block ${showSolid ? "bg-black/20" : "bg-white/30"}`}
            />

            {/* Language selector */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest transition-opacity hover:opacity-70 cursor-pointer ${textColor}`}
              >
                <Globe size={14} />
                <span>
                  {languages.find((l) => l.code === currentLang)?.label}
                </span>
                <ChevronDown
                  size={12}
                  className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-3 min-w-25 overflow-hidden rounded-md bg-white py-1 shadow-lg"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          switchLocale(lang.code);
                        }}
                        className={`flex w-full px-4 py-2 text-left text-[12px] font-medium tracking-wider transition-colors hover:bg-gray-100 cursor-pointer ${
                          currentLang === lang.code
                            ? "bg-gray-50 text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger - mobile/tablet only */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
              className={`lg:hidden cursor-pointer ${textColor}`}
            >
              <MenuIcon size={24} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-200 bg-[#6e8787] text-black"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="shrink-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="inline-flex items-center justify-center bg-white  ">
                    <Image
                      src="/logo-snapshot.svg"
                      alt="Logo"
                      width={240}
                      height={240}
                      unoptimized
                      className="h-16 w-auto"
                      priority
                    />
                  </span>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-black cursor-pointer"
                >
                  <X size={24} strokeWidth={1.3} />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden px-4 pt-12">
                <div className="flex w-full gap-6">
                  <motion.span
                    animate={{
                      height: isGalleriesOpen
                        ? 210 + galleryLinks.length * 52
                        : 210,
                    }}
                    className="mt-1 block w-px bg-black/70"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="flex flex-1 flex-col gap-8 pb-12">
                    {menuItems.map((item, idx) => (
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
                          >
                            {item.name}
                          </Link>

                          {item.key === GALLERIES_KEY && (
                            <button
                              type="button"
                              aria-label="Toggle galleries"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsGalleriesOpen((prev) => !prev);
                              }}
                              className="pr-2 text-black/80 transition-opacity hover:text-black cursor-pointer"
                            >
                              {isGalleriesOpen ? (
                                <X size={18} strokeWidth={1.5} />
                              ) : (
                                <Plus size={18} strokeWidth={1.5} />
                              )}
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {item.key === GALLERIES_KEY && isGalleriesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-6 pl-5 pt-7">
                                {galleryLinks.map((subLink) => (
                                  <Link
                                    key={subLink.name}
                                    href={subLink.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-serif text-[0.7rem] font-medium tracking-[0.22em] text-black/65 transition-colors hover:text-black"
                                  >
                                    {subLink.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-2 mt-auto border-t border-black/60 pt-6 pb-4">
                <div className="flex items-center justify-between px-2 text-black">
                  <div className="flex items-center gap-6">
                    <Link
                      href="https://www.facebook.com/"
                      className="transition-opacity hover:opacity-70"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook size={20} strokeWidth={1.5} />
                    </Link>
                    <Link
                      href="https://www.pinterest.com/Snaphanoi/"
                      className="transition-opacity hover:opacity-70"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PinterestIcon size={20} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/snaphanoi.photo/"
                      className="transition-opacity hover:opacity-70"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={20} strokeWidth={1.5} />
                    </Link>
                    <Link
                      href="https://wa.me/84944659659"
                      className="transition-opacity hover:opacity-70"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M16.001 3.2c-7.064 0-12.8 5.736-12.8 12.8 0 2.264.6 4.472 1.736 6.408l-1.832 6.696a1.6 1.6 0 0 0 1.96 1.96l6.696-1.832a12.74 12.74 0 0 0 6.24 1.624h.008c7.064 0 12.8-5.736 12.8-12.8s-5.736-12.8-12.8-12.8zm0 23.2a10.4 10.4 0 0 1-5.36-1.504l-.384-.224-5.008 1.368 1.368-5.008-.224-.384a10.4 10.4 0 1 1 9.608 5.752zm5.68-7.36c-.312-.156-1.848-.912-2.136-1.016-.288-.104-.496-.156-.704.156-.208.312-.808 1.016-.992 1.224-.184.208-.368.232-.68.08-.312-.156-1.32-.488-2.512-1.552-.928-.824-1.552-1.84-1.736-2.152-.184-.312-.02-.48.136-.632.14-.14.312-.368.468-.552.156-.184.208-.312.312-.52.104-.208.052-.392-.024-.552-.08-.156-.704-1.704-.968-2.336-.256-.616-.52-.528-.704-.536-.184-.008-.392-.008-.6-.008-.208 0-.552.08-.84.392-.288.312-1.104 1.08-1.104 2.632 0 1.552 1.128 3.048 1.288 3.256.156.208 2.224 3.4 5.392 4.632.756.324 1.344.52 1.808.664.76.24 1.456.208 2.008.128.616-.092 1.848-.752 2.112-1.48.264-.728.264-1.352.184-1.48-.08-.128-.288-.208-.6-.36z" />
                      </svg>
                    </Link>
                  </div>
                  {/* <div className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-wider">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => switchLocale(lang.code)}
                        className={`transition-opacity hover:opacity-70 cursor-pointer ${currentLang === lang.code ? 'text-black' : 'text-black/50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
