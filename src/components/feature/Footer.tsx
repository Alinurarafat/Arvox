import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-arvox-black relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Left Column - Brand Info */}
          <div className="lg:col-span-1">
            <img
              src="https://static.readdy.ai/image/bafdf1e3ebca2a851fad0ab0b8b41589/86253ad2f8517122eee58702dc175b97.png"
              alt="ARVOX"
              className="h-8 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="font-body text-xs text-gray-400 leading-relaxed mb-4">
              Built for the culture.<br />
              Next generation apparel.<br />
              Limited. Always.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <i className="ri-facebook-fill text-lg" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <i className="ri-instagram-line text-lg" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <i className="ri-tiktok-fill text-lg" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <i className="ri-pinterest-line text-lg" />
              </a>
            </div>
          </div>

          {/* Main Menu */}
          <div>
            <h4 className="font-grotesque text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Main Menu
            </h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'Catalog', 'Products'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Menu */}
          <div>
            <h4 className="font-grotesque text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Footer Menu
            </h4>
            <ul className="flex flex-col gap-3">
              {['Search', 'Account', 'Wishlist', 'Cart'].map((item) => (
                <li key={item}>
                  <span className="font-body text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-grotesque text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Policies
            </h4>
            <ul className="flex flex-col gap-3">
              {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <span className="font-body text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-grotesque text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Join Our Community
            </h4>
            <p className="font-body text-xs text-gray-400 mb-4">
              Exclusive drops. First access. 20% off your first order.
            </p>
            <form
              data-readdy-form
              id="footer-newsletter"
              action="https://readdy.ai/api/form/d81kk05imqud1mmjghng"
              method="POST"
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                fetch(form.action, {
                  method: 'POST',
                  body: new URLSearchParams(formData as never),
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }).then(() => {
                  setEmail('');
                  alert('Thanks for subscribing!');
                });
              }}
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full bg-transparent border-b border-gray-600 font-body text-xs text-white py-2 outline-none focus:border-white transition-colors placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="font-body text-xs font-semibold text-white uppercase tracking-[0.15em] border border-white px-4 py-2 mt-2 hover:bg-white hover:text-arvox-black transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-4 md:px-8 lg:px-12 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] text-gray-500">
            &copy; 2026 Arvox Space. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <i className="ri-visa-fill text-xl text-gray-500" />
            <i className="ri-mastercard-fill text-xl text-gray-500" />
            <i className="ri-paypal-fill text-xl text-gray-500" />
            <i className="ri-apple-fill text-xl text-gray-500" />
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <p className="font-grotesque text-[120px] md:text-[200px] font-bold text-gray-800/30 uppercase tracking-wider text-center leading-none pb-4">
          ARVOX&reg;
        </p>
      </div>
    </footer>
  );
}