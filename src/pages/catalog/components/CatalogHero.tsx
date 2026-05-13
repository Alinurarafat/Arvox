export default function CatalogHero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-arvox-black isolate flex flex-col lg:flex-row">
      {/* Image Panel */}
      <div className="relative w-full lg:w-[55%] h-[55vh] sm:h-[60vh] lg:h-full order-1 lg:order-2 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=Editorial%20fashion%20photography%20of%20young%20male%20model%20in%20three-quarter%20profile%20pose%20wearing%20all-black%20oversized%20streetwear%20hoodie%20and%20technical%20cargo%20pants%2C%20dramatic%20Rembrandt%20lighting%20with%20deep%20facial%20shadows%2C%20standing%20confidently%20in%20minimalist%20concrete%20studio%20with%20gray%20walls%2C%20monochrome%20dark%20palette%2C%20premium%20fashion%20magazine%20campaign%2C%20cinematic%20composition%2C%20full%20body%20portrait%2C%20sharp%20fabric%20texture%20detail%2C%20moody%20atmospheric%20lighting%2C%20clean%20neutral%20background&width=900&height=1200&seq=650&orientation=portrait"
          alt="Arvox Catalog 2026"
          className="w-full h-full object-cover object-top"
        />
        {/* Mobile gradient: image fades into text panel */}
        <div className="absolute inset-0 bg-gradient-to-t from-arvox-black via-arvox-black/30 to-transparent lg:hidden" />
        {/* Desktop left edge blend into text panel */}
        <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-40 bg-gradient-to-r from-arvox-black to-transparent" />
      </div>

      {/* Text Panel */}
      <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-between px-6 md:px-10 lg:px-14 xl:px-20 py-8 md:py-12 lg:py-16 bg-arvox-black order-2 lg:order-1">
        {/* Top: Season Label */}
        <div className="overflow-hidden">
          <p className="font-body text-white/40 uppercase text-[10px] md:text-xs tracking-[0.35em] animate-cat-line">
            ARVOX SPACE — Season 01
          </p>
        </div>

        {/* Center: Main Typography */}
        <div className="flex-1 flex flex-col justify-center mt-6 lg:mt-0">
          <div className="overflow-hidden">
            <h1
              className="font-grotesque font-bold text-white uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[100px] leading-[0.85] tracking-[0.06em] animate-cat-line"
              style={{ animationDelay: '100ms' }}
            >
              CATALOG
            </h1>
          </div>
          <div className="overflow-hidden mt-1">
            <p
              className="font-display italic text-white/25 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-cat-line"
              style={{ animationDelay: '200ms' }}
            >
              2026
            </p>
          </div>

          {/* Editorial Note */}
          <div
            className="mt-6 md:mt-8 max-w-sm animate-cat-fade"
            style={{ animationDelay: '400ms' }}
          >
            <div className="w-10 h-[1px] bg-white/25 mb-4" />
            <p className="font-body text-xs md:text-sm text-white/45 leading-[1.7]">
              The complete seasonal lookbook. Every piece, every fit, every
              detail. Shot in-studio with no filters and no compromises. This
              is Arvox Space.
            </p>
          </div>

          {/* Model Credits */}
          <div
            className="mt-6 md:mt-8 animate-cat-fade"
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex flex-wrap gap-x-5 md:gap-x-6 gap-y-1">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
                Model
                <span className="text-white/60 ml-1">A. Rivera</span>
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
                Photo
                <span className="text-white/60 ml-1">Studio Arvox</span>
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30">
                Style
                <span className="text-white/60 ml-1">M. Chen</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Scroll Cue */}
        <div
          className="mt-6 lg:mt-0 animate-cat-fade"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-white/25" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/30">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes catLineReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes catFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-cat-line {
          animation: catLineReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-cat-fade {
          animation: catFadeIn 0.7s ease-out both;
        }
      `}</style>
    </section>
  );
}