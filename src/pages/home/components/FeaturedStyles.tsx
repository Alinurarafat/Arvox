import { useRef, useEffect } from 'react';

const editorialImages = [
  {
    id: 'women',
    label: 'WOMEN',
    sublabel: 'SEASON 2026',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20woman%20wearing%20oversized%20black%20streetwear%20hoodie%20and%20relaxed%20fit%20pants%2C%20minimalist%20concrete%20studio%20with%20dramatic%20directional%20light%2C%20monochrome%20palette%2C%20powerful%20stance%2C%20premium%20fashion%20campaign%2C%20high%20contrast%20shadows%2C%20full%20body%20shot%2C%20clean%20simple%20background&width=700&height=950&seq=edit-501&orientation=portrait',
    number: '01',
  },
  {
    id: 'bestselling',
    label: 'BESTSELLING',
    sublabel: 'THE ESSENTIALS',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20man%20wearing%20premium%20black%20oversized%20t-shirt%20and%20dark%20denim%2C%20minimalist%20studio%20with%20single%20soft%20light%20source%2C%20monochrome%20palette%2C%20confident%20pose%2C%20premium%20streetwear%20campaign%2C%20half%20body%20shot%2C%20clean%20neutral%20background%2C%20sharp%20fabric%20detail&width=900&height=600&seq=edit-502&orientation=landscape',
    number: '02',
  },
  {
    id: 'men',
    label: 'MEN',
    sublabel: 'NEW ARRIVALS',
    image: 'https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20man%20wearing%20black%20heavyweight%20hoodie%20and%20matching%20black%20cargo%20pants%2C%20minimalist%20concrete%20studio%20with%20harsh%20directional%20light%2C%20monochrome%20palette%2C%20powerful%20editorial%20stance%2C%20premium%20fashion%20campaign%2C%20full%20body%20shot%2C%20clean%20simple%20gray%20background%2C%20high%20contrast&width=700&height=950&seq=edit-503&orientation=portrait',
    number: '03',
  },
];

export default function FeaturedStyles() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fs-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fs-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white overflow-hidden">
      {/* Top Border Line */}
      <div className="w-full h-[1px] bg-black/10" />

      {/* Section Header */}
      <div className="px-4 md:px-8 lg:px-12 py-10 md:py-14">
        <div className="fs-reveal opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <span className="font-body text-sm italic text-gray-500 tracking-wide">Featured</span>
          <span className="font-grotesque text-sm font-bold text-arvox-black uppercase tracking-[0.15em] ml-2">
            Styles
          </span>
        </div>
      </div>

      {/* Editorial Grid — Full Width, 2 rows on desktop */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-[1px] bg-black/10">
        {/* Left Tall Image — spans 5 columns and 2 rows */}
        <a
          href="/shop"
          className="fs-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out delay-100 lg:col-span-5 lg:row-span-2 relative block overflow-hidden group"
        >
          <img
            src={editorialImages[0].image}
            alt={editorialImages[0].label}
            className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Number + Label */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10">
            <span className="font-grotesque text-xs font-bold text-white/40 tracking-[0.2em]">
              {editorialImages[0].number}
            </span>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6">
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-[0.9] tracking-tight">
              {editorialImages[0].label}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <span className="font-body text-xs text-white/60 uppercase tracking-[0.2em]">
                {editorialImages[0].sublabel}
              </span>
              <span className="w-8 h-[1px] bg-white/40" />
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-grotesque text-xl text-white/80">&rarr;</span>
          </div>
        </a>

        {/* Top Right Image — 7 columns, row 1 */}
        <a
          href="/shop"
          className="fs-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 lg:col-span-7 relative block overflow-hidden group"
          style={{ minHeight: '280px' }}
        >
          <img
            src={editorialImages[1].image}
            alt={editorialImages[1].label}
            className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute top-5 left-5 md:top-8 md:left-8">
            <span className="font-grotesque text-xs font-bold text-white/40 tracking-[0.2em]">
              {editorialImages[1].number}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 right-5">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase leading-[0.9] tracking-tight">
              {editorialImages[1].label}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-body text-[11px] text-white/60 uppercase tracking-[0.2em]">
                {editorialImages[1].sublabel}
              </span>
              <span className="w-6 h-[1px] bg-white/40" />
            </div>
          </div>

          <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-grotesque text-xl text-white/80">&rarr;</span>
          </div>
        </a>

        {/* Bottom Right Image — 7 columns, row 2 */}
        <a
          href="/shop"
          className="fs-reveal opacity-0 translate-y-6 transition-all duration-700 ease-out delay-300 lg:col-span-7 relative block overflow-hidden group"
          style={{ minHeight: '280px' }}
        >
          <img
            src={editorialImages[2].image}
            alt={editorialImages[2].label}
            className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute top-5 left-5 md:top-8 md:left-8">
            <span className="font-grotesque text-xs font-bold text-white/40 tracking-[0.2em]">
              {editorialImages[2].number}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 right-5">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase leading-[0.9] tracking-tight">
              {editorialImages[2].label}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-body text-[11px] text-white/60 uppercase tracking-[0.2em]">
                {editorialImages[2].sublabel}
              </span>
              <span className="w-6 h-[1px] bg-white/40" />
            </div>
          </div>

          <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-grotesque text-xl text-white/80">&rarr;</span>
          </div>
        </a>
      </div>

      {/* Bottom Border + Browse All */}
      <div className="w-full h-[1px] bg-black/10" />
      <div className="flex justify-center py-10 md:py-14">
        <a
          href="/shop"
          className="fs-reveal opacity-0 translate-y-4 transition-all duration-700 ease-out inline-flex items-center gap-3 font-body text-sm font-semibold text-arvox-black uppercase tracking-[0.15em] group"
        >
          <span className="relative">
            Browse All Styles
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-arvox-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
          </span>
          <span className="w-8 h-[1px] bg-arvox-black group-hover:w-12 transition-all duration-300" />
        </a>
      </div>

      <style>{`
        .fs-reveal.fs-animate {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}