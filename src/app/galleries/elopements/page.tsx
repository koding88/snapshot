import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Elopements from '@/components/Elopements';
import InstagramFollow from '@/components/InstagramFollow';

export default function ElopementsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="pt-[240px] md:pt-[390px]">
        <Elopements />
      </div>
      <InstagramFollow />

      <Footer />
    </main>
  );
}
