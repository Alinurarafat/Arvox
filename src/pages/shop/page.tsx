import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductCard from '@/components/base/ProductCard';
import ShopHero from './components/ShopHero';
import SizeGuideModal from '@/components/feature/SizeGuideModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useShopifyProducts } from '@/context/ShopifyContext';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'under50', label: 'Under $50' },
  { value: '50to80', label: '$50 — $80' },
  { value: 'over80', label: 'Over $80' },
];

export default function Shop() {
  const { products, loading, error, refresh } = useShopifyProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const outroRef = useScrollReveal<HTMLElement>();

  const categories = useMemo(() => {
    const types = new Set(products.map((p) => p.productType).filter(Boolean));
    return [
      { value: 'all', label: 'All' },
      ...Array.from(types).map((t) => ({ value: t, label: t })),
    ];
  }, [products]);

  function getCategoryCount(cat: string) {
    if (cat === 'all') return products.length;
    return products.filter((p) => p.productType === cat).length;
  }

  let filtered = [...products];

  if (activeCategory !== 'all') {
    filtered = filtered.filter((p) => p.productType === activeCategory);
  }

  if (priceRange === 'under50') {
    filtered = filtered.filter((p) => p.price < 50);
  } else if (priceRange === '50to80') {
    filtered = filtered.filter((p) => p.price >= 50 && p.price <= 80);
  } else if (priceRange === 'over80') {
    filtered = filtered.filter((p) => p.price > 80);
  }

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));
  }

  // Scroll reveal for grid items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('shop-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = gridRef.current?.querySelectorAll('.shop-reveal');
    elements?.forEach((el) => {
      el.classList.remove('shop-animate');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filtered.length, activeCategory, sortBy, priceRange]);

  const newDrops = products.filter((p) => p.isNew);

  const heroItems = useMemo(() => {
    return products.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    }));
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ShopHero featuredItems={heroItems.length >= 3 ? heroItems : undefined} />

      <main>
        {/* New Drop Editorial Strip */}
        {newDrops.length > 0 && activeCategory === 'all' && priceRange === 'all' && (
          <section className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <span className="font-body text-sm italic text-gray-500 tracking-wide">New</span>
                <span className="font-grotesque text-sm font-bold text-arvox-black uppercase tracking-[0.15em] ml-1">
                  Drops
                </span>
                <span className="w-10 h-[1px] bg-gray-200 ml-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {newDrops.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 border-b border-gray-100 sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-x-5 md:gap-x-7 gap-y-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                const count = getCategoryCount(cat.value);
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`relative font-body text-xs md:text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300 cursor-pointer whitespace-nowrap pb-1 ${
                      isActive ? 'text-arvox-black' : 'text-gray-400 hover:text-arvox-black'
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-1 text-[10px] ${isActive ? 'text-arvox-black' : 'text-gray-300'}`}>
                      ({count})
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-arvox-black transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Price + Sort Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-x-4 md:gap-x-5 gap-y-1">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`font-body text-[11px] md:text-xs uppercase tracking-[0.1em] transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                      priceRange === range.value
                        ? 'text-arvox-black'
                        : 'text-gray-400 hover:text-arvox-black'
                    }`}
                  >
                    {range.label}
                    {priceRange === range.value && (
                      <span className="block w-full h-[1px] bg-arvox-black mt-0.5" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-body text-[11px] text-gray-400 uppercase tracking-wider">
                  Sort
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="font-body text-xs text-arvox-black bg-white border border-gray-200 px-3 py-2 outline-none focus:border-arvox-black cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="w-full px-4 md:px-8 lg:px-12 pt-8 md:pt-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="font-body text-xs text-gray-400 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </p>
            <p className="font-body text-[11px] text-gray-300 uppercase tracking-wider hidden sm:block">
              Season 01
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="max-w-7xl mx-auto" ref={gridRef}>
            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-gray-200" />
                    <div className="h-4 bg-gray-200 mt-3 w-3/4 rounded" />
                    <div className="h-3 bg-gray-200 mt-2 w-1/2 rounded" />
                    <div className="flex gap-1.5 mt-2.5">
                      <div className="w-3 h-3 bg-gray-200 rounded-full" />
                      <div className="w-3 h-3 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-20 sr-reveal">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-red-400">
                  <i className="ri-error-warning-line text-3xl" />
                </div>
                <p className="font-body text-sm text-red-500 mb-4">
                  {error}
                </p>
                <button
                  onClick={refresh}
                  className="px-6 py-3 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.15em] cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Products */}
            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5" data-product-shop>
                {filtered.map((product, idx) => (
                  <div
                    key={product.id}
                    className="shop-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out"
                    style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="text-center py-20 sr-reveal">
                <p className="font-body text-sm text-gray-400">
                  No pieces found for this selection.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setPriceRange('all');
                    setSortBy('featured');
                  }}
                  className="mt-4 font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] underline underline-offset-4 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Editorial Outro */}
        <section ref={outroRef} className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-arvox-offwhite">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="sr-reveal" data-sr-delay="0">
              <h3 className="font-display italic text-arvox-black text-2xl md:text-3xl">
                Need help finding your fit?
              </h3>
              <p className="font-body text-xs text-gray-500 mt-2 max-w-sm leading-relaxed">
                Every piece runs true to size with an oversized silhouette. Check our size guide for detailed measurements.
              </p>
            </div>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="sr-reveal inline-flex items-center gap-3 px-8 py-3 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors duration-300 whitespace-nowrap cursor-pointer"
              data-sr-delay="150"
            >
              View Size Guide
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line" />
              </div>
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      <style>{`
        .shop-reveal.shop-animate {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}