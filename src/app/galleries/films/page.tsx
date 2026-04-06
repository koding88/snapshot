import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Films from '@/components/Films';
import InstagramFollow from '@/components/InstagramFollow';

export default function FilmsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="pt-[240px] md:pt-[390px]">
        <Films />
      </div>
      <InstagramFollow />

      <Footer />
    </main>
  );
}
