import SectionLabel from '@/components/base/SectionLabel';
import { collections } from '@/mocks/collections';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FeaturedCollections() {
  const sectionRef = useScrollReveal<HTMLElement>({ staggerDelay: 80 });

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="sr-reveal" data-sr-delay="0">
          <SectionLabel italic="Featured" bold="COLLECTIONS" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={`/shop?category=${collection.id}`}
              className="group cursor-pointer sr-reveal"
              data-sr-stagger="true"
              data-sr-delay="100"
            >
              <div className="relative aspect-square overflow-hidden bg-arvox-offwhite">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-body text-xs md:text-sm font-semibold text-arvox-black uppercase tracking-[0.15em]">
                  {collection.name}
                </h3>
                <p className="font-body text-[10px] text-gray-400 mt-1">
                  {collection.productCount} products
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}