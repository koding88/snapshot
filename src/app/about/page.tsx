import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import InstagramFollow from '@/components/InstagramFollow';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="">
        <AboutUs />
      </div>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
