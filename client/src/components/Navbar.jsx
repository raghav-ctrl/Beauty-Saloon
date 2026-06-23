import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, User, Menu, X, LayoutDashboard, Compass } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const { loyaltyPoints } = useBooking();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Determine loyalty level
  const getLoyaltyTier = (pts) => {
    if (pts >= 1000) return { name: "Gold Tier", color: "from-amber-400 to-yellow-600 text-white" };
    if (pts >= 500) return { name: "Silver Tier", color: "from-slate-300 to-slate-400 text-gray-800" };
    return { name: "Bronze Tier", color: "from-amber-700 to-amber-900 text-white" };
  };

  const tier = getLoyaltyTier(loyaltyPoints);

  return (
    <nav class="sticky top-0 z-50 glass-premium border-b border-rose-100/40 shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          {/* Logo & Tagline */}
          <div class="flex items-center">
            <Link to="/" class="flex items-center space-x-2 group">
              <div class="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-full transition-premium group-hover:rotate-12 duration-300 flex items-center justify-center shadow-md">
                <Sparkles size={22} class="animate-pulse" />
              </div>
              <div class="flex flex-col">
                <span class="font-serif text-2xl font-bold tracking-tight text-rose-gradient group-hover:opacity-90 transition-opacity">
                  GlowSpot
                </span>
                <span class="text-[9px] tracking-[0.15em] uppercase font-semibold text-gray-400 -mt-1 font-sans">
                  Hyderabad
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center space-x-8">
            <Link
              to="/listing"
              class={`flex items-center space-x-1.5 text-sm font-medium transition-premium hover:scale-105 ${
                isActive('/listing')
                  ? 'text-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Compass size={16} class="group-hover:rotate-6 transition-transform" />
              <span>Explore Salons</span>
            </Link>
            
            <Link
              to="/profile"
              class={`flex items-center space-x-1.5 text-sm font-medium transition-premium hover:scale-105 ${
                isActive('/profile')
                  ? 'text-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Calendar size={16} />
              <span>My Bookings</span>
            </Link>

            <Link
              to="/admin"
              class={`flex items-center space-x-1.5 text-sm font-medium transition-premium hover:scale-105 ${
                isActive('/admin')
                  ? 'text-primary font-semibold'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Admin Desk</span>
            </Link>

            {/* Loyalty points card */}
            <div class="flex items-center space-x-2 pl-4 border-l border-rose-100">
              <Link 
                to="/profile"
                class="flex items-center space-x-2 bg-gradient-to-r from-rose-50 to-pink-50 px-3.5 py-1.5 rounded-full border border-rose-100/50 transition-premium hover:shadow-md hover:scale-105 hover:border-primary/20 duration-300"
              >
                <div class={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${tier.color} shadow-sm uppercase tracking-wider`}>
                  {tier.name}
                </div>
                <div class="flex items-center text-xs font-semibold text-primary">
                  <span class="mr-1 animate-pulse">✨</span>
                  <span>{loyaltyPoints} Pts</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div class="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="text-gray-500 hover:text-primary p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div class="md:hidden glass-effect border-b border-rose-100 absolute top-full left-0 w-full animate-slide-in-right px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            to="/listing"
            onClick={() => setMobileMenuOpen(false)}
            class={`flex items-center space-x-3 p-3 rounded-xl transition-premium ${
              isActive('/listing') ? 'bg-primary-50 text-primary font-semibold' : 'text-gray-700 hover:bg-rose-50'
            }`}
          >
            <Compass size={20} />
            <span>Explore Salons</span>
          </Link>
          
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            class={`flex items-center space-x-3 p-3 rounded-xl transition-premium ${
              isActive('/profile') ? 'bg-primary-50 text-primary font-semibold' : 'text-gray-700 hover:bg-rose-50'
            }`}
          >
            <Calendar size={20} />
            <span>My Bookings</span>
          </Link>

          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            class={`flex items-center space-x-3 p-3 rounded-xl transition-premium ${
              isActive('/admin') ? 'bg-primary-50 text-primary font-semibold' : 'text-gray-700 hover:bg-rose-50'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Admin Desk</span>
          </Link>

          {/* Loyalty Level display in mobile */}
          <div class="p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100/50 flex justify-between items-center">
            <span class="text-xs font-semibold text-gray-500">Your loyalty points:</span>
            <div class="flex items-center space-x-2">
              <span class={`text-[9px] font-bold px-2 py-0.5 rounded bg-gradient-to-r ${tier.color} uppercase tracking-wider`}>
                {tier.name}
              </span>
              <span class="text-sm font-bold text-primary">✨ {loyaltyPoints} Pts</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
