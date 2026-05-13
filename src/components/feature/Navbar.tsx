import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const rafPending = useRef(false);

  const transparentNavRoutes = ['/', '/catalog'];
  const canBeTransparent = transparentNavRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 80);
        rafPending.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhiteNav = !canBeTransparent || isScrolled;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Products', href: '/shop' },
  ];

  const textColor = isWhiteNav ? 'text-arvox-black' : 'text-white';
  const bgClass = isWhiteNav
    ? 'bg-white/95 shadow-sm'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ease-out ${bgClass}`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl ${textColor} transition-colors duration-500`} />
          </button>

          {/* Nav Links - Desktop Left */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-500 ${
                  isWhiteNav
                    ? 'text-arvox-black hover:text-gray-500'
                    : 'text-white hover:text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="https://static.readdy.ai/image/bafdf1e3ebca2a851fad0ab0b8b41589/86253ad2f8517122eee58702dc175b97.png"
              alt="ARVOX"
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-500 ${
                isWhiteNav ? 'brightness-0' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Icons - Right */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-500 ${
                isWhiteNav ? 'hover:text-gray-500 text-arvox-black' : 'hover:text-white/70 text-white'
              }`}
            >
              <i className="ri-search-line text-lg" />
            </button>
            <Link
              to="/login"
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-500 ${
                isWhiteNav ? 'hover:text-gray-500 text-arvox-black' : 'hover:text-white/70 text-white'
              }`}
            >
              <i className="ri-user-line text-lg" />
            </Link>
            {/* Cart — desktop only */}
            <button
              onClick={() => setIsOpen(true)}
              className={`hidden md:flex w-8 h-8 items-center justify-center relative cursor-pointer transition-colors duration-500 ${
                isWhiteNav ? 'hover:text-gray-500 text-arvox-black' : 'hover:text-white/70 text-white'
              }`}
            >
              <i className="ri-shopping-bag-line text-lg" />
              {totalItems > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 text-[9px] font-bold flex items-center justify-center transition-colors duration-500 ${
                  isWhiteNav ? 'bg-arvox-black text-white' : 'bg-white text-arvox-black'
                }`}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className={`absolute top-full left-0 right-0 border-t px-4 md:px-8 lg:px-12 py-4 transition-colors duration-500 ${
          isWhiteNav ? 'bg-white border-gray-100' : 'bg-black/40 backdrop-blur-md border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            <i className={`ri-search-line ${isWhiteNav ? 'text-gray-400' : 'text-white/60'}`} />
            <input
              type="text"
              placeholder="Search products..."
              className={`flex-1 font-body text-sm outline-none bg-transparent placeholder:transition-colors placeholder:duration-500 ${
                isWhiteNav ? 'text-arvox-black placeholder:text-gray-400' : 'text-white placeholder:text-white/50'
              }`}
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)} className="cursor-pointer">
              <i className={`ri-close-line ${isWhiteNav ? 'text-arvox-black' : 'text-white'}`} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-4 py-6 transition-colors duration-500 ${
          isWhiteNav ? 'bg-white border-gray-100' : 'bg-black/60 backdrop-blur-md border-white/10'
        }`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-body text-sm font-semibold uppercase tracking-[0.15em] py-2 transition-colors duration-500 ${
                  isWhiteNav ? 'text-arvox-black' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOpen(true);
              }}
              className={`font-body text-sm font-semibold uppercase tracking-[0.15em] py-2 text-left cursor-pointer transition-colors duration-500 ${
                isWhiteNav ? 'text-arvox-black' : 'text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shopping-bag-line text-base" />
                </span>
                Bag
                {totalItems > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                    isWhiteNav ? 'bg-arvox-black text-white' : 'bg-white text-arvox-black'
                  }`}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}