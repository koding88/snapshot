'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePublicProjects } from '@/hooks/useProjects';
import { usePublicGalleries } from '@/hooks/useGalleries';
import GalleryLightbox from './GalleryLightbox';

const offsets = ["lg:mt-0", "lg:mt-40", "lg:mt-0", "lg:mt-40"];

function ProjectCard({
  src,
  alt,
  title,
  href,
  index,
}: {
  src: string;
  alt: string;
  title: string;
  href: string;
  index: number;
}) {
  return (
    <div className={`group relative flex flex-col gap-6 ${offsets[index % 4]}`}>
      <div className="relative overflow-hidden aspect-[1.15] md:aspect-[1.3]">
        <Link href={href} className="block w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </Link>
      </div>
      <div className="text-center transition-colors duration-500">
        <Link href={href} className="font-serif text-[1rem] md:text-[1.25rem] leading-tight text-white tracking-wide hover:underline">
          {title}
        </Link>
      </div>
    </div>
  );
}

export default function GalleryProjects() {
  const params = useParams();
  const galleryId = params.galleryId as string;
  const locale = params.locale as string;

  const [page, setPage] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: galleriesData } = usePublicGalleries({ limit: 100 });
  const galleryName = galleriesData?.items.find((g) => g.id === galleryId)?.name;

  const { data, isLoading, isError } = usePublicProjects({
    galleryId,
    page,
    limit: 12,
  });

  const projects = data?.items ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  const images = projects.map((p) => ({
    src: p.coverImage.url,
    title: p.name,
  }));

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-black text-white px-8 py-24 md:px-14 lg:px-24">
        <div className="mx-auto max-w-[1780px]">
          <div className="flex justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || projects.length === 0) {
    return (
      <section className="relative min-h-screen bg-black text-white px-8 py-24 md:px-14 lg:px-24">
        <div className="mx-auto max-w-[1780px]">
          <div className="flex justify-center py-32">
            <p className="font-serif text-white/50 text-lg">No projects found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-white px-8 py-24 md:px-14 lg:px-24">
      <div className="mx-auto max-w-[1780px]">

        {/* Heading – same style as GalleriesMain */}
        <div className="flex flex-col items-center mb-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-[0.05em] uppercase mb-4"
            
          >
            {galleryName ?? '...'}
          </motion.h1>
        </div>

        {/* Grid with staggered offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                src={project.coverImage.url}
                alt={project.name}
                title={project.name}
                href={`/${locale}/galleries/${galleryId}/${project.id}`}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-20 flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handlePageChange(p)}
                className={`h-9 w-9 text-[0.75rem] font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  page === p
                    ? 'bg-white text-black'
                    : 'border border-white/30 text-white/60 hover:border-white hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <GalleryLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={images}
          currentIndex={selectedIndex}
          onPrev={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
          onNext={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
        />
      )}
    </section>
  );
}
