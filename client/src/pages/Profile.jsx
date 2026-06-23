import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Award, Heart, ChevronRight, AlertCircle, ShoppingBag, CheckCircle, RefreshCcw, MapPin, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Profile() {
  const navigate = useNavigate();
  const { bookings, loyaltyPoints, favorites, salons, cancelBooking } = useBooking();

  const [activeTab, setActiveTab] = useState('bookings'); // bookings, favorites
  const [cancelModalId, setCancelModalId] = useState(null);

  // Divide bookings
  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Canceled');

  // Favorite Salons List
  const favSalonsList = salons.filter(s => favorites.includes(s.id));

  // Loyalty calculations
  const getLoyaltyLevel = (pts) => {
    if (pts >= 1000) {
      return { tier: "Gold Member", pct: 100, nextLevel: "Maximum Tier Achieved! 🎉", color: "from-amber-400 to-yellow-600", desc: "Enjoy 15% booking bonus points & priority slots." };
    }
    if (pts >= 500) {
      const remaining = 1000 - pts;
      const pct = ((pts - 500) / 500) * 100;
      return { tier: "Silver Member", pct, nextLevel: `Earn ${remaining} more points to reach Gold Tier.`, color: "from-slate-300 to-slate-400 text-gray-800", desc: "Enjoy 12% booking points." };
    }
    const remaining = 500 - pts;
    const pct = (pts / 500) * 100;
    return { tier: "Bronze Member", pct, nextLevel: `Earn ${remaining} more points to reach Silver Tier.`, color: "from-amber-700 to-amber-900", desc: "Earn 10% cash back in points on every booking." };
  };

  const loyalty = getLoyaltyLevel(loyaltyPoints);

  const handleCancelClick = (id) => {
    setCancelModalId(id);
  };

  const confirmCancel = () => {
    cancelBooking(cancelModalId);
    setCancelModalId(null);
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Profile Welcome Header */}
      <div class="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden animate-fade-in-up">
        <div class="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
        
        <div class="space-y-2 relative z-10">
          <span class="text-xs font-bold text-primary-light uppercase tracking-wider">Dashboard Portal</span>
          <h1 class="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">Namaste, Glow Lover</h1>
          <p class="text-xs text-stone-400 font-light">Manage appointments, review loyalty bonuses, and check favorited salons.</p>
        </div>

        {/* Dynamic Loyalty Card */}
        <div class="w-full md:w-80 bg-stone-800/80 backdrop-blur-md rounded-2xl p-5 border border-stone-700/40 relative z-10 space-y-4 floating-card-gold-1">
          <div class="flex justify-between items-center">
            <span class="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <Award size={14} class="text-gold" /> Loyalty Tier status
            </span>
            <span class={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${loyalty.color} uppercase tracking-wider shadow-sm`}>
              {loyalty.tier}
            </span>
          </div>

          <div class="space-y-1">
            <div class="text-2xl font-bold text-white flex items-baseline">
              <span>✨ {loyaltyPoints}</span>
              <span class="text-xs text-stone-400 font-normal ml-1">Glow Points</span>
            </div>
            <p class="text-[9px] text-stone-500 font-light">{loyalty.desc}</p>
          </div>

          {/* Progress bar */}
          <div class="space-y-1">
            <div class="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
              <div 
                class="bg-gradient-to-r from-pink-500 to-primary h-full transition-all duration-1000"
                style={{ width: `${loyalty.pct}%` }}
              ></div>
            </div>
            <span class="text-[9px] text-stone-400 font-light block">{loyalty.nextLevel}</span>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div class="flex gap-4 border-b border-stone-200 mb-8 animate-fade-in-up">
        <button
          onClick={() => setActiveTab('bookings')}
          class={`pb-3 text-sm font-semibold border-b-2 transition-premium ${
            activeTab === 'bookings'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-gray-500 hover:text-primary'
          }`}
        >
          My Appointments
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          class={`pb-3 text-sm font-semibold border-b-2 transition-premium ${
            activeTab === 'favorites'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-gray-500 hover:text-primary'
          }`}
        >
          Saved Favorites
        </button>
      </div>

      {/* ACTIVE TAB PANEL */}
      <div class="animate-fade-in-up">
        {activeTab === 'bookings' && (
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Upcoming bookings panel */}
            <div class="lg:col-span-2 space-y-6">
              <div class="flex justify-between items-center pb-2 border-b border-stone-100">
                <h3 class="font-serif font-bold text-lg text-gray-900">Upcoming Glowups</h3>
                <span class="text-xs bg-rose-50 text-primary font-semibold px-2 py-0.5 rounded-full">
                  {upcomingBookings.length} bookings
                </span>
              </div>

              {upcomingBookings.length > 0 ? (
                <div class="space-y-4">
                  {upcomingBookings.map((b, idx) => (
                    <div 
                      key={b.id}
                      class={`bg-white border border-rose-100/30 rounded-2xl p-5 shadow-sm space-y-4 transition-premium floating-card-${(idx % 4) + 1}`}
                    >
                      <div class="flex justify-between items-start">
                        <div class="space-y-1">
                          <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">ID: {b.id}</span>
                          <h4 class="font-serif font-bold text-base text-gray-800">{b.salonName}</h4>
                          <div class="text-xs text-primary font-medium">{b.serviceName}</div>
                        </div>
                        <span class="text-xs bg-emerald-50 text-emerald-600 px-3 py-0.5 rounded-full font-semibold">
                          Confirmed
                        </span>
                      </div>

                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3.5 border-t border-stone-50 text-xs text-gray-600">
                        <div>
                          <span class="text-[9px] text-gray-400 block">Stylist assigned</span>
                          <span class="font-semibold text-gray-800">{b.stylistName}</span>
                        </div>
                        <div>
                          <span class="text-[9px] text-gray-400 block">Schedule Date</span>
                          <span class="font-semibold text-gray-800">{b.date}</span>
                        </div>
                        <div>
                          <span class="text-[9px] text-gray-400 block">Time Slot</span>
                          <span class="font-semibold text-gray-800">{b.time}</span>
                        </div>
                        <div>
                          <span class="text-[9px] text-gray-400 block">Total Paid</span>
                          <span class="font-bold text-primary">₹{b.price}</span>
                        </div>
                      </div>

                      <div class="pt-3 border-t border-stone-50 flex justify-between items-center text-xs">
                        <div class="text-[10px] text-gray-400 font-light flex items-center gap-1">
                          <CheckCircle size={12} class="text-emerald-500" /> Fully secure, pay at salon
                        </div>
                        <button
                          onClick={() => handleCancelClick(b.id)}
                          class="text-red-500 hover:text-red-700 font-semibold transition-premium"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="bg-white border border-stone-100 rounded-2xl p-10 text-center space-y-4">
                  <p class="text-xs text-gray-500 font-light">No upcoming bookings. Ready to schedule your next look?</p>
                  <Link to="/listing" class="bg-primary text-white rounded-xl py-2 px-5 text-xs font-semibold inline-block transition-premium">
                    Book a Service
                  </Link>
                </div>
              )}
            </div>

            {/* Past Bookings sidebar */}
            <div class="space-y-6">
              <h3 class="font-serif font-bold text-lg text-gray-900 pb-2 border-b border-stone-100">Past Bookings History</h3>

              {pastBookings.length > 0 ? (
                <div class="space-y-3.5">
                  {pastBookings.map((b, idx) => (
                    <div 
                      key={b.id}
                      class={`bg-white border border-stone-100 rounded-2xl p-4 shadow-sm text-xs space-y-3 transition-premium floating-card-${(idx % 4) + 1}`}
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-[9px] font-bold text-gray-400">{b.id}</span>
                        <span class={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          b.status === 'Canceled' 
                            ? 'text-red-600 bg-red-50' 
                            : 'text-gray-600 bg-stone-100'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div>
                        <h4 class="font-semibold text-gray-800">{b.salonName}</h4>
                        <div class="text-[11px] text-gray-500 font-light mt-0.5">{b.serviceName}</div>
                      </div>

                      <div class="flex justify-between items-center pt-2.5 border-t border-stone-50 text-[10px] text-gray-400 font-light">
                        <span>Date: {b.date}</span>
                        <Link 
                          to={`/detail/${b.salonId}`}
                          class="text-primary hover:text-primary-dark font-semibold flex items-center gap-0.5"
                        >
                          <RefreshCcw size={10} /> Rebook
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p class="text-xs text-gray-400 font-light italic">No booking history available.</p>
              )}
            </div>

          </div>
        )}

        {/* SAVED FAVORITES PANEL */}
        {activeTab === 'favorites' && (
          <div>
            {favSalonsList.length > 0 ? (
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {favSalonsList.map((salon, idx) => (
                  <div
                    key={salon.id}
                    onClick={() => navigate(`/detail/${salon.id}`)}
                    class={`bg-white rounded-2xl border border-rose-100/30 overflow-hidden shadow-sm transition-premium cursor-pointer flex flex-col justify-between floating-card-${(idx % 4) + 1}`}
                  >
                    <div class="h-44 relative bg-stone-100">
                      <img src={salon.image} alt={salon.name} class="w-full h-full object-cover" />
                      <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-gray-800 shadow-sm flex items-center space-x-1">
                        <Star size={10} class="text-amber-500 fill-amber-500" />
                        <span>{salon.rating}</span>
                      </div>
                      <div class="absolute top-3 right-3 bg-primary text-white text-[9px] font-bold py-0.5 px-2 rounded">
                        {salon.area}
                      </div>
                    </div>

                    <div class="p-4.5 space-y-3.5">
                      <div>
                        <h4 class="font-serif font-bold text-base text-gray-900 leading-tight">{salon.name}</h4>
                        <span class="text-[10px] text-gray-400 font-light flex items-center mt-1">
                          <MapPin size={11} class="mr-0.5 text-primary shrink-0" /> {salon.distance}
                        </span>
                      </div>
                      <button
                        class="w-full bg-rose-50 hover:bg-primary text-primary hover:text-white rounded-xl py-2 text-xs font-semibold border border-primary/20 transition-premium text-center"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div class="bg-white border border-stone-100 rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
                <div class="bg-rose-50 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Heart size={22} class="text-gray-400" />
                </div>
                <h3 class="font-serif font-bold text-base text-gray-800">Your favorite list is empty</h3>
                <p class="text-xs text-gray-500 font-light leading-relaxed">
                  Save salons by clicking the heart button on the salon details workspace to easily access them later.
                </p>
                <Link to="/listing" class="bg-primary text-white rounded-xl py-2.5 px-6 text-xs font-semibold inline-block transition-premium">
                  Explore Salons
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CANCEL BOOKING CONFIRMATION MODAL */}
      {cancelModalId && (
        <div class="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 animate-fade-in-up">
          <div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-100 text-center space-y-4.5">
            <div class="bg-red-50 text-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            
            <div class="space-y-1">
              <h3 class="font-serif font-bold text-lg text-gray-900">Cancel Appointment?</h3>
              <p class="text-xs text-gray-500 font-light leading-relaxed">
                Are you sure you want to cancel this booking? Slot allocations are in high demand and this action cannot be undone.
              </p>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                onClick={() => setCancelModalId(null)}
                class="flex-1 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-50"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-semibold shadow-md"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
