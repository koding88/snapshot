import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryProjects from '@/components/GalleryProjects';
import InstagramFollow from '@/components/InstagramFollow';

export default function GalleryDetailPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <div className="">
        <GalleryProjects />
      </div>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
