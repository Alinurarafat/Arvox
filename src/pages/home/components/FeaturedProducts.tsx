import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from '@/components/base/SectionLabel';
import ProductCard from '@/components/base/ProductCard';
import { useShopifyProducts } from '@/context/ShopifyContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type TabFilter = 'bestselling' | 'newdrop' | 'under50';

const tabs: { key: TabFilter; label: string }[] = [
  { key: 'bestselling', label: 'Bestselling' },
  { key: 'newdrop', label: 'New Drop' },
  { key: 'under50', label: 'Under $50' },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabFilter>('bestselling');
  const { products, loading, error } = useShopifyProducts();
  const sectionRef = useScrollReveal<HTMLElement>({ staggerDelay: 60 });

  const getProducts = () => {
    switch (activeTab) {
      case 'bestselling':
        return products.filter((p) => p.isBestseller);
      case 'newdrop':
        return products.filter((p) => p.isNew);
      case 'under50':
        return products.filter((p) => p.isUnder50);
      default:
        return products;
    }
  };

  const filteredProducts = getProducts();

  return (
    <section ref={sectionRef} className="w-full bg-arvox-offwhite py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="sr-reveal" data-sr-delay="0">
          <SectionLabel italic="Featured" bold="PRODUCTS" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-14 sr-reveal" data-sr-delay="100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                activeTab === tab.key
                  ? 'bg-arvox-black text-white border-transparent'
                  : 'bg-white text-arvox-black border-gray-200 hover:border-arvox-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200" />
                <div className="h-4 bg-gray-200 mt-3 w-3/4 rounded" />
                <div className="h-3 bg-gray-200 mt-2 w-1/2 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-10">
            <p className="font-body text-sm text-gray-400">
              Unable to load featured products.
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="sr-reveal" data-sr-stagger="true" data-sr-delay="150">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-12 md:mt-16 sr-reveal" data-sr-delay="300">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-arvox-black text-white font-body text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-gray-900 whitespace-nowrap cursor-pointer"
          >
            <span>View All Products</span>
            <span className="w-6 h-[1px] bg-white/60 group-hover:w-8 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}