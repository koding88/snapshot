import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Couples from '@/components/Couples';
import InstagramFollow from '@/components/InstagramFollow';

export default function CouplesPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="pt-[240px] md:pt-[390px]">
        <Couples />
      </div>
      <InstagramFollow />

      <Footer />
    </main>
  );
}
