import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FeaturedItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const defaultItems: FeaturedItem[] = [
  {
    id: '2',
    name: 'Arvox Oversized Hoodie',
    price: 78,
    image: 'https://readdy.ai/api/search-image?query=Dark%20oversized%20hoodie%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=500&height=600&seq=750&orientation=squarish',
  },
  {
    id: '5',
    name: 'Arvox Cargo Pant',
    price: 68,
    image: 'https://readdy.ai/api/search-image?query=Black%20cargo%20pants%20with%20multiple%20pockets%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20fabric%20texture%20visible&width=500&height=600&seq=751&orientation=squarish',
  },
  {
    id: '6',
    name: 'Arvox Zip Hoodie',
    price: 82,
    image: 'https://readdy.ai/api/search-image?query=Off-white%20zip-up%20hoodie%20laid%20flat%20on%20clean%20white%20background%2C%20minimalist%20product%20photography%2C%20high%20fashion%20streetwear%20editorial%20style%2C%20soft%20studio%20lighting%2C%20sharp%20focus%2C%20premium%20quality%20garment%20photography%20with%20subtle%20fabric%20texture%20visible&width=500&height=600&seq=752&orientation=squarish',
  },
];

interface ShopHeroProps {
  featuredItems?: FeaturedItem[];
}

export default function ShopHero({ featuredItems: propItems }: ShopHeroProps) {
  const [activeItem, setActiveItem] = useState(0);
  const featuredItems = propItems && propItems.length >= 3 ? propItems : defaultItems;
  const item = featuredItems[activeItem];

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-arvox-black isolate flex flex-col lg:flex-row">
      {/* Image Panel */}
      <div className="relative w-full lg:w-1/2 h-[55vh] sm:h-[60vh] lg:h-auto lg:min-h-[700px] order-1 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20in%20dramatic%20side%20profile%20wearing%20all-black%20oversized%20streetwear%20hoodie%20and%20cargo%20pants%2C%20deep%20chiaroscuro%20Rembrandt%20lighting%20with%20one%20side%20in%20shadow%2C%20minimalist%20concrete%20studio%2C%20monochrome%20dark%20palette%2C%20powerful%20editorial%20pose%2C%20premium%20fashion%20magazine%20campaign%2C%20cinematic%20composition%2C%20full%20body%20portrait%2C%20moody%20atmospheric%20lighting%2C%20sharp%20fabric%20texture%2C%20clean%20neutral%20background%2C%20high%20contrast%20black%20and%20white%20tones&width=900&height=1200&seq=740&orientation=portrait"
          alt="Arvox Shop Season 01"
          className="w-full h-full object-cover object-top"
        />
        {/* Mobile fade into text panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-arvox-black via-arvox-black/30 to-transparent lg:hidden" />
        {/* Desktop right edge blend */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-40 bg-gradient-to-l from-arvox-black to-transparent" />

        {/* Editorial number on image */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
          <span className="font-grotesque text-xs font-bold text-white/30 tracking-[0.2em]">
            01
          </span>
        </div>
      </div>

      {/* Text + Product Panel */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between px-6 md:px-10 lg:px-14 xl:px-20 py-8 md:py-12 lg:py-16 bg-arvox-black order-2">
        {/* Top: Season Label */}
        <div className="overflow-hidden">
          <p className="font-body text-white/40 uppercase text-[10px] md:text-xs tracking-[0.35em] animate-shop-line">
            ARVOX SPACE — Season 01
          </p>
        </div>

        {/* Center: Typography */}
        <div className="flex-1 flex flex-col justify-center mt-8 lg:mt-0">
          <div className="overflow-hidden">
            <h1
              className="font-grotesque font-bold text-white uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[100px] leading-[0.85] tracking-[0.06em] animate-shop-line"
              style={{ animationDelay: '100ms' }}
            >
              SHOP
            </h1>
          </div>
          <div className="overflow-hidden mt-1">
            <p
              className="font-display italic text-white/25 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-shop-line"
              style={{ animationDelay: '200ms' }}
            >
              Now
            </p>
          </div>

          {/* Subtext */}
          <div
            className="mt-6 md:mt-8 max-w-sm animate-shop-fade"
            style={{ animationDelay: '400ms' }}
          >
            <div className="w-10 h-[1px] bg-white/25 mb-4" />
            <p className="font-body text-xs md:text-sm text-white/45 leading-[1.7]">
              All our latest drops. Limited quantities. No restocks. Every piece
              is crafted in small batches and released exclusively to our
              community.
            </p>
          </div>

          {/* Model Credits */}
          <div
            className="mt-6 md:mt-8 animate-shop-fade"
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex flex-wrap gap-x-5 md:gap-x-6 gap-y-1">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
                Model
                <span className="text-white/60 ml-1">K. Nakamura</span>
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
                Photo
                <span className="text-white/60 ml-1">Studio Arvox</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Featured Product Card + Carousel */}
        <div
          className="mt-8 lg:mt-0 animate-shop-fade"
          style={{ animationDelay: '600ms' }}
        >
          {/* Product Carousel */}
          <div className="flex items-center gap-3 mb-4">
            {featuredItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveItem(i)}
                className={`h-[2px] transition-all duration-300 cursor-pointer ${
                  i === activeItem ? 'w-8 bg-white' : 'w-4 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
            <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em] ml-2">
              Featured
            </span>
          </div>

          {/* Product Card */}
          <Link
            to={`/product/${item.id}`}
            className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-3 pr-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
          >
            <div className="w-16 h-20 overflow-hidden flex-shrink-0 bg-white/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-xs font-semibold text-white uppercase tracking-[0.1em]">
                {item.name}
              </span>
              <span className="font-body text-xs text-white/50 mt-0.5">
                ${item.price}
              </span>
              <span className="font-body text-[10px] text-white/40 uppercase tracking-[0.15em] mt-2 flex items-center gap-1">
                View
                <i className="ri-arrow-right-line text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </Link>

          {/* Scroll cue */}
          <div className="flex items-center gap-3 mt-6">
            <span className="w-6 h-[1px] bg-white/25" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/30">
              Scroll to shop
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shopLineReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shopFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shop-line {
          animation: shopLineReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-shop-fade {
          animation: shopFadeIn 0.7s ease-out both;
        }
      `}</style>
    </section>
  );
}