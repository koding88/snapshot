'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoCloseSharp, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { FaFacebookF, FaPinterestP } from 'react-icons/fa';
import { usePublicBlog, usePublicBlogs } from '@/hooks/useBlogs';
import { useTranslations } from 'next-intl';
import Navbar from './Navbar';
import Footer from './Footer';

interface MediaItem {
  id: string;
  kind: string;
  fileId: string;
  url: string;
}

interface EditorBlock {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

function RenderBlock({ block }: { block: EditorBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          className="font-sans text-white/80 text-base md:text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: block.data.text as string }}
        />
      );
    case 'header': {
      const level = (block.data.level as number) || 2;
      const className = "font-serif text-white text-2xl md:text-3xl mb-6 mt-10";
      const html = { __html: block.data.text as string };
      if (level === 1) return <h1 className={className} dangerouslySetInnerHTML={html} />;
      if (level === 3) return <h3 className={className} dangerouslySetInnerHTML={html} />;
      if (level === 4) return <h4 className={className} dangerouslySetInnerHTML={html} />;
      return <h2 className={className} dangerouslySetInnerHTML={html} />;
    }
    case 'image': {
      const url = (block.data.file as { url: string })?.url || (block.data.url as string);
      const caption = block.data.caption as string;
      if (!url) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-3/2 overflow-hidden">
            <Image
              src={url}
              alt={caption || ''}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-white/50 text-sm mt-3 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case 'list': {
      const items = block.data.items as string[];
      const style = block.data.style as string;
      const ListTag = style === 'ordered' ? 'ol' : 'ul';
      return (
        <ListTag className={`text-white/80 text-base md:text-lg leading-relaxed mb-6 pl-6 ${style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {items?.map((item, i) => (
            <li key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListTag>
      );
    }
    case 'quote':
      return (
        <blockquote className="border-l-2 border-white/30 pl-6 my-8">
          <p
            className="font-serif text-white/70 text-lg md:text-xl italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.data.text as string }}
          />
          {block.data.caption ? (
            <cite className="text-white/40 text-sm mt-2 block not-italic">
              — {String(block.data.caption)}
            </cite>
          ) : null}
        </blockquote>
      );
    case 'delimiter':
      return <hr className="border-white/10 my-12" />;
    default:
      return null;
  }
}

export default function BlogDetailContent() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.blogId as string;
  const locale = params.locale as string;
  const t = useTranslations('BlogDetail');

  const containerRef = useRef<HTMLDivElement>(null);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      setHeaderHidden(el.scrollTop > 60);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const { data, isLoading, isError } = usePublicBlog(blogId);
  const blog = data;

  // Fetch blog list for prev/next navigation
  const { data: blogsData } = usePublicBlogs({ limit: 100 });
  const blogList = blogsData?.items ?? [];

  const currentBlogIndex = blogList.findIndex((b) => b.id === blogId);
  const prevBlog = currentBlogIndex > 0 ? blogList[currentBlogIndex - 1] : null;
  const nextBlog = currentBlogIndex >= 0 && currentBlogIndex < blogList.length - 1 ? blogList[currentBlogIndex + 1] : null;

  const navigateToBlog = (id: string) => {
    router.push(`/${locale}/blogs/${id}`);
  };

  // Extract all images from mediaLayout blocks (cover + content)
  const allImages = useMemo(() => {
    const images: { src: string; title: string }[] = [];
    if (blog?.coverImage?.url) {
      images.push({ src: blog.coverImage.url, title: blog.name });
    }
    if (blog?.content?.blocks) {
      blog.content.blocks.forEach((block) => {
        if (block.type === 'mediaLayout') {
          const items = (block.data.items as MediaItem[]) ?? [];
          items
            .filter((item) => item.kind === 'image')
            .forEach((item) => images.push({ src: item.url, title: blog.name }));
        }
      });
    }
    return images;
  }, [blog]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <p className="font-serif text-white/50 text-lg">{t('notFound')}</p>
      </div>
    );
  }

  const currentImage = allImages[0];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-y-auto scroll-smooth"
    >
      <Navbar forceVisible={true} manualHidden={headerHidden} isLightbox={true} />

      <div className="flex flex-col min-h-screen relative">
        {/* Top bar: Close + Prev/Next */}
        <motion.div
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 },
          }}
          animate="visible"
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-8 flex justify-between items-start md:mt-[70px] px-8 md:px-20 w-full"
        >
          <button
            onClick={() => router.push(`/${locale}/blogs`)}
            className="group flex items-center gap-2 text-[0.8rem] tracking-[0.2em] uppercase hover:opacity-100 opacity-60 transition-opacity pointer-events-auto text-white"
          >
            <IoCloseSharp size={24} />
            <span>{t('backToBlogs')}</span>
          </button>

          <div className="flex items-center gap-8 pointer-events-auto text-white">
            <button
              onClick={() => prevBlog && navigateToBlog(prevBlog.id)}
              disabled={!prevBlog}
              className={`text-[1rem] md:text-[1.1rem] tracking-[0.2em] underline uppercase font-bold transition-opacity ${prevBlog ? 'hover:opacity-100 opacity-90' : 'opacity-30 cursor-not-allowed'}`}
            >
              Prev.
            </button>
            <span className="opacity-80 font-bold text-lg">/</span>
            <button
              onClick={() => nextBlog && navigateToBlog(nextBlog.id)}
              disabled={!nextBlog}
              className={`text-[1rem] md:text-[1.1rem] tracking-[0.2em] underline uppercase font-bold transition-opacity ${nextBlog ? 'hover:opacity-100 opacity-90' : 'opacity-30 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-grow flex flex-col items-center justify-start pb-32 px-8 md:pt-[20px] lg:px-24">
          {/* Cover image */}
          <motion.div
            key={blogId}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[1.15] md:aspect-[1.5] max-w-[950px]"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Title bar with Share / Title / Photo count */}
          <div className="mt-20 w-full max-w-[1400px] flex flex-col md:flex-row items-center justify-between px-4 md:px-0 border-b border-white/20 pb-16 gap-10 md:gap-0 relative">
            <div className="flex flex-col gap-3 flex-1">
              <span className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-white/50">Share:</span>
              <div className="flex gap-8 text-white/70">
                <button className="hover:text-white transition-colors duration-300">
                  <FaFacebookF size={15} />
                </button>
                <button className="hover:text-white transition-colors duration-300">
                  <FaPinterestP size={15} />
                </button>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-white/20 rotate-[25deg] mx-10 hidden md:block" />

            <div className="flex-2 flex justify-center text-center px-10">
              <h3
                className="font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] leading-none text-white font-normal whitespace-nowrap tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {blog.name}
              </h3>
            </div>

            <div className="h-12 w-[1px] bg-white/20 rotate-[25deg] mx-10 hidden md:block" />

            <div className="flex flex-col items-end gap-3 flex-1">
              <span className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-white/50">Photo</span>
              <div className="text-[0.8rem] italic font-serif tracking-[0.2em] text-white/40">
                {allImages.length} {allImages.length === 1 ? 'photo' : 'photos'}
              </div>
            </div>
          </div>

          {/* Text content blocks */}
          {blog.content?.blocks && blog.content.blocks.some((b) => b.type !== 'mediaLayout') && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-20 w-full max-w-[850px] px-4 lg:px-0"
            >
              {blog.content.blocks
                .filter((b) => b.type !== 'mediaLayout')
                .map((block) => (
                  <RenderBlock key={block.id} block={block} />
                ))}
            </motion.div>
          )}

          {/* Content images grid */}
          {allImages.length > 1 && (
            <div className="mt-24 w-full max-w-[1400px] flex flex-col gap-4 lg:gap-8 mb-20 px-4 lg:px-0">
              {/* 2-column grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8"
              >
                {allImages.slice(1, 3).map((image, i) => (
                  <div key={i} className="relative aspect-[3/4] md:aspect-square w-full group overflow-hidden">
                    <Image src={image.src} alt={image.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ))}
              </motion.div>

              {/* 3-column grid */}
              {allImages.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8"
                >
                  {allImages.slice(3, 6).map((image, i) => (
                    <div key={i} className="relative aspect-[4/3] w-full group overflow-hidden">
                      <Image src={image.src} alt={image.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Wide panoramic */}
              {allImages.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative aspect-[16/9] md:aspect-[21/9] w-full group overflow-hidden"
                >
                  <Image src={allImages[6].src} alt={allImages[6].title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </motion.div>
              )}

              {/* Remaining images in 2-col grid */}
              {allImages.length > 7 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8"
                >
                  {allImages.slice(7).map((image, i) => (
                    <div key={i} className="relative aspect-[3/4] md:aspect-square w-full group overflow-hidden">
                      <Image src={image.src} alt={image.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Bottom prev/next navigation */}
          {(prevBlog || nextBlog) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32 mb-40 w-full max-w-[1400px] border-t border-white/10 pt-20 px-8 lg:px-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-0">
                <div
                  onClick={() => prevBlog && navigateToBlog(prevBlog.id)}
                  className={`flex flex-col items-center md:items-start text-center md:text-left group ${prevBlog ? 'cursor-pointer' : 'opacity-30'}`}
                >
                  <span className="text-[0.7rem] font-bold tracking-[0.4em] uppercase text-white/50 mb-3 block">PREV.</span>
                  <span
                    className="font-serif text-[1rem] md:text-[1.1rem] text-white/80 group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {prevBlog?.name ?? '—'}
                  </span>
                </div>

                <div className="flex justify-center gap-10">
                  <button
                    onClick={() => prevBlog && navigateToBlog(prevBlog.id)}
                    disabled={!prevBlog}
                    className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-500 group ${!prevBlog ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    <IoArrowBackOutline size={22} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => nextBlog && navigateToBlog(nextBlog.id)}
                    disabled={!nextBlog}
                    className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-500 group ${!nextBlog ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    <IoArrowForwardOutline size={22} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div
                  onClick={() => nextBlog && navigateToBlog(nextBlog.id)}
                  className={`flex flex-col items-center md:items-end text-center md:text-right group ${nextBlog ? 'cursor-pointer' : 'opacity-30'}`}
                >
                  <span className="text-[0.7rem] font-bold tracking-[0.4em] uppercase text-white/50 mb-3 block">NEXT</span>
                  <span
                    className="font-serif text-[1rem] md:text-[1.1rem] text-white/80 group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {nextBlog?.name ?? '—'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="absolute top-[40%] left-[10%] w-[1px] h-32 bg-white/10 rotate-[25deg] pointer-events-none hidden lg:block" />
          <div className="absolute top-[40%] right-[10%] w-[1px] h-32 bg-white/10 rotate-[-25deg] pointer-events-none hidden lg:block" />
        </div>

        <Footer />
      </div>
    </div>
  );
}
