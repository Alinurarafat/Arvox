import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Button from '@/components/base/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const sectionRef = useScrollReveal<HTMLElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Registration will be available once Supabase is connected.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 md:pt-24">
        <section ref={sectionRef} className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-md mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-black text-arvox-black uppercase tracking-tight text-center mb-2 sr-reveal" data-sr-delay="0">
              Create Account
            </h1>
            <p className="font-body text-sm text-gray-500 text-center mb-10 sr-reveal" data-sr-delay="80">
              Join the community. Get 20% off your first order.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sr-reveal" data-sr-delay="160">
              <div>
                <label className="font-body text-xs font-semibold text-arvox-black uppercase tracking-wider block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full font-body text-sm text-arvox-black bg-arvox-offwhite px-4 py-3 outline-none border border-transparent focus:border-arvox-black transition-colors placeholder:text-gray-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="font-body text-xs font-semibold text-arvox-black uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full font-body text-sm text-arvox-black bg-arvox-offwhite px-4 py-3 outline-none border border-transparent focus:border-arvox-black transition-colors placeholder:text-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="font-body text-xs font-semibold text-arvox-black uppercase tracking-wider block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full font-body text-sm text-arvox-black bg-arvox-offwhite px-4 py-3 outline-none border border-transparent focus:border-arvox-black transition-colors placeholder:text-gray-400"
                  placeholder="Min 8 characters"
                />
              </div>

              <div>
                <label className="font-body text-xs font-semibold text-arvox-black uppercase tracking-wider block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full font-body text-sm text-arvox-black bg-arvox-offwhite px-4 py-3 outline-none border border-transparent focus:border-arvox-black transition-colors placeholder:text-gray-400"
                  placeholder="Confirm your password"
                />
              </div>

              <Button type="submit" variant="filled" className="w-full">
                Create Account
              </Button>
            </form>

            <p className="font-body text-sm text-gray-500 text-center mt-8 sr-reveal" data-sr-delay="240">
              Already have an account?{' '}
              <Link to="/login" className="text-arvox-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}