import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, Clock, ChevronRight, Share2, Sparkles, User, Calendar, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { MOCK_REVIEWS_DICT } from '../data/mockData';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { salons, favorites, toggleFavorite, addReview } = useBooking();

  const salon = salons.find(s => s.id === parseInt(id, 10));

  if (!salon) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 class="text-2xl font-serif font-bold text-gray-800">Salon not found</h2>
        <button onClick={() => navigate('/listing')} class="bg-primary text-white px-6 py-2 rounded-xl text-xs font-semibold">
          Back to listings
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(salon.id);

  // States
  const [activeTab, setActiveTab] = useState('all'); // all, hair, skin, bridal, spa, grooming
  const [selectedDate, setSelectedDate] = useState('today'); // today, tomorrow, dayAfter
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Review Form States
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewUser, setNewReviewUser] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // AI Review Summaries dictionary
  const AI_SUMMARIES = {
    1: "Customers frequently praise senior stylist Priya for detailed haircut transformations. Many highlight master colorist Rahul's outstanding balayage skill. The relaxing atmosphere and complimentary herbal tea are highly recommended.",
    2: "Clients recommend Vikram for sharp beard shaping and modern fades. The studio receives positive notes for cleanliness, short wait times, and excellent value for money.",
    3: "Praise centers on Kiran's professional massage techniques, which customers describe as highly therapeutic. The overall quiet, zen-inspired ambience is noted as a perfect weekend getaway.",
    4: "Reviews emphasize the high convenience and cleanliness of the home setup. Sneha is praised for gentle waxing techniques, and Rohan is noted as extremely professional with kids' cuts.",
    5: "Highlighted as a fast and highly affordable grooming destination in Madhapur. Corporate professionals recommend Arjun for quick beard styling and relaxing head massages.",
    6: "Naturals Kondapur is praised for consistent quality and organic products. Customers highlight Lakshmi's smoothening expertise and Mahesh's sharp pompadour cuts. The gold facial is a crowd favorite for sensitive skin types.",
    7: "Bubbles Banjara Hills receives rave reviews for its luxury experience. Neelima's precision cuts are described as world-class, while the private bridal suite and Balinese massage are standout highlights.",
    8: "Reviewers trust Lakmé Salon for genuine Absolute products. Fatima's long-lasting bridal makeup and Arun's hair botox treatment receive the most praise. The Youth Infinity facial is called a must-try.",
    9: "YLG Kukatpally is celebrated for painless Rica waxing by Pallavi. Customers appreciate the consistent quality, metro-adjacent convenience, and Naveen's Instagram-worthy textured cuts at affordable prices.",
    10: "O2 Spa is consistently rated as Hyderabad's best luxury spa. Dr. Ravi's therapeutic deep tissue massage and Sunita's Bali-inspired hot stone therapy receive the highest praise. The couple's package is a top anniversary pick.",
    11: "Toni & Guy Jubilee Hills delivers London-trained precision styling. Siddharth's razor-sharp cuts and Anjali's dimensional coloring are the most praised services. The Olaplex and Kerastase treatments attract clients with damaged hair.",
    12: "Bodycraft Secunderabad earns praise for clinical-grade skin treatments. Dr. Prathima's acne scar facials show visible results, while Ravi Teja's natural-looking highlights and the body polishing treatment are popular pre-wedding picks.",
    13: "Green Trends Ameerpet is celebrated as Hyderabad's best budget salon. The ₹199 haircut delivers premium quality, and Rekha's ₹499 de-tan facial is called unbeatable value. Students and young professionals rate it highly.",
    14: "Looks Salon Film Nagar is the go-to for Tollywood-level styling. Chaitanya's celebrity haircuts and Sravya's flawless HD makeup receive the most praise. The VIP grooming package is described as a complete star transformation.",
    15: "Streax Studio Tolichowki is popular among students for creative, affordable hair coloring. Imran's ash grey and vibrant color work receive the most compliments. Anjali's streak designs are called artistic and budget-friendly."
  };

  const getDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const formatter = {
      dayNum: d => d.getDate(),
      dayName: d => d.toLocaleDateString('en-IN', { weekday: 'short' }),
      month: d => d.toLocaleDateString('en-IN', { month: 'short' })
    };

    return [
      { id: 'today', num: formatter.dayNum(today), name: 'Today', month: formatter.month(today), dateStr: today.toISOString().split('T')[0] },
      { id: 'tomorrow', num: formatter.dayNum(tomorrow), name: formatter.dayName(tomorrow), month: formatter.month(tomorrow), dateStr: tomorrow.toISOString().split('T')[0] },
      { id: 'dayAfter', num: formatter.dayNum(dayAfter), name: formatter.dayName(dayAfter), month: formatter.month(dayAfter), dateStr: dayAfter.toISOString().split('T')[0] }
    ];
  };

  const dates = getDates();

  const timeSlots = {
    morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM"],
    evening: ["05:30 PM", "07:00 PM", "08:00 PM"]
  };

  // Filter Services
  const filteredServices = activeTab === 'all' 
    ? salon.services 
    : salon.services.filter(s => s.category === activeTab);

  const handleBookService = (service) => {
    navigate(`/booking/${salon.id}`, { 
      state: { 
        serviceId: service.id,
        stylistId: salon.stylists[0]?.id,
        date: dates.find(d => d.id === selectedDate)?.dateStr,
        timeSlot: selectedSlot || timeSlots.morning[0]
      } 
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    addReview(
      salon.id,
      newReviewText.trim(),
      newReviewRating,
      newReviewUser.trim() || "Verified Client"
    );

    setNewReviewText('');
    setNewReviewRating(5);
    setNewReviewUser('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  const handleDirectBookingFlow = () => {
    const defaultService = salon.services[0];
    const defaultStylist = salon.stylists[0];
    
    navigate(`/booking/${salon.id}`, { 
      state: { 
        serviceId: defaultService?.id,
        stylistId: defaultStylist?.id,
        date: dates.find(d => d.id === selectedDate)?.dateStr,
        timeSlot: selectedSlot || timeSlots.morning[0]
      } 
    });
  };

  return (
    <div class="pb-24 font-sans">
      
      {/* 1. Cover Banner Image */}
      <div class="h-64 md:h-96 relative bg-stone-100">
        <img
          src={salon.coverImage}
          alt={salon.name}
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          class="absolute top-6 left-6 bg-white/90 hover:bg-white text-gray-800 rounded-full px-4.5 py-2 text-xs font-semibold shadow-md transition-premium flex items-center space-x-1"
        >
          <span>← Back</span>
        </button>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 animate-scale-in">
        <div class="bg-white rounded-3xl border border-rose-100/50 p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glow-rose floating-card-1">
          
          <div class="space-y-3 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="bg-primary text-white text-[9px] font-bold py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                {salon.area}
              </span>
              <span class="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded">
                {salon.priceTier} Standard
              </span>
              <span class="text-gray-400 text-xs font-light">• {salon.distance}</span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {salon.name}
            </h1>

            <p class="text-xs text-gray-500 font-light flex items-center">
              <MapPin size={13} class="mr-1 text-primary shrink-0 animate-bounce-soft" /> {salon.address}
            </p>

            <div class="flex items-center space-x-4 pt-1.5">
              <div class="flex items-center text-xs font-semibold text-gray-800 bg-stone-50 px-2.5 py-1 rounded-lg">
                <Star size={13} class="text-amber-500 fill-amber-500 mr-1 animate-pulse" />
                <span>{salon.rating}</span>
                <span class="text-gray-400 font-light ml-1">({salon.ratingCount} reviews)</span>
              </div>
              <span class="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg font-semibold">
                {salon.availabilityBadge}
              </span>
            </div>
          </div>

          {/* Quick CTAs */}
          <div class="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => toggleFavorite(salon.id)}
              class={`flex-1 md:flex-none border p-3 rounded-2xl transition-premium shadow-sm flex items-center justify-center hover:scale-105 ${
                isFavorite 
                  ? 'border-primary/20 bg-rose-50 text-primary glow-rose' 
                  : 'border-stone-200 hover:border-primary/20 text-gray-400 hover:text-primary'
              }`}
              aria-label="Favorite Salon"
            >
              <Heart size={20} class={isFavorite ? 'fill-primary' : ''} />
            </button>
            <button
              class="border border-stone-200 hover:border-primary/20 text-gray-400 hover:text-primary p-3 rounded-2xl transition-premium shadow-sm flex items-center justify-center hover:scale-105"
              aria-label="Share Salon"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={handleDirectBookingFlow}
              class="flex-[2] md:flex-none bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-2xl py-3 px-8 text-sm font-semibold transition-premium duration-300 shadow-md hover:shadow-lg text-center btn-shiny relative overflow-hidden"
            >
              Book Salon Now
            </button>
          </div>

        </div>
      </div>

      {/* 3. Main Detail Grid */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: About, Services, Stylists, Reviews */}
        <div class="lg:col-span-2 space-y-12 animate-fade-in-up">
          
          {/* About Section */}
          <div class="bg-white border border-rose-100/30 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 class="text-xl font-serif font-bold text-gray-900">About the salon</h2>
            <p class="text-xs text-gray-500 font-light leading-relaxed">
              {salon.about}
            </p>
          </div>

          {/* AI Review Summary (Unique Feature) */}
          <div class="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100/60 rounded-2xl p-6 shadow-sm space-y-3 relative overflow-hidden glow-gold animate-scale-in">
            <div class="absolute top-0 right-0 p-3 text-gold opacity-35 animate-bounce-soft">
              <Sparkles size={40} />
            </div>
            
            <div class="flex items-center space-x-2">
              <div class="bg-primary/10 text-primary p-1.5 rounded-full flex items-center justify-center">
                <Sparkles size={14} class="animate-pulse" />
              </div>
              <h3 class="font-serif font-bold text-sm text-gray-900">AI Review Summarizer</h3>
            </div>
            <p class="text-xs text-gray-600 font-light leading-relaxed">
              "{AI_SUMMARIES[salon.id] || 'This newly listed salon has highly satisfied customers talking about exceptional styling standards, custom treatment programs, and friendly staff response.'}"
            </p>
            <div class="text-[9px] font-semibold text-primary/70 tracking-wider uppercase">
              Summarized from {salon.ratingCount}+ recent reviews
            </div>
          </div>

          {/* Services Menu Section */}
          <div class="bg-white border border-rose-100/30 rounded-2xl p-6 shadow-sm space-y-6">
            <div class="flex justify-between items-center pb-4 border-b border-stone-100">
              <h2 class="text-xl font-serif font-bold text-gray-900">Services & Pricing</h2>
              <span class="text-xs text-gray-400 font-light">{filteredServices.length} items</span>
            </div>

            {/* Menu Tabs */}
            <div class="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none border-b border-stone-50">
              {[
                { id: 'all', name: 'All Services' },
                { id: 'hair', name: 'Hair' },
                { id: 'skin', name: 'Skincare' },
                { id: 'bridal', name: 'Bridal' },
                { id: 'spa', name: 'Spa' },
                { id: 'grooming', name: 'Grooming' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  class={`py-1.5 px-4 rounded-xl text-xs font-semibold transition-premium border ${
                    activeTab === tab.id
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-stone-50 text-gray-600 border-stone-200/50 hover:bg-stone-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Services List Table */}
            <div class="space-y-4">
              {filteredServices.map((service, idx) => (
                <div 
                  key={service.id}
                  class="flex justify-between items-center py-3.5 px-4 rounded-xl hover:bg-rose-50/20 transition-premium border border-stone-100/20 group hover-scale-up animate-scale-in opacity-0"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div class="space-y-1">
                    <h4 class="font-serif font-semibold text-sm text-gray-900 group-hover:text-primary transition-premium">
                      {service.name}
                    </h4>
                    <div class="flex items-center text-[10px] text-gray-400 font-light">
                      <Clock size={10} class="mr-1 text-primary animate-pulse" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <span class="font-bold text-sm text-gray-800">
                      ₹{service.price}
                    </span>
                    <button
                      onClick={() => handleBookService(service)}
                      class="bg-rose-50 text-primary border border-primary/20 hover:bg-primary hover:text-white rounded-xl py-1.5 px-4 text-xs font-bold transition-premium shadow-sm flex items-center space-x-0.5 btn-shiny relative overflow-hidden"
                    >
                      <span>Book</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stylist Profiles Section */}
          <div class="bg-white border border-rose-100/30 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 class="text-xl font-serif font-bold text-gray-900 pb-4 border-b border-stone-100">Stylists & Specialists</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {salon.stylists.map((stylist, idx) => (
                <div
                  key={stylist.id}
                  class="opacity-0 animate-scale-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    class={`border border-stone-100/60 rounded-2xl p-4.5 flex items-start space-x-4 hover:shadow-md transition-premium floating-card-${(idx % 4) + 1} h-full`}
                  >
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    class="w-14 h-14 rounded-full object-cover shadow-inner bg-stone-100 shrink-0 group-hover:scale-105 transition-premium duration-300"
                  />
                  <div class="space-y-1">
                    <h4 class="font-serif font-semibold text-sm text-gray-900">{stylist.name}</h4>
                    <p class="text-[10px] text-primary font-medium tracking-wide uppercase">{stylist.role}</p>
                    <div class="flex items-center text-[10px] text-gray-400">
                      <Star size={10} class="text-amber-500 fill-amber-500 mr-1 animate-pulse" />
                      <span>{stylist.rating} ({stylist.reviews} bookings)</span>
                    </div>
                    <p class="text-[11px] text-gray-500 font-light pt-1 leading-relaxed line-clamp-2">
                      {stylist.bio}
                    </p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div class="bg-white border border-rose-100/30 rounded-2xl p-6 shadow-sm space-y-8">
            <h2 class="text-xl font-serif font-bold text-gray-900 pb-4 border-b border-stone-100">Client Reviews</h2>

            {/* List Reviews */}
            <div class="space-y-6">
              {salon.reviews && salon.reviews.map((rev) => (
                <div key={rev.id} class="space-y-2 border-b border-stone-50 pb-5">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                      <div class="bg-rose-50 text-primary w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold uppercase">
                        {rev.user.charAt(0)}
                      </div>
                      <div>
                        <h4 class="text-xs font-bold text-gray-800">{rev.user}</h4>
                        <div class="flex items-center text-[9px] text-gray-400 font-light">
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          class={i < rev.rating ? "text-amber-500 fill-amber-500" : "text-stone-200"}
                        />
                      ))}
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 font-light leading-relaxed pl-10">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Write a review form */}
            <div class="bg-stone-50/50 rounded-2xl p-6 border border-stone-100">
              <h3 class="font-serif font-semibold text-sm text-gray-900 mb-4">Write a Verified Review</h3>
              <form onSubmit={handleReviewSubmit} class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kavya Reddy"
                      value={newReviewUser}
                      onChange={(e) => setNewReviewUser(e.target.value)}
                      class="w-full bg-white border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                    />
                  </div>
                  <div>
                    <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(parseInt(e.target.value, 10))}
                      class="w-full bg-white border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                      <option value="4">⭐⭐⭐⭐ Good (4)</option>
                      <option value="3">⭐⭐⭐ Average (3)</option>
                      <option value="2">⭐⭐ Fair (2)</option>
                      <option value="1">⭐ Poor (1)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Your Comments</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your haircut, stylist attention, or treatment experience..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    class="w-full bg-white border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  class="bg-primary hover:bg-primary-dark text-white rounded-xl py-2 px-6 text-xs font-semibold transition-premium"
                >
                  Post Review
                </button>

                {reviewSubmitted && (
                  <span class="text-xs text-green-500 block animate-fade-in-up">
                    ✔ Review posted! Thank you for sharing your feedback.
                  </span>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-time Slot Picker (Desktop Sidebar) */}
        <div class="space-y-6">
          <div class="bg-white border border-rose-100/50 rounded-2xl p-6 shadow-sm sticky top-28 space-y-6">
            <h3 class="font-serif font-bold text-base text-gray-900 pb-4 border-b border-stone-100 flex items-center gap-1.5">
              <Calendar size={18} class="text-primary" /> Select Availability
            </h3>

            {/* Date Select buttons */}
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Choose Date</label>
              <div class="flex gap-2.5">
                {dates.map((dt) => (
                  <button
                    key={dt.id}
                    onClick={() => setSelectedDate(dt.id)}
                    class={`flex-1 border p-2.5 rounded-xl transition-premium text-center flex flex-col justify-center shadow-sm ${
                      selectedDate === dt.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-stone-50 border-stone-200 text-gray-700 hover:border-primary/20'
                    }`}
                  >
                    <span class="text-[10px] font-light">{dt.name}</span>
                    <span class="text-sm font-bold mt-0.5">{dt.num}</span>
                    <span class="text-[9px] font-light">{dt.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slots selector */}
            <div class="space-y-4">
              {/* Morning Slots */}
              <div class="space-y-1.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Morning</span>
                <div class="grid grid-cols-3 gap-2">
                  {timeSlots.morning.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      class={`border text-[10px] py-1.5 rounded-lg text-center transition-premium ${
                        selectedSlot === slot
                          ? 'bg-gold hover:bg-gold-dark text-gray-900 border-gold font-semibold shadow-sm'
                          : 'bg-white border-stone-200 text-gray-600 hover:border-gold/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div class="space-y-1.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Afternoon</span>
                <div class="grid grid-cols-3 gap-2">
                  {timeSlots.afternoon.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      class={`border text-[10px] py-1.5 rounded-lg text-center transition-premium ${
                        selectedSlot === slot
                          ? 'bg-gold hover:bg-gold-dark text-gray-900 border-gold font-semibold shadow-sm'
                          : 'bg-white border-stone-200 text-gray-600 hover:border-gold/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div class="space-y-1.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Evening</span>
                <div class="grid grid-cols-3 gap-2">
                  {timeSlots.evening.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      class={`border text-[10px] py-1.5 rounded-lg text-center transition-premium ${
                        selectedSlot === slot
                          ? 'bg-gold hover:bg-gold-dark text-gray-900 border-gold font-semibold shadow-sm'
                          : 'bg-white border-stone-200 text-gray-600 hover:border-gold/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic details note */}
            <div class="bg-stone-50 border border-stone-100 p-3 rounded-xl text-[10px] text-gray-500 font-light flex items-center space-x-1.5 leading-relaxed">
              <Clock size={12} class="text-primary shrink-0" />
              <span>
                {selectedSlot 
                  ? `Selected: ${dates.find(d => d.id === selectedDate).name}, ${selectedSlot}`
                  : "Please select a time slot to lock your booking."}
              </span>
            </div>

            <button
              onClick={handleDirectBookingFlow}
              class="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-3 text-sm font-semibold transition-premium duration-300 shadow-md hover:shadow-lg text-center"
            >
              Continue Booking Flow
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
