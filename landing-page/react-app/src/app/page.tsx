import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Verticales from '@/components/Verticales';
import IntelligenceHub from '@/components/IntelligenceHub';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Verticales />
        <IntelligenceHub />
      </main>
      <Footer />
    </>
  );
}
