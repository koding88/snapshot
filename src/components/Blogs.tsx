'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePublicBlogs } from '@/hooks/useBlogs';

type BlogCardProps = {
  src: string;
  alt: string;
  title: string;
  href: string;
  grayscale?: boolean;
};

function BlogCard({ src, alt, title, href, grayscale = false }: BlogCardProps) {
  return (
    <Link href={href}>
      <article 
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
    </Link>
  );
}

export default function Blogs() {
  const t = useTranslations('Blogs');
  const params = useParams();
  const locale = params.locale as string;

  const { data } = usePublicBlogs({ limit: 20 });
  const blogs = data?.items ?? [];

  const blogData = blogs.map((blog) => ({
    id: blog.id,
    src: blog.coverImage.url,
    title: blog.name,
  }));

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
              {t('heading')}
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
            {blogData.filter((_, i) => i % 2 === 0).map((blog) => (
              <BlogCard
                key={blog.id}
                src={blog.src}
                alt={blog.title}
                title={blog.title}
                href={`/${locale}/blogs/${blog.id}`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-32 lg:pt-32"
          >
            {blogData.filter((_, i) => i % 2 === 1).map((blog) => (
              <BlogCard
                key={blog.id}
                src={blog.src}
                alt={blog.title}
                title={blog.title}
                href={`/${locale}/blogs/${blog.id}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
