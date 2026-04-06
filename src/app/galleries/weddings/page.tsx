import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Weddings from '@/components/Weddings';
import InstagramFollow from '@/components/InstagramFollow';

export default function WeddingsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="pt-[160px] md:pt-[520px]">
        <Weddings />
      </div>
      <InstagramFollow />

      <Footer />
    </main>
  );
}
