'use client';

import { Facebook, Globe, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a6e] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-300 px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex items-center justify-center rounded bg-white/20 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
              <span className="text-xl font-bold tracking-tight">fixteam studio</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/70">
              fixteam studio was created for the new ways we live and work. We make beautiful photography around the world.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/galleries" className="text-[#f5a623] transition-opacity hover:opacity-80">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-opacity hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/galleries/couples" className="text-white/70 transition-opacity hover:text-white">
                  Client stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Resources
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/blogs" className="text-white/70 transition-opacity hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white/70 transition-opacity hover:text-white">
                  Guides &amp; tutorials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-opacity hover:text-white">
                  Help center
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/about" className="text-white/70 transition-opacity hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-opacity hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-opacity hover:text-white">
                  Media kit
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white">Book a Session</h3>
            <p className="text-sm leading-relaxed text-white/70">
              Get started for free. Add your whole team as your needs grow.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#4a7fd4] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a6fc4]"
            >
              Book today
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-4 px-8 py-5 md:px-12 lg:px-16">
          {/* Left: language + links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <button type="button" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Globe size={15} />
              <span>English</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Link href="/contact" className="transition-colors hover:text-white">Terms &amp; privacy</Link>
            <Link href="/contact" className="transition-colors hover:text-white">Security</Link>
            <Link href="/contact" className="transition-colors hover:text-white">Status</Link>
            <span>©{new Date().getFullYear()} Fixteam Studio LLC.</span>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-4 text-white/60">
            <Link href="#" aria-label="Facebook" className="transition-colors hover:text-white">
              <Facebook size={17} strokeWidth={1.8} />
            </Link>
            <Link href="#" aria-label="Twitter" className="transition-colors hover:text-white">
              <Twitter size={17} strokeWidth={1.8} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <Linkedin size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
