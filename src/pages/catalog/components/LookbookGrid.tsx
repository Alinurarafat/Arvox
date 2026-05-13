import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'hoodies',
    label: 'HOODIES',
    sublabel: 'Oversized / Zip / Essential',
    description:
      'Built for layering. Our signature oversized silhouettes in heavyweight fleece, designed to hold shape and warmth through every season.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20wearing%20oversized%20dark%20hoodie%20with%20hood%20up%20and%20relaxed%20fit%2C%20dramatic%20directional%20lighting%2C%20minimalist%20concrete%20studio%2C%20monochrome%20palette%2C%20confident%20pose%20looking%20at%20camera%2C%20premium%20streetwear%20campaign%2C%20half%20body%20portrait%2C%20clean%20neutral%20gray%20background%2C%20sharp%20fabric%20detail&width=800&height=1000&seq=601&orientation=portrait',
    reverse: false,
  },
  {
    id: 'tshirts',
    label: 'T-SHIRTS',
    sublabel: 'Core / Heavyweight / Essential',
    description:
      'The foundation of every fit. Premium cotton, boxy cuts, and tonal stitching. No logos, no noise — just quality you can feel.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20wearing%20premium%20black%20oversized%20t-shirt%20and%20dark%20pants%2C%20dramatic%20side%20lighting%2C%20minimalist%20concrete%20studio%2C%20monochrome%20palette%2C%20relaxed%20confident%20pose%2C%20premium%20streetwear%20campaign%2C%20half%20body%20portrait%2C%20clean%20neutral%20gray%20background&width=800&height=1000&seq=602&orientation=portrait',
    reverse: true,
  },
  {
    id: 'pants',
    label: 'PANTS',
    sublabel: 'Cargo / Technical / Relaxed',
    description:
      'Technical and tailored. Six-pocket cargos, articulated knees, and water-resistant finishes. Built for movement, styled for the street.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20wearing%20black%20technical%20cargo%20pants%20and%20black%20tee%2C%20dramatic%20directional%20lighting%2C%20minimalist%20concrete%20studio%2C%20monochrome%20palette%2C%20powerful%20stance%2C%20premium%20streetwear%20campaign%2C%20full%20body%20portrait%2C%20clean%20neutral%20gray%20background&width=800&height=1000&seq=603&orientation=portrait',
    reverse: false,
  },
  {
    id: 'caps',
    label: 'CAPS',
    sublabel: 'Logo / Dad / Structured',
    description:
      'Top it off. Structured builds, soft unstructured fits, and premium cotton twill. The final detail that pulls the look together.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20wearing%20black%20structured%20baseball%20cap%20and%20black%20streetwear%20hoodie%2C%20dramatic%20lighting%2C%20minimalist%20concrete%20studio%2C%20monochrome%20palette%2C%20confident%20head%20and%20shoulders%20pose%2C%20premium%20streetwear%20campaign%2C%20clean%20neutral%20gray%20background&width=800&height=1000&seq=604&orientation=portrait',
    reverse: true,
  },
];

export default function LookbookGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lb-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.lb-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-white">
      {/* Section Header */}
      <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto lb-reveal opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <span className="font-body text-sm italic text-gray-500 tracking-wide">
            The
          </span>
          <span className="font-grotesque text-sm font-bold text-arvox-black uppercase tracking-[0.15em] ml-2">
            Lookbook
          </span>
        </div>
      </div>

      {/* Category Rows */}
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          className={`lb-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col ${
            cat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Image */}
          <div className="w-full lg:w-[58%] h-[450px] md:h-[550px] lg:h-[650px] relative overflow-hidden group">
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
              <span className="font-grotesque text-xs font-bold text-white/40 tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-[42%] flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white">
            <div className="max-w-sm">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-arvox-black uppercase leading-[0.9] tracking-tight">
                {cat.label}
              </h2>
              <p className="font-body text-xs text-gray-400 uppercase tracking-[0.15em] mt-2">
                {cat.sublabel}
              </p>
              <div className="w-8 h-[1px] bg-gray-200 mt-4 mb-4" />
              <p className="font-body text-sm text-gray-500 leading-relaxed">
                {cat.description}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 mt-6 font-body text-xs font-semibold text-arvox-black uppercase tracking-[0.15em] group/link"
              >
                <span className="relative whitespace-nowrap">
                  Shop {cat.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-arvox-black origin-left scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
                </span>
                <span className="w-6 h-[1px] bg-arvox-black group-hover/link:w-10 transition-all duration-300" />
                <span className="text-arvox-black group-hover/link:translate-x-1 transition-transform duration-300">
                  <i className="ri-arrow-right-line" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Browse Link */}
      <div className="w-full h-[1px] bg-black/10" />
      <div className="flex justify-center py-12 md:py-16">
        <Link
          to="/shop"
          className="lb-reveal opacity-0 translate-y-4 transition-all duration-700 ease-out inline-flex items-center gap-3 font-body text-sm font-semibold text-arvox-black uppercase tracking-[0.15em] group"
        >
          <span className="relative whitespace-nowrap">
            Browse All Products
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-arvox-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
          </span>
          <span className="w-8 h-[1px] bg-arvox-black group-hover:w-12 transition-all duration-300" />
        </Link>
      </div>

      <style>{`
        .lb-reveal.lb-animate {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}