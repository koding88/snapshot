'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://fixteamstudio.com/wp-content/uploads/2023/07/IMG_9486.jpg"
          alt="Contact us cinematic couple"
          fill
          className="object-cover object-center grayscale-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </section>
  );
}
