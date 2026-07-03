import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Verticales from '@/components/Verticales';
import IntelligenceHub from '@/components/IntelligenceHub';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Verticales />
        <IntelligenceHub />
        <About />
      </main>
      <Footer />
    </>
  );
}
