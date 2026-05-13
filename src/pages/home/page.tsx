import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import MarqueeTicker from './components/MarqueeTicker';
import FeaturedCollections from './components/FeaturedCollections';
import FeaturedProducts from './components/FeaturedProducts';
import BrandBanner from './components/BrandBanner';
import FeaturedStyles from './components/FeaturedStyles';
import InstagramWall from './components/InstagramWall';
import EmailCommunity from './components/EmailCommunity';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeTicker />
        <FeaturedCollections />
        <BrandBanner />
        <FeaturedProducts />
        <FeaturedStyles />
        <InstagramWall />
        <EmailCommunity />
      </main>

      <Footer />
    </div>
  );
}