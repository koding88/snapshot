'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import CinematicStory from '@/components/CinematicStory';
import PortfolioGrid from '@/components/PortfolioGrid';
import RecentStories from '@/components/RecentStories';
import FeaturedPhotography from '@/components/FeaturedPhotography';
import NiceWords from '@/components/NiceWords';
import InstagramFollow from '@/components/InstagramFollow';
import Footer from '@/components/Footer';

export default function Home() {
  const portfolioRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ['start end', 'end start'],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45],
    ['#6e8787', '#6e8787', '#000000']
  );

  return (
    <motion.main
      style={{ backgroundColor: bgColor }}
      className="relative min-h-screen"
    >
      <Navbar />
      <HeroSlider />
      <CinematicStory />
      <div ref={portfolioRef}>
        <PortfolioGrid />
      </div>
      <div className="pt-16">
        <RecentStories />
      </div>
      <FeaturedPhotography />
      <NiceWords />
      <InstagramFollow />
      <Footer />
    </motion.main>
  );
}
