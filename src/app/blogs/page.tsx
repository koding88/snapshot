import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Blogs from '@/components/Blogs';
import InstagramFollow from '@/components/InstagramFollow';

export default function BlogsPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />

      <div className="">
        <Blogs />
      </div>
      <InstagramFollow />

      <Footer />
    </main>
  );
}
