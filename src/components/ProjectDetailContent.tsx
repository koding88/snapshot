'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';
import { usePublicProject } from '@/hooks/useProjects';
import GalleryLightbox from './GalleryLightbox';

interface MediaItem {
  id: string;
  kind: string;
  fileId: string;
  url: string;
}

export default function ProjectDetailContent() {
  const params = useParams();
  const projectId = params.projectId as string;
  const galleryId = params.galleryId as string;
  const locale = params.locale as string;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading, isError } = usePublicProject(projectId);
  const project = data;

  // Extract all images from mediaLayout blocks
  const contentImages = useMemo(() => {
    if (!project?.content?.blocks) return [];
    return project.content.blocks.flatMap((block) => {
      if (block.type === 'mediaLayout') {
        const items = (block.data.items as MediaItem[]) ?? [];
        return items
          .filter((item) => item.kind === 'image')
          .map((item) => ({ src: item.url, title: project.name }));
      }
      return [];
    });
  }, [project]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-4xl px-8 py-24">
          <div className="flex justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !project) {
    return (
      <section className="relative overflow-hidden bg-black text-white">
        <div className="mx-auto max-w-4xl px-8 py-24">
          <div className="flex justify-center py-32">
            <p className="font-serif text-white/50 text-lg">Project not found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-445 px-8 py-24 md:px-14 lg:px-20 xl:px-24">
        {/* Back link */}
        <Link
          href={`/${locale}/galleries/${galleryId}`}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
        >
          <IoArrowBackOutline className="text-lg transition-transform group-hover:-translate-x-1" />
          <span className="text-sm uppercase tracking-widest">Back to Gallery</span>
        </Link>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl text-center mb-16"
        >
          {project.name}
        </motion.h1>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full aspect-3/2 overflow-hidden mb-16"
        >
          <Image
            src={project.coverImage.url}
            alt={project.name}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </motion.div>

        {/* Content images grid */}
        {contentImages.length > 0 && (
          <div className="grid grid-cols-1 gap-x-14 gap-y-20 md:grid-cols-2 lg:gap-x-20 lg:gap-y-28">
            {contentImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.15 }}
              >
                <div
                  onClick={() => openLightbox(index)}
                  className="group relative mx-auto w-full max-w-140 cursor-pointer"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1.25' }}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 90vw, 40vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <GalleryLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={contentImages}
          currentIndex={selectedIndex}
          onPrev={() => setSelectedIndex((prev) => (prev - 1 + contentImages.length) % contentImages.length)}
          onNext={() => setSelectedIndex((prev) => (prev + 1) % contentImages.length)}
        />
      )}
    </section>
  );
}
