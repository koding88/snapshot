import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramFollow from '@/components/InstagramFollow';
import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <ContactHero />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading...</div>}>
        <ContactForm />
      </Suspense>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
