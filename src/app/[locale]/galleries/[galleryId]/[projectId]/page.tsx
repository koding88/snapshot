import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetailContent from '@/components/ProjectDetailContent';
import InstagramFollow from '@/components/InstagramFollow';

export default function ProjectDetailPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <div className="pt-40 md:pt-50">
        <ProjectDetailContent />
      </div>
      <InstagramFollow />
      <Footer />
    </main>
  );
}
