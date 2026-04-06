'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

type BlogCardProps = {
  src: string;
  alt: string;
  title: string;
  grayscale?: boolean;
  onClick: () => void;
};

function BlogCard({ src, alt, title, grayscale = false, onClick }: BlogCardProps) {
  return (
    <article 
      onClick={onClick}
      className="group relative mx-auto w-full max-w-[560px] cursor-pointer"
    >
      <div className="relative z-10">
        <div className="relative overflow-hidden" style={{ aspectRatio: '1.25' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.02] ${grayscale ? 'grayscale hover:grayscale-0 transition-all' : ''}`}
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
        </div>
        <div className="mt-5 text-center">
          <p className="font-serif text-[1rem] md:text-[1.15rem] leading-tight text-white transition-colors duration-500 px-4">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Blogs() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const blogData = [
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2025/05/DSCF6079-768x512.jpg",
      title: "Why is Vietnam the best place for an elopement wedding?",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/08/DSC_1740-768x511.jpg",
      title: "How to elope in Viet Nam – THE ULTIMATE GUIDE",
    },
    {
      src: "https://fixteamstudio.com/wp-content/uploads/2023/04/DSCF4804-768x512.jpg",
      title: "The Best Places to Elope in Viet Nam",
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="blogs" className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-[1780px] px-8 py-24 md:px-14 lg:px-20 lg:py-32 xl:px-24">
        <div className="mb-24 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-serif font-normal text-white text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 5.15vw, 4.5rem)',
                lineHeight: 1.1,
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              Blogs
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-start gap-32 lg:grid-cols-2 lg:gap-40">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32"
          >
            <BlogCard
              src={blogData[0].src}
              alt={blogData[0].title}
              title={blogData[0].title}
              onClick={() => openLightbox(0)}
            />
            <BlogCard
              src={blogData[1].src}
              alt={blogData[1].title}
              title={blogData[1].title}
              onClick={() => openLightbox(1)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32 lg:pt-32"
          >
            <BlogCard
              src={blogData[2].src}
              alt={blogData[2].title}
              title={blogData[2].title}
              onClick={() => openLightbox(2)}
            />
          </motion.div>
        </div>
      </div>

      <GalleryLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={blogData}
        currentIndex={selectedImageIndex}
        onPrev={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : blogData.length - 1))}
        onNext={() => setSelectedImageIndex((prev) => (prev < blogData.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
