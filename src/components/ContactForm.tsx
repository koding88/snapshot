'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const countries = [
  'Vietnam', 'United States', 'United Kingdom', 'Australia', 'Canada', 'China',
  'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea',
  'Malaysia', 'Philippines', 'Singapore', 'Spain', 'Taiwan', 'Thailand', 'Other',
];

const categories = ['Photo', 'Photo Tour', 'Films'];

const pricePackages = [
  'Basic – $500',
  'Standard – $1,200',
  'Premium – $2,500',
  'Luxury – $5,000',
  'Custom',
];

const howDidYouFindOptions = ['Search', 'Social media', 'Ads', 'Friends', 'Other'];

export default function ContactForm() {
  const [emailPrefix, setEmailPrefix] = useState('');
  const [howFound, setHowFound] = useState('');

  return (
    <section className="bg-black px-8 pb-24 pt-16 text-white md:px-14 lg:px-24 lg:pb-32 lg:pt-24 xl:px-32">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-16"
        >
          <h1
            className="font-serif text-[2.5rem] font-normal uppercase leading-[1.1] tracking-[0.05em] text-white sm:text-[3.5rem] md:text-[4.5rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact
          </h1>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-24">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-9"
          >
            {/* Name */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Your Name</label>
              <input
                type="text"
                required
                placeholder="*"
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            {/* Email with @gmail.com suffix */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Your Email address</label>
              <div className="flex items-center overflow-hidden rounded-[4px] border border-white/45 transition-colors focus-within:border-white">
                <input
                  type="text"
                  required
                  placeholder="*"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  className="h-[62px] flex-1 bg-transparent px-4 text-[1.5rem] text-white outline-none placeholder:text-white"
                />
                <span className="shrink-0 border-l border-white/25 bg-white/10 px-4 py-4 text-[0.95rem] text-white/70">
                  @gmail.com
                </span>
              </div>
            </div>

            {/* Where are you based? - Country select */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Where are you based?</label>
              <div className="relative">
                <select
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-black">{c}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Categories</label>
              <div className="relative">
                <select
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Please choose an option—</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-black">{cat}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Price / Package */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">Price Package</label>
              <div className="relative">
                <select
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Select a package—</option>
                  {pricePackages.map((pkg) => (
                    <option key={pkg} value={pkg} className="bg-black">{pkg}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* How did you find Us? - Dropdown */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">How did you find Us?</label>
              <div className="relative">
                <select
                  value={howFound}
                  onChange={(e) => setHowFound(e.target.value)}
                  required
                  className="h-[62px] w-full appearance-none rounded-[4px] border border-white/45 bg-transparent px-4 pr-12 text-[1rem] text-white outline-none transition-colors focus:border-white"
                >
                  <option value="" className="bg-black">—Please choose an option—</option>
                  {howDidYouFindOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-black">{opt}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9rem] text-red-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                Your photography budget (please specify the currency)
              </label>
              <input
                type="text"
                required
                placeholder="*"
                className="h-[62px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            {/* Tell your story */}
            <div className="space-y-3">
              <label className="block text-[1rem] text-white">
                Tell us all about your story, your interests and your plans! (Share as much info as you like!)
              </label>
              <textarea
                required
                rows={5}
                placeholder="*"
                className="min-h-[160px] w-full rounded-[4px] border border-white/45 bg-transparent px-4 py-4 text-[1.5rem] text-white outline-none transition-colors placeholder:text-white focus:border-white"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                whileHover={{ backgroundColor: 'black', y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-md border border-white px-8 py-3 font-sans text-[0.9rem] font-bold tracking-[0.1em] text-white transition-all duration-300"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.08, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 lg:pt-10"
          >
            <div className="flex flex-col">
              <p
                className="max-w-[520px] text-[0.95rem] leading-[1.85] text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We&apos;d love to find out all about you and your wedding plans! Please share some details in the
                contact form below and we&apos;ll get back to you with some more information. We can&apos;t wait to
                chat more!
              </p>

              <div className="mt-14 space-y-10 text-[1.02rem] leading-[2.1] text-white">
                <div>
                  <p className="mb-2">Office:</p>
                  <p>59/381 Nguyen Khang, Yen Hoa, Cau Giay, Ha Noi, Viet Nam</p>
                </div>

                <div>
                  <p className="mb-2">Mail:</p>
                  <p>fixteamstudio@mail.com</p>
                </div>

                <div>
                  <p className="mb-2">Whatsapp:</p>
                  <p>+84 914901710</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
