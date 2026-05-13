import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function EmailCommunity() {
  const [email, setEmail] = useState('');
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6 sr-reveal" data-sr-delay="0">
          <i className="ri-mail-line text-3xl text-arvox-black" />
        </div>

        <h2 className="font-grotesque text-2xl md:text-3xl font-bold text-arvox-black uppercase tracking-wider mb-3 sr-reveal" data-sr-delay="80">
          Join Our Community!
        </h2>
        <p className="font-body text-sm text-gray-500 leading-relaxed mb-8 sr-reveal" data-sr-delay="160">
          Get exclusive access to new drops, limited releases, and members-only sales.
          Plus 20% off your first order when you sign up.
        </p>

        <form
          data-readdy-form
          id="newsletter-community"
          action="https://readdy.ai/api/form/d81kk05imqud1mmjghng"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto sr-reveal"
          data-sr-delay="240"
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
              alert('Welcome to the community! Check your inbox for 20% off.');
            });
          }}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 font-body text-sm text-arvox-black bg-arvox-offwhite px-5 py-3 outline-none border border-transparent focus:border-arvox-black transition-colors placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-arvox-black text-white font-body text-sm font-semibold uppercase tracking-[0.15em] px-8 py-3 hover:bg-gray-800 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}