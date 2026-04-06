import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InstagramFollow from '@/components/InstagramFollow';
import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <ContactHero />
      <ContactForm />

      <InstagramFollow />
      <Footer />
    </main>
  );
}
