import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleriesMain from '@/components/GalleriesMain';
import InstagramFollow from '@/components/InstagramFollow';

export default function GalleriesIndexPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <div className="relative">
        <GalleriesMain />
      </div>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
