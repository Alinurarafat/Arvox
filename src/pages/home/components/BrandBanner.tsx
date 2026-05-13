import { useRef, useEffect } from 'react';

const manifestoPoints = [
  {
    number: '01',
    title: 'PREMIUM QUALITY',
    description: 'Every garment is crafted from heavyweight fabrics with reinforced stitching. Built to last, not to landfill.',
  },
  {
    number: '02',
    title: 'CULTURE FIRST',
    description: 'Designed by the culture, for the culture. Every drop is shaped by the voices that matter most.',
  },
  {
    number: '03',
    title: 'LIMITED RUNS',
    description: 'Small batch production. Once a drop sells out, it is gone. No restocks. No compromises.',
  },
];

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-arvox-offwhite overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row">
        {/* Left: Editorial Image */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-auto lg:min-h-[700px] relative overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20two%20young%20diverse%20models%20wearing%20oversized%20black%20streetwear%20hoodies%20and%20caps%2C%20standing%20confidently%20in%20a%20minimalist%20concrete%20studio%20with%20soft%20natural%20light%2C%20monochrome%20palette%20with%20high%20contrast%20shadows%2C%20premium%20apparel%20brand%20campaign%20aesthetic%2C%20clean%20simple%20gray%20background%2C%20sharp%20focus%20on%20fabric%20texture%20and%20silhouette&width=700&height=900&seq=manifesto-1&orientation=portrait"
            alt="Arvox Space editorial"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <span className="font-body text-[10px] md:text-xs text-white/70 uppercase tracking-[0.25em]">
              SPRING / SUMMER 2026
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          {/* Section Label */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out mb-8 md:mb-12">
            <span className="font-body text-sm md:text-base italic text-gray-500 tracking-wide">Our</span>
            <span className="font-grotesque text-sm md:text-base font-bold text-arvox-black uppercase tracking-[0.15em] ml-2">
              MANIFESTO
            </span>
          </div>

          {/* Headline */}
          <h2 className="reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-arvox-black uppercase leading-[0.95] tracking-tight mb-8 md:mb-10">
            Built for
            <br />
            the culture.
          </h2>

          {/* Divider */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out delay-150 w-16 h-[1px] bg-arvox-black mb-8 md:mb-10" />

          {/* Description */}
          <p className="reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 font-body text-sm md:text-base text-gray-600 leading-relaxed max-w-md mb-12 md:mb-16">
            Arvox Space is more than apparel — it is a uniform for the next generation. Every piece is designed
            with intention, produced in limited quantities, and released exclusively to our community.
            Your season starts here.
          </p>

          {/* Three Pillars */}
          <div className="space-y-8 md:space-y-10">
            {manifestoPoints.map((point, i) => (
              <div
                key={point.number}
                className={`reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${250 + i * 100}ms` }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-grotesque text-xs md:text-sm font-bold text-gray-300 tracking-wider shrink-0 mt-1">
                    {point.number}
                  </span>
                  <div>
                    <h3 className="font-grotesque text-sm md:text-base font-bold text-arvox-black uppercase tracking-[0.1em] mb-1">
                      {point.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-gray-500 leading-relaxed max-w-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 ease-out delay-500 mt-12 md:mt-16">
            <a
              href="/catalog"
              className="inline-flex items-center gap-3 font-body text-sm font-semibold text-arvox-black uppercase tracking-[0.15em] group"
            >
              <span className="relative">
                Explore the Collection
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-arvox-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
              </span>
              <span className="w-8 h-[1px] bg-arvox-black group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* CSS for reveal animation */}
      <style>{`
        .reveal-item.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}