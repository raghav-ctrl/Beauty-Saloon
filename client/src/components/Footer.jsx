import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer class="bg-stone-900 text-gray-400 pt-16 pb-12 mt-auto border-t border-stone-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div class="space-y-4">
            <Link to="/" class="flex items-center space-x-2">
              <div class="bg-primary text-white p-2 rounded-full flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <span class="font-serif text-xl font-bold tracking-tight text-white">
                GlowSpot
              </span>
            </Link>
            <p class="text-sm text-gray-500 font-light leading-relaxed">
              Hyderabad's premium beauty salon marketplace. Connecting you with elite grooming artists, beauty bars, and soothing spa treatments at home or in-store.
            </p>
            <div class="flex space-x-4 pt-2">
              <a href="#" class="text-gray-500 hover:text-primary transition-premium" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary transition-premium" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-primary transition-premium" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 class="text-white font-serif font-semibold text-base mb-4 tracking-wide">Popular Services</h3>
            <ul class="space-y-2.5 text-sm font-light">
              <li><Link to="/listing" class="hover:text-white transition-premium">Bridal Makeup Packages</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Hair Balayage & Styling</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Detox Ayurvedic Spa</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Men's Fade & Beard Sculpting</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">At-Home Facial Care</Link></li>
            </ul>
          </div>

          {/* Areas Covered */}
          <div>
            <h3 class="text-white font-serif font-semibold text-base mb-4 tracking-wide">Neighborhoods</h3>
            <ul class="space-y-2.5 text-sm font-light">
              <li><Link to="/listing" class="hover:text-white transition-premium">Jubilee Hills</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Banjara Hills</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Gachibowli Tech District</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Hitech City</Link></li>
              <li><Link to="/listing" class="hover:text-white transition-premium">Madhapur Hub</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div class="space-y-4">
            <h3 class="text-white font-serif font-semibold text-base mb-4 tracking-wide">Glow Updates</h3>
            <p class="text-xs text-gray-500 font-light">
              Subscribe to unlock 15% discount on your first booking & get seasonal hair care tips.
            </p>
            <form onSubmit={handleSubscribe} class="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                class="w-full bg-stone-800 text-stone-200 border border-stone-700 focus:border-primary focus:outline-none rounded-xl py-2.5 pl-4 pr-10 text-xs font-light transition-premium"
              />
              <button
                type="submit"
                class="absolute right-1 top-1 bottom-1 bg-primary hover:bg-primary-dark text-white rounded-lg px-3 transition-premium flex items-center justify-center"
              >
                <Send size={12} />
              </button>
            </form>
            {subscribed && (
              <span class="text-xs text-green-400 block animate-fade-in-up">
                🎉 Welcome! Check your inbox for your 15% code.
              </span>
            )}
            
            <div class="space-y-2 pt-2 text-xs font-light text-gray-500">
              <div class="flex items-center space-x-2">
                <MapPin size={12} class="text-rose-500" />
                <span>Road No. 36, Jubilee Hills, Hyderabad</span>
              </div>
              <div class="flex items-center space-x-2">
                <Phone size={12} class="text-rose-500" />
                <span>+91 40 4992 8820</span>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light">
          <span>&copy; {new Date().getFullYear()} GlowSpot Hyderabad. All rights reserved.</span>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-gray-400 transition-premium">Terms of Service</a>
            <a href="#" class="hover:text-gray-400 transition-premium">Privacy Policy</a>
            <a href="#" class="hover:text-gray-400 transition-premium">Refund & Cancellations</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
