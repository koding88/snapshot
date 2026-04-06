'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stories = [
  {
    title: 'Weddings',
    image: 'https://fixteamstudio.com/wp-content/uploads/2024/01/J1021730-1.jpg',
    imageClassName: 'object-cover object-center',
    imageOffset: 'left-16 top-9',
  },
  {
    title: 'Elopements - Prewed',
    image: 'https://fixteamstudio.com/wp-content/uploads/2024/03/J1022791.jpg',
    imageClassName: 'object-cover object-center',
    imageOffset: 'left-16 top-8',
  },
  {
    title: 'Couples - Families',
    image: 'https://fixteamstudio.com/wp-content/uploads/2023/04/GTTR5835.jpg',
    imageClassName: 'object-cover object-center',
    imageOffset: 'left-16 top-9',
  },
];

export default function RecentStories() {
  return (
    <section className="bg-black px-8 pt-24 pb-40 text-white md:px-14 lg:px-16 xl:px-32 lg:pb-56 2xl:px-48">
      <div className="mx-auto max-w-[1780px]">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="h-px flex-1 bg-white/80" />
          <h2 className="shrink-0 font-serif text-[1rem] uppercase tracking-[0.36em] text-white/92 sm:text-[1.08rem]">
            Our Recent Stories
          </h2>
          <div className="h-px flex-1 bg-white/80" />
        </div>

        <div className="mt-28 grid grid-cols-1 gap-14 md:mt-36 lg:grid-cols-3 lg:gap-16 xl:gap-20 2xl:gap-24">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[400px] bg-[#efefea]">
                <div className="absolute inset-y-0 left-0 flex w-16 items-center justify-center sm:w-18">
                  <span className="rotate-180 font-sans text-[0.82rem] uppercase tracking-[0.36em] text-black [writing-mode:vertical-rl] [text-orientation:mixed]">
                    {story.title}
                  </span>
                </div>

                <div
                  className={`absolute ${story.imageOffset} h-[74%] w-[90%] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.32)] transition-all duration-700 group-hover:scale-[1.05] group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.4)]`}
                >
                  <div
                    className="relative h-full w-full"
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className={`${story.imageClassName} transition-transform duration-700`}
                      sizes="(max-width: 1024px) 90vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
