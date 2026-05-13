import { useLocation, Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function NotFound() {
  const location = useLocation();
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4" ref={sectionRef}>
        <div className="text-center sr-reveal" data-sr-delay="0">
          <span className="font-grotesque text-[100px] md:text-[160px] font-black text-arvox-black/5 uppercase leading-none select-none">
            404
          </span>
        </div>
        <div className="text-center -mt-8 md:-mt-12 relative z-10 sr-reveal" data-sr-delay="100">
          <h1 className="font-display text-2xl md:text-3xl font-black text-arvox-black uppercase tracking-tight">
            Page Not Found
          </h1>
          <p className="font-body text-sm text-gray-400 mt-3 max-w-xs mx-auto">
            {location.pathname}
          </p>
          <p className="font-body text-sm text-gray-500 mt-4">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-arvox-black text-white font-body text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Back to Home
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}