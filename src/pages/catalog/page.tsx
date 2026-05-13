import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CatalogHero from './components/CatalogHero';
import LookbookGrid from './components/LookbookGrid';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Catalog() {
  const ctaRef = useScrollReveal<HTMLElement>();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CatalogHero />
      <main>
        <LookbookGrid />

        {/* Shop CTA Banner */}
        <section ref={ctaRef} className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-arvox-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="sr-reveal" data-sr-delay="0">
              <h2 className="font-display italic text-white text-2xl md:text-3xl lg:text-4xl">
                Ready to shop?
              </h2>
              <p className="font-body text-xs text-white/50 mt-2 max-w-sm leading-relaxed">
                Every piece from this lookbook is available now. Limited quantities, no restocks.
              </p>
            </div>
            <Link
              to="/shop"
              className="sr-reveal inline-flex items-center gap-3 px-8 py-3 bg-white text-arvox-black font-body text-xs font-semibold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors duration-300 whitespace-nowrap flex-shrink-0"
              data-sr-delay="150"
            >
              Shop All
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}