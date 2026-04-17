import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Packages from '@/components/Packages';
import InstagramFollow from '@/components/InstagramFollow';

export default function PackagesPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <div className="">
        <Packages />
      </div>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
