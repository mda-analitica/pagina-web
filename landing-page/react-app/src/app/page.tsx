import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Verticales from '@/components/Verticales';
import IntelligenceHub from '@/components/IntelligenceHub';
import Nosotros from '@/components/Nosotros';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Verticales />
        <IntelligenceHub />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
