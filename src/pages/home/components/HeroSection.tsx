import { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '@/mocks/heroSlides';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-arvox-black isolate">
      {/* Background Images */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={s.image}
            alt={s.line2}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Top edge fade for navbar readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-8 md:pb-14 lg:pb-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
            {/* Left: Massive Typography */}
            <div className="lg:max-w-[65%]">
              {/* Line 1 — Serif Italic */}
              <div
                key={`l1-${currentSlide}`}
                className="overflow-hidden"
              >
                <p
                  className="font-display italic text-white text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] leading-[0.85] tracking-tight animate-hero-line"
                  style={{ animationDelay: '0ms' }}
                >
                  {slide.line1}
                </p>
              </div>

              {/* Line 2 — Grotesque Bold Uppercase */}
              <div
                key={`l2-${currentSlide}`}
                className="overflow-hidden mt-1"
              >
                <p
                  className="font-grotesque font-bold text-white uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] leading-[0.9] tracking-[0.08em] animate-hero-line"
                  style={{ animationDelay: '100ms' }}
                >
                  {slide.line2}
                </p>
              </div>

              {/* Line 3 — Meta */}
              <div
                key={`l3-${currentSlide}`}
                className="overflow-hidden mt-4 md:mt-6"
              >
                <p
                  className="font-body text-white/60 uppercase text-[10px] sm:text-xs tracking-[0.3em] animate-hero-line"
                  style={{ animationDelay: '200ms' }}
                >
                  {slide.line3}
                </p>
              </div>

              {/* Divider + Subtext + CTA */}
              <div
                key={`cta-${currentSlide}`}
                className="mt-6 md:mt-8 animate-hero-fade"
                style={{ animationDelay: '400ms' }}
              >
                <div className="w-12 h-[1px] bg-white/40 mb-4" />
                <p className="font-body text-sm text-white/70 max-w-md leading-relaxed mb-6">
                  {slide.subtext}
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="font-body text-sm font-semibold text-white uppercase tracking-[0.15em] whitespace-nowrap">
                    {slide.cta}
                  </span>
                  <span className="w-8 h-[1px] bg-white/60 group-hover:w-14 transition-all duration-500" />
                  <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Floating Product Card */}
            <div
              key={`card-${currentSlide}`}
              className="hidden lg:block animate-hero-card"
              style={{ animationDelay: '500ms' }}
            >
              <a
                href={slide.featuredProduct.href}
                className="group flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 pr-6 hover:bg-white/15 transition-all duration-500"
              >
                <div className="w-16 h-20 overflow-hidden flex-shrink-0">
                  <img
                    src={slide.featuredProduct.image}
                    alt={slide.featuredProduct.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-body text-xs font-semibold text-white uppercase tracking-[0.1em]">
                    {slide.featuredProduct.name}
                  </span>
                  <span className="font-body text-xs text-white/50 mt-0.5">
                    ${slide.featuredProduct.price}
                  </span>
                  <span className="font-body text-[10px] text-white/40 uppercase tracking-[0.15em] mt-2 flex items-center gap-1">
                    View
                    <i className="ri-arrow-right-line text-[10px]" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="max-w-7xl mx-auto w-full mt-8 md:mt-12 flex items-center justify-between">
          {/* Slide Counter */}
          <div className="flex items-center gap-3">
            <span className="font-grotesque text-xs font-bold text-white tracking-wider">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="w-6 h-[1px] bg-white/30" />
            <span className="font-grotesque text-xs text-white/40 tracking-wider">
              {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Progress Line */}
          <div className="flex-1 mx-6 md:mx-10 max-w-md">
            <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-700 ease-out"
                style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <i className="ri-arrow-left-s-line text-lg" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <i className="ri-arrow-right-s-line text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes heroLineReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroCardSlide {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-hero-line {
          animation: heroLineReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-hero-fade {
          animation: heroFadeIn 0.7s ease-out both;
        }
        .animate-hero-card {
          animation: heroCardSlide 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}