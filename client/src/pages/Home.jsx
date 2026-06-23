import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Scissors, Sparkles, Compass, UserCheck, Home as HomeIcon, Star, CheckCircle, ArrowRight, Quote } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CATEGORIES, HYDERABAD_AREAS } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const { salons } = useBooking();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Refs for Scroll-Triggered Left/Right Animations
  const categoriesRef = useRef(null);
  const lookbookRef = useRef(null);
  const trendingRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);

  const [visibleSections, setVisibleSections] = useState({
    categories: false,
    lookbook: false,
    trending: false,
    howItWorks: false,
    testimonials: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -120px 0px" // Trigger only when section is 120px inside viewport
    });

    const elements = [
      categoriesRef.current,
      lookbookRef.current,
      trendingRef.current,
      howItWorksRef.current,
      testimonialsRef.current
    ];

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Smart AI Suggestions database based on common customer inputs
  const SERVICE_SUGGESTIONS = [
    "Bridal Makeup Package",
    "Bridal Mehendi Artist",
    "Bridal Spa Treatment",
    "Hair Balayage & Highlights",
    "Hair Botox Styling",
    "Premium Haircut & Wash",
    "HydraFacial Skincare",
    "Detox Ayurvedic Spa Massage",
    "Swedish Deep Tissue Massage",
    "Men's Fade & Beard Sculpting",
    "Home Salon Full Waxing Service",
    "Pedicure & Manicure Pampering"
  ];

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const filtered = SERVICE_SUGGESTIONS.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    executeSearch(suggestion, searchArea);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(searchQuery, searchArea);
  };

  const executeSearch = (query, area) => {
    navigate('/listing', { state: { query, area } });
  };

  const handleCategoryClick = (categoryName) => {
    navigate('/listing', { state: { query: categoryName } });
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Scissors': return <Scissors size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Compass': return <Compass size={20} />;
      case 'UserCheck': return <UserCheck size={20} />;
      case 'Home': return <HomeIcon size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  // Get top 3 trending salons
  const trendingSalons = salons.slice(0, 3);

  return (
    <div class="space-y-20 pb-20 font-sans overflow-x-hidden">
      
      {/* 1. Hero Section with Modern Eleganza Two-Column layout */}
      <section class="relative bg-[#E2ECD5] text-[#1A1A1A] py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
        
        {/* Organic soft aesthetic shapes */}
        <div class="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div class="absolute bottom-[-10%] left-[20%] w-[350px] h-[350px] bg-primary-100/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

        <div class="max-w-7xl mx-auto relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Brand details, editorial title, and search container */}
            <div class="lg:col-span-7 space-y-8 text-left animate-slide-in-left-dramatic">
              {/* Tagline */}
              <div class="inline-flex items-center space-x-2 bg-white/60 border border-white/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-gray-700 shadow-sm">
                <span class="text-primary">✨</span>
                <span>Premium Grooming & Styling in Hyderabad</span>
              </div>

              {/* Title */}
              <h1 class="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif font-light tracking-tight text-[#1A1A1A] leading-[1.05] uppercase">
                Elevate Your<br />
                <span class="font-normal italic text-primary font-serif">Charming</span><br />
                Glow
              </h1>

              {/* Description */}
              <p class="text-base sm:text-lg text-gray-600 font-light max-w-xl leading-relaxed">
                Discover elite salons, luxury grooming lounges, and certified mobile beauty therapists. Book instant appointments in Jubilee Hills, Banjara Hills, Gachibowli & more.
              </p>

              {/* Search Bar / Card */}
              <div class="max-w-xl w-full">
                <form onSubmit={handleSearchSubmit} class="bg-white p-3 rounded-2xl sm:rounded-full shadow-xl flex flex-col sm:flex-row gap-2.5 w-full relative border border-white/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                  {/* Service input */}
                  <div class="flex-grow flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 relative">
                    <Search class="text-gray-400 mr-2.5 shrink-0" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                      placeholder="What service are you looking for?"
                      class="w-full bg-transparent focus:outline-none text-gray-800 text-sm placeholder-gray-400 font-light"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div class="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-rose-100 z-50 text-left p-2.5 max-h-60 overflow-y-auto animate-fade-in-up">
                        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3.5 py-1.5">
                          ✨ Recommended Suggestions
                        </div>
                        {suggestions.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectSuggestion(item)}
                            class="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-xs text-gray-700 hover:text-primary rounded-lg transition-premium flex justify-between items-center"
                          >
                            <span>{item}</span>
                            <span class="text-[9px] bg-rose-100/50 text-primary px-2 py-0.5 rounded-full font-semibold">Smart Match</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Location selector */}
                  <div class="flex-none flex items-center px-4 py-2 sm:w-44">
                    <MapPin class="text-primary mr-2.5 shrink-0" size={18} />
                    <select
                      value={searchArea}
                      onChange={(e) => setSearchArea(e.target.value)}
                      class="w-full bg-transparent focus:outline-none text-gray-800 text-sm placeholder-gray-400 font-light cursor-pointer"
                    >
                      <option value="">All Neighborhoods</option>
                      {HYDERABAD_AREAS.map((area, idx) => (
                        <option key={idx} value={area} class="text-gray-800">{area}</option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    class="bg-[#F07A53] hover:bg-[#E06A43] text-white rounded-xl sm:rounded-full py-3 px-8 text-sm font-semibold transition-premium duration-300 flex items-center justify-center hover:shadow-lg relative overflow-hidden shrink-0 cursor-pointer"
                  >
                    <span>Search</span>
                  </button>
                </form>

                {/* Popular Tags */}
                <div class="flex flex-wrap gap-2 pt-4 text-xs font-light text-gray-500">
                  <span class="self-center">Popular:</span>
                  {["Hair Botox", "HydraFacial", "HD Bridal Makeup"].map((tag, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => { setSearchQuery(tag); executeSearch(tag, ''); }}
                      class="bg-white/40 hover:bg-white/70 text-gray-700 border border-black/5 rounded-full py-1 px-3 transition-all duration-300 hover:text-primary"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div class="grid grid-cols-3 gap-4 pt-6 border-t border-black/5 text-left max-w-lg">
                <div>
                  <div class="text-xl font-serif font-bold text-gray-900">🏆 Top 15</div>
                  <div class="text-[10px] uppercase tracking-wider text-gray-500 font-medium mt-1">Luxury Salons</div>
                </div>
                <div>
                  <div class="text-xl font-serif font-bold text-gray-900">⭐ 4.9 Rating</div>
                  <div class="text-[10px] uppercase tracking-wider text-gray-500 font-medium mt-1">12K+ Reviews</div>
                </div>
                <div>
                  <div class="text-xl font-serif font-bold text-gray-900">💆 100% Safe</div>
                  <div class="text-[10px] uppercase tracking-wider text-gray-500 font-medium mt-1">Secure Bookings</div>
                </div>
              </div>
            </div>

            {/* Right Column: Arched Model Container with badges */}
            <div class="lg:col-span-5 flex justify-center items-center relative animate-slide-in-right-dramatic">
              {/* Outer decoration circle */}
              <div class="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-black/5 pointer-events-none z-0"></div>
              
              {/* Arched capsule container */}
              <div class="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[480px] bg-[#F5EBE1] rounded-t-full rounded-b-[40%] overflow-visible border border-white/40 shadow-2xl flex items-end justify-center z-10">
                {/* Floating Rating Badge */}
                <div class="absolute top-8 -left-6 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-rose-50 flex items-center space-x-1.5 z-20 hover:scale-105 transition-transform duration-300">
                  <Star size={14} class="text-amber-500 fill-amber-500" />
                  <span class="text-[11px] font-bold text-gray-800">4.9</span>
                  <span class="text-[9px] text-gray-400 font-light border-l border-gray-100 pl-1.5">(12K+ Reviews)</span>
                </div>

                {/* Arched image mask to cut off image cleanly at arch but allow overlays */}
                <div class="absolute inset-0 rounded-t-full rounded-b-[40%] overflow-hidden flex items-end justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80"
                    alt="Elegant model styling"
                    class="w-full h-[95%] object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                    loading="eager"
                  />
                </div>

                {/* Floating Book Now Badge (overlapping bottom-left border of the capsule) */}
                <button
                  onClick={() => {
                    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  class="absolute -bottom-4 -left-6 w-20 h-20 sm:w-24 sm:h-24 bg-[#F07A53] hover:bg-[#E06A43] rounded-full text-white text-xs font-semibold flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 border-4 border-[#E2ECD5] z-30 cursor-pointer animate-float-delayed"
                >
                  <span class="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold">Book</span>
                  <span class="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold">Now</span>
                  <ArrowRight size={12} class="mt-1" />
                </button>

                {/* Styling Details Tag */}
                <div class="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 shadow-md text-left z-20">
                  <span class="text-[8px] font-bold text-primary uppercase tracking-widest block">Signature Style</span>
                  <span class="text-[10px] font-bold text-gray-800 block">Premium Haircut & Soft Wave Glow</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Category Navigation */}
      <section ref={categoriesRef} data-section="categories" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div class="space-y-2 animate-fade-in-up">
          <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">Browse Categories</h2>
          <p class="text-sm text-gray-500 font-light">Explore handpicked experts and salons by specialty</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4.5 max-w-5xl mx-auto">
          {CATEGORIES.map((cat, idx) => {
            const animClass = idx < 2 
              ? 'animate-slide-in-left-dramatic' 
              : idx === 2 
              ? 'animate-scale-in' 
              : 'animate-slide-in-right-dramatic';
            return (
              <div
                key={cat.id}
                class={visibleSections.categories ? `opacity-0 ${animClass}` : `opacity-0`}
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  class={`w-full bg-white border border-rose-100/40 rounded-2xl p-5 shadow-sm transition-premium text-center flex flex-col items-center justify-center space-y-3 group floating-card-gold-${(idx % 4) + 1}`}
                >
                  <div class="bg-rose-50 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-premium">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div class="text-xs font-semibold text-gray-800 group-hover:text-primary transition-premium">
                    {cat.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Style Lookbook Showcase */}
      <section ref={lookbookRef} data-section="lookbook" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center space-y-2 animate-fade-in-up">
          <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">The Glow Lookbook</h2>
          <p class="text-sm text-gray-500 font-light">Get inspired by top seasonal styling trends modeled by our stylists</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Silk-Press & Layers",
              category: "Hair Transformation",
              model: "Anjali Rao",
              image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80",
              desc: "Glossy, glass-like straight layers for lightweight bounce and shape."
            },
            {
              title: "Royal HD Bridal Glow",
              category: "Bridal Makeup",
              model: "Meera Krishnan",
              image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80",
              desc: "Airbrush finish with warm golden accents tailored for traditional ceremonies."
            },
            {
              title: "Hydra-Dew Facial",
              category: "Skincare Aesthetics",
              model: "Dr. Prathima N.",
              image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80",
              desc: "Ultra-hydrating clinical facial giving a dewy glass-skin texture."
            },
            {
              title: "Precision Skin Fade",
              category: "Men's Grooming",
              model: "Vikram Rathore",
              image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
              desc: "High drop-fade with contour beard alignment for sharp definition."
            }
          ].map((look, idx) => {
            const animClass = idx < 2 
              ? 'animate-slide-in-left-dramatic' 
              : 'animate-slide-in-right-dramatic';
            return (
              <div
                key={idx}
                class={visibleSections.lookbook ? `opacity-0 ${animClass}` : `opacity-0`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div class={`bg-white rounded-3xl border border-rose-100/30 overflow-hidden shadow-sm transition-premium group floating-card-${(idx % 4) + 1}`}>
                  <div class="relative h-72 overflow-hidden bg-stone-100">
                    <img
                      src={look.image}
                      alt={look.title}
                      class="w-full h-full object-cover group-hover:scale-105 transition-premium duration-500"
                      loading="lazy"
                    />
                    <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg translate-y-3 group-hover:translate-y-0 transition-premium duration-300">
                      <span class="text-[9px] font-bold text-primary uppercase tracking-widest block">{look.category}</span>
                      <span class="text-xs font-serif font-bold text-gray-900 block mt-0.5">{look.title}</span>
                    </div>
                  </div>
                  <div class="p-5 space-y-2 text-left">
                    <p class="text-[11px] text-gray-500 font-light leading-relaxed">
                      {look.desc}
                    </p>
                    <div class="pt-2 border-t border-stone-50 flex items-center justify-between text-[10px]">
                      <span class="text-gray-400 font-light">Stylist:</span>
                      <span class="font-bold text-primary">{look.model}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Trending Salons Grid */}
      <section ref={trendingRef} data-section="trending" class="bg-rose-50/30 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div class="flex justify-between items-end animate-fade-in-up">
            <div class="space-y-2">
              <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">Trending Salons in Hyderabad</h2>
              <p class="text-sm text-gray-500 font-light">Top-rated grooming studios right now</p>
            </div>
            <button 
              onClick={() => navigate('/listing')}
              class="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-premium"
            >
              <span>View All Salons</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingSalons.map((salon, idx) => {
              const animClass = idx === 0 
                ? 'animate-slide-in-left-dramatic' 
                : idx === 1 
                ? 'animate-scale-in' 
                : 'animate-slide-in-right-dramatic';
              return (
                <div
                  key={salon.id}
                  class={visibleSections.trending ? `opacity-0 ${animClass}` : "opacity-0"}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                <div
                  onClick={() => navigate(`/detail/${salon.id}`)}
                  class={`bg-white rounded-2xl border border-rose-100/30 overflow-hidden shadow-sm transition-premium cursor-pointer group floating-card-${(idx % 3) + 1}`}
                >
                <div class="relative h-56 overflow-hidden">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-premium duration-500"
                    loading="lazy"
                  />
                  <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-800 shadow-sm flex items-center space-x-1">
                    <Star size={11} class="text-amber-500 fill-amber-500 animate-pulse" />
                    <span>{salon.rating} ({salon.ratingCount})</span>
                  </div>
                  <div class="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
                    {salon.area}
                  </div>
                </div>

                <div class="p-6 space-y-4">
                  <div class="flex justify-between items-start">
                    <h3 class="font-serif font-bold text-lg text-gray-900 group-hover:text-primary transition-premium leading-snug">
                      {salon.name}
                    </h3>
                    <span class="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded">
                      {salon.priceTier}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
                    {salon.about}
                  </p>
                  
                  {/* Service list previews */}
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    {salon.services.slice(0, 3).map((srv, sIdx) => (
                      <span key={sIdx} class="bg-stone-50 border border-stone-100 text-gray-500 text-[10px] py-1 px-2.5 rounded-lg font-light">
                        {srv.name.split(" ")[0]}
                      </span>
                    ))}
                  </div>

                  <div class="pt-4 border-t border-stone-50 flex justify-between items-center text-xs font-medium">
                    <span class="text-gray-500 flex items-center">
                      <MapPin size={12} class="mr-1 text-primary" /> {salon.distance}
                    </span>
                    <span class="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold text-[10px]">
                      {salon.availabilityBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section ref={howItWorksRef} data-section="howItWorks" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center space-y-2 animate-fade-in-up">
          <h2 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">How It Works</h2>
          <p class="text-sm text-gray-500 font-light">Getting pampered is now a matter of 3 elegant steps</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
          <div class={visibleSections.howItWorks ? "opacity-0 animate-slide-in-left-dramatic" : "opacity-0"} style={{ animationDelay: "100ms" }}>
            <div class="space-y-4 p-6 bg-white rounded-2xl border border-rose-100/20 shadow-sm hover:shadow-md transition-premium floating-card-1 h-full">
              <div class="bg-rose-50 text-primary w-14 h-14 rounded-full flex items-center justify-center mx-auto text-lg font-bold group-hover:scale-110 transition-transform duration-300">1</div>
              <h3 class="font-serif font-bold text-base text-gray-900 mt-4">Explore & Filter</h3>
              <p class="text-xs text-gray-500 font-light leading-relaxed mt-2">
                Search by service or neighborhood. Compare ratings, pricing portfolios, and stylist reviews instantly.
              </p>
            </div>
          </div>
          <div class={visibleSections.howItWorks ? "opacity-0 animate-scale-in" : "opacity-0"} style={{ animationDelay: "200ms" }}>
            <div class="space-y-4 p-6 bg-white rounded-2xl border border-rose-100/20 shadow-sm hover:shadow-md transition-premium floating-card-2 h-full">
              <div class="bg-rose-50 text-primary w-14 h-14 rounded-full flex items-center justify-center mx-auto text-lg font-bold">2</div>
              <h3 class="font-serif font-bold text-base text-gray-900 mt-4">Book Instantly</h3>
              <p class="text-xs text-gray-500 font-light leading-relaxed mt-2">
                Pick your preferred stylist and coordinate a secure slot in under a minute. No prepayments necessary.
              </p>
            </div>
          </div>
          <div class={visibleSections.howItWorks ? "opacity-0 animate-slide-in-right-dramatic" : "opacity-0"} style={{ animationDelay: "300ms" }}>
            <div class="space-y-4 p-6 bg-white rounded-2xl border border-rose-100/20 shadow-sm hover:shadow-md transition-premium floating-card-3 h-full">
              <div class="bg-rose-50 text-primary w-14 h-14 rounded-full flex items-center justify-center mx-auto text-lg font-bold">3</div>
              <h3 class="font-serif font-bold text-base text-gray-900 mt-4">Glow & Redeem</h3>
              <p class="text-xs text-gray-500 font-light leading-relaxed mt-2">
                Complete your booking, rack up loyalty points automatically, and redeem them as cash off future glowups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section ref={testimonialsRef} data-section="testimonials" class="bg-stone-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float"></div>
        
        <div class="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div class="space-y-2 animate-fade-in-down">
            <h2 class="text-3xl font-serif font-bold tracking-tight">What Glow Lovers Say</h2>
            <p class="text-xs text-stone-400 font-light">Rated 4.9/5 by 12,000+ happy clients in Hyderabad</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div class={visibleSections.testimonials ? "opacity-0 animate-slide-in-left-dramatic" : "opacity-0"} style={{ animationDelay: "100ms" }}>
              <div class="p-8 rounded-2xl flex flex-col justify-between space-y-6 floating-card-1 glass-premium-dark h-full">
                <Quote size={32} class="text-primary-light opacity-30" />
                <p class="text-sm font-light text-stone-200 leading-relaxed italic">
                  "I booked Sneha from Gloss & Glow for a party makeover at my house in Hitech City. She arrived exactly on time, was extremely hygienic, and the makeup was incredibly subtle and glowy. Highly recommended!"
                </p>
                <div class="flex items-center space-x-3">
                  <div class="bg-rose-600 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-serif shadow-lg animate-pulse">K</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Kavya Sharma</h4>
                    <p class="text-[10px] text-stone-500">Tech Lead, Hitech City</p>
                  </div>
                </div>
              </div>
            </div>

            <div class={visibleSections.testimonials ? "opacity-0 animate-slide-in-right-dramatic" : "opacity-0"} style={{ animationDelay: "200ms" }}>
              <div class="p-8 rounded-2xl flex flex-col justify-between space-y-6 floating-card-2 glass-premium-dark h-full">
                <Quote size={32} class="text-primary-light opacity-30" />
                <p class="text-sm font-light text-stone-200 leading-relaxed italic">
                  "Finding a good haircut spot in Jubilee Hills is tough without booking days ahead. GlowSpot let me search, check slots at Aura Luxe, and book Priya in 30 seconds. The loyalty points program is a brilliant touch."
                </p>
                <div class="flex items-center space-x-3">
                  <div class="bg-rose-600 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-serif shadow-lg animate-pulse">V</div>
                  <div>
                    <h4 class="text-xs font-bold text-white">Varun Reddy</h4>
                    <p class="text-[10px] text-stone-500">Consultant, Jubilee Hills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
