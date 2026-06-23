import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, MapPin, SlidersHorizontal, Search, RotateCcw, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { HYDERABAD_AREAS } from '../data/mockData';

export default function Listing() {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const { salons } = useBooking();

  // Search & Filter States
  const [searchName, setSearchName] = useState(locationState?.query || '');
  const [selectedArea, setSelectedArea] = useState(locationState?.area || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedPriceTier, setSelectedPriceTier] = useState('');
  
  // Sort State
  const [sortBy, setSortBy] = useState('rating'); // rating, distance, price_asc, price_desc

  // Mobile Filter Panel Toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if coming from Home page search redirect
  useEffect(() => {
    if (locationState) {
      if (locationState.query) setSearchName(locationState.query);
      if (locationState.area) setSelectedArea(locationState.area);
    }
  }, [locationState]);

  // Filtering Logic
  const filteredSalons = salons.filter(salon => {
    // Search Name or Service match
    const nameMatch = salon.name.toLowerCase().includes(searchName.toLowerCase());
    const serviceMatch = salon.services.some(srv => 
      srv.name.toLowerCase().includes(searchName.toLowerCase()) || 
      srv.category.toLowerCase().includes(searchName.toLowerCase())
    );
    const searchMatch = !searchName || nameMatch || serviceMatch;

    // Area Match
    const areaMatch = !selectedArea || salon.area === selectedArea;

    // Category Match (check if salon has services of this category)
    const categoryMatch = !selectedCategory || salon.services.some(srv => srv.category === selectedCategory);

    // Rating Match
    const ratingThreshold = selectedRating ? parseFloat(selectedRating) : 0;
    const ratingMatch = salon.rating >= ratingThreshold;

    // Price Tier Match
    const priceMatch = !selectedPriceTier || salon.priceTier === selectedPriceTier;

    return searchMatch && areaMatch && categoryMatch && ratingMatch && priceMatch;
  });

  // Sorting Logic
  const sortedSalons = [...filteredSalons].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'distance') {
      const distA = parseFloat(a.distance.split(' ')[0]);
      const distB = parseFloat(b.distance.split(' ')[0]);
      return distA - distB;
    }
    if (sortBy === 'price_asc') {
      return a.priceTier.length - b.priceTier.length;
    }
    if (sortBy === 'price_desc') {
      return b.priceTier.length - a.priceTier.length;
    }
    return 0;
  });

  const resetFilters = () => {
    setSearchName('');
    setSelectedArea('');
    setSelectedCategory('');
    setSelectedRating('');
    setSelectedPriceTier('');
    setSortBy('rating');
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Page Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-down">
        <div>
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">Explore Partner Salons</h1>
          <p class="text-xs text-gray-500 font-light mt-1">Found {sortedSalons.length} beauty partners matching your search in Hyderabad</p>
        </div>

        {/* Global Search Input in Header */}
        <div class="flex items-center space-x-2 w-full md:w-auto relative">
          <div class="relative w-full md:w-72">
            <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search salon or service..."
              class="w-full bg-white border border-rose-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 rounded-xl py-2 pl-10 pr-4 text-xs font-light shadow-sm transition-premium"
            />
          </div>
          
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            class="md:hidden bg-primary text-white p-2.5 rounded-xl flex items-center justify-center shadow-md transition-premium hover:bg-primary-dark"
            aria-label="Toggle Filters"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div class="flex gap-8 relative items-start">
        
        {/* LEFT SIDEBAR - FILTERS (Desktop) */}
        <aside class="hidden md:block w-64 bg-white border border-rose-100/50 rounded-2xl p-6 shadow-sm space-y-6 sticky top-28 shrink-0 animate-scale-in">
          <div class="flex justify-between items-center pb-4 border-b border-stone-100">
            <span class="font-serif font-bold text-base text-gray-900 flex items-center gap-1.5">
              <SlidersHorizontal size={16} class="text-primary animate-pulse" /> Filter Options
            </span>
            <button 
              onClick={resetFilters}
              class="text-[10px] text-gray-400 hover:text-primary transition-premium flex items-center gap-0.5"
            >
              <RotateCcw size={10} /> Reset
            </button>
          </div>

          {/* Area Filter */}
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block">Neighborhood</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs font-light cursor-pointer text-gray-700 transition-premium"
            >
              <option value="">All Hyderabad Areas</option>
              {HYDERABAD_AREAS.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Service Category Filter */}
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block">Service Specialty</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs font-light cursor-pointer text-gray-700 transition-premium"
            >
              <option value="">All Specialties</option>
              <option value="hair">Haircut & Styling</option>
              <option value="skin">Skincare & Facial</option>
              <option value="bridal">Bridal & Makeup</option>
              <option value="spa">Spa & Wellness</option>
              <option value="grooming">Men's Grooming</option>
              <option value="home">Home Services</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block">Price Category</label>
            <div class="flex gap-2">
              {["₹", "₹₹", "₹₹₹"].map((tier, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPriceTier(selectedPriceTier === tier ? '' : tier)}
                  class={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-premium shadow-sm hover:scale-105 ${
                    selectedPriceTier === tier
                      ? 'bg-primary text-white border-primary glow-rose'
                      : 'bg-stone-50 text-gray-600 border-stone-200 hover:border-primary/30'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block">Rating Level</label>
            <div class="space-y-2">
              {[
                { label: "All Ratings", value: "" },
                { label: "4.8★ & Above", value: "4.8" },
                { label: "4.5★ & Above", value: "4.5" }
              ].map((rate, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRating(rate.value)}
                  class={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-premium ${
                    selectedRating === rate.value
                      ? 'bg-rose-50 text-primary font-semibold border border-primary/20 shadow-sm'
                      : 'text-gray-600 hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  {rate.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MOBILE FILTER DRAWER overlay */}
        {showMobileFilters && (
          <div class="fixed inset-0 bg-stone-900/60 z-50 flex justify-end md:hidden animate-fade-in">
            <div class="bg-white w-72 h-full p-6 shadow-2xl space-y-6 overflow-y-auto flex flex-col justify-between animate-slide-in-right">
              <div class="space-y-6">
                <div class="flex justify-between items-center pb-4 border-b border-stone-100">
                  <span class="font-serif font-bold text-base text-gray-900">Filters</span>
                  <button onClick={() => setShowMobileFilters(false)} class="text-gray-400 hover:text-gray-800 text-xs">Close</button>
                </div>

                {/* Mobile Area Filter */}
                <div class="space-y-2">
                  <label class="text-xs font-bold text-gray-700 block">Neighborhood</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2.5 px-3 text-xs"
                  >
                    <option value="">All Hyderabad Areas</option>
                    {HYDERABAD_AREAS.map((area, idx) => (
                      <option key={idx} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Service Filter */}
                <div class="space-y-2">
                  <label class="text-xs font-bold text-gray-700 block">Specialty</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2.5 px-3 text-xs"
                  >
                    <option value="">All Services</option>
                    <option value="hair">Haircut & Styling</option>
                    <option value="skin">Skincare & Facial</option>
                    <option value="bridal">Bridal & Makeup</option>
                    <option value="spa">Spa & Wellness</option>
                    <option value="grooming">Men's Grooming</option>
                    <option value="home">Home Services</option>
                  </select>
                </div>

                {/* Mobile Price Filter */}
                <div class="space-y-2">
                  <label class="text-xs font-bold text-gray-700 block">Price Range</label>
                  <div class="flex gap-2">
                    {["₹", "₹₹", "₹₹₹"].map((tier, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedPriceTier(selectedPriceTier === tier ? '' : tier)}
                        class={`flex-1 py-2 rounded-xl border text-xs font-semibold ${
                          selectedPriceTier === tier
                            ? 'bg-primary text-white border-primary'
                            : 'bg-stone-50 text-gray-600 border-stone-200'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Rating Filter */}
                <div class="space-y-2">
                  <label class="text-xs font-bold text-gray-700 block">Rating</label>
                  <div class="space-y-2">
                    {[
                      { label: "All Ratings", value: "" },
                      { label: "4.8★ & Above", value: "4.8" },
                      { label: "4.5★ & Above", value: "4.5" }
                    ].map((rate, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedRating(rate.value)}
                        class={`w-full text-left py-2 px-3 rounded-xl text-xs ${
                          selectedRating === rate.value ? 'bg-rose-50 text-primary font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {rate.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 border-t border-stone-100">
                <button
                  onClick={() => { resetFilters(); setShowMobileFilters(false); }}
                  class="flex-1 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-premium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  class="flex-1 bg-primary text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-primary-dark transition-premium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL - CARD LISTINGS */}
        <div class="flex-grow space-y-6">
          
          {/* Sorting panel */}
          <div class="bg-white border border-rose-100/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 animate-fade-in-down">
            <span class="text-xs font-light text-gray-400">Showing {sortedSalons.length} results in Hyderabad</span>
            
            <div class="flex items-center space-x-2.5 w-full sm:w-auto">
              <ArrowUpDown size={14} class="text-gray-400" />
              <span class="text-xs text-gray-600 font-light">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                class="bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-1.5 px-3 text-xs font-light cursor-pointer text-gray-700 transition-premium"
              >
                <option value="rating">Top Rated ⭐</option>
                <option value="distance">Nearest Distance 📍</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {sortedSalons.length > 0 ? (
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sortedSalons.map((salon, idx) => (
                <div
                  key={salon.id}
                  class="opacity-0 animate-scale-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div
                    onClick={() => navigate(`/detail/${salon.id}`)}
                    class={`bg-white rounded-2xl border border-rose-100/30 overflow-hidden shadow-sm transition-premium cursor-pointer group flex flex-col h-full floating-card-${(idx % 4) + 1}`}
                  >
                    <div class="relative h-48 overflow-hidden bg-stone-100">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-premium duration-500"
                        loading="lazy"
                      />
                      <div class="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-800 shadow-sm flex items-center space-x-1">
                        <Star size={10} class="text-amber-500 fill-amber-500 animate-pulse" />
                        <span>{salon.rating}</span>
                      </div>
                      <div class="absolute top-3.5 right-3.5 bg-primary text-white text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider">
                        {salon.area}
                      </div>
                    </div>

                    <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div class="space-y-2">
                        <div class="flex justify-between items-start">
                          <h3 class="font-serif font-bold text-base text-gray-900 group-hover:text-primary transition-premium leading-snug">
                            {salon.name}
                          </h3>
                          <span class="text-[11px] font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded ml-2 shrink-0">
                            {salon.priceTier}
                          </span>
                        </div>
                        <p class="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed">
                          {salon.about}
                        </p>
                      </div>

                      <div class="flex flex-wrap gap-1.5">
                        {salon.services.slice(0, 3).map((srv, idx) => (
                          <span key={idx} class="bg-stone-50 border border-stone-100 text-gray-500 text-[9px] py-0.5 px-2 rounded font-light">
                            {srv.name}
                          </span>
                        ))}
                      </div>

                      <div class="pt-3 border-t border-stone-50 flex justify-between items-center text-[11px] font-medium">
                        <span class="text-gray-400 flex items-center">
                          <MapPin size={11} class="mr-1 text-primary animate-bounce-soft" /> {salon.distance}
                        </span>
                        <span class={`px-2.5 py-0.5 rounded-full font-semibold text-[9px] uppercase tracking-wide ${
                          salon.availabilityType === 'limited'
                            ? 'text-amber-600 bg-amber-50'
                            : salon.availabilityType === 'tomorrow'
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-emerald-600 bg-emerald-50'
                        }`}>
                          {salon.availabilityBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div class="bg-white border border-rose-100/30 rounded-2xl p-16 text-center space-y-6 shadow-sm animate-fade-in-up">
              <div class="bg-rose-50 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Search size={28} />
              </div>
              <div class="space-y-2">
                <h3 class="font-serif font-bold text-lg text-gray-800">No partner salons found</h3>
                <p class="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
                  We couldn't find any salons matching those filters. Try broadening your location area or resetting categories.
                </p>
              </div>
              <button
                onClick={resetFilters}
                class="bg-primary hover:bg-primary-dark text-white rounded-full py-2 px-6 text-xs font-semibold transition-premium"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
