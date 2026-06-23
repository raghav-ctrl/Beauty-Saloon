import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, Coins, Sparkles, Plus, PlusCircle, Trash, Check, CheckCircle2, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { HYDERABAD_AREAS } from '../data/mockData';

export default function Admin() {
  const { salons, bookings, addSalon, cancelBooking, updateSalon } = useBooking();

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, salons, bookings
  const [showAddModal, setShowAddModal] = useState(false);

  // New Salon Form States
  const [newName, setNewName] = useState('');
  const [newArea, setNewArea] = useState('Jubilee Hills');
  const [newAddress, setNewAddress] = useState('');
  const [newPriceTier, setNewPriceTier] = useState('₹₹');
  const [newAbout, setNewAbout] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80');

  // Compute analytics from context bookings
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status !== 'Canceled')
    .reduce((sum, b) => sum + b.price, 0);
  
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const activeSalonsCount = salons.length;

  const handleCreateSalon = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newAddress.trim() || !newAbout.trim()) return;

    addSalon({
      name: newName.trim(),
      area: newArea,
      address: newAddress.trim(),
      priceTier: newPriceTier,
      priceRange: newPriceTier === '₹' ? "₹200 - ₹2,000" : newPriceTier === '₹₹' ? "₹400 - ₹6,000" : "₹800 - ₹12,000",
      about: newAbout.trim(),
      image: newImage.trim(),
      coverImage: newImage.trim(),
      services: [
        { id: `ns-${Date.now()}-1`, name: "Premium Designer Haircut & Wash", price: 800, duration: "45 mins", category: "hair" },
        { id: `ns-${Date.now()}-2`, name: "Hydrating Facial & Scalp Therapy", price: 1500, duration: "60 mins", category: "skin" }
      ],
      stylists: [
        { id: `ns-sty-${Date.now()}`, name: "Rahul Kumar", role: "Style Expert", rating: 4.8, reviews: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", bio: "Professional stylist with 5+ years experience." }
      ]
    });

    // Reset Form
    setNewName('');
    setNewAddress('');
    setNewAbout('');
    setShowAddModal(false);
  };

  const handleMarkCompleted = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      // Create a temporary hack to update status in localStorage
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'Completed' } : b
      );
      localStorage.setItem('glowspot_bookings', JSON.stringify(updatedBookings));
      // Force reload page to sync
      window.location.reload();
    }
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Admin Dashboard header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-up">
        <div>
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">Startup Hub Dashboard</h1>
          <p class="text-xs text-gray-500 font-light mt-1">Manage salon brand configurations and track customer booking logs.</p>
        </div>

        {/* Tab switchers */}
        <div class="bg-white border border-rose-100 rounded-2xl p-1.5 shadow-sm flex gap-1.5 w-full md:w-auto overflow-x-auto whitespace-nowrap">
          {[
            { id: 'analytics', name: 'KPI Analytics' },
            { id: 'salons', name: 'Partner Salons' },
            { id: 'bookings', name: 'Bookings Log' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              class={`py-2 px-5 rounded-xl text-xs font-semibold transition-premium ${
                activeTab === t.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-stone-50'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ANALYTICS KPI GRID */}
      {activeTab === 'analytics' && (
        <div class="space-y-10 animate-fade-in-up">
          
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {/* KPI 1 */}
            <div class="bg-white border border-rose-100/40 rounded-2xl p-5 shadow-sm flex items-center space-x-4 floating-card-1">
              <div class="bg-rose-50 text-primary p-3 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={22} />
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Bookings</span>
                <span class="text-2xl font-bold text-gray-800">{totalBookingsCount}</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div class="bg-white border border-rose-100/40 rounded-2xl p-5 shadow-sm flex items-center space-x-4 floating-card-2">
              <div class="bg-rose-50 text-primary p-3 rounded-xl flex items-center justify-center shrink-0">
                <Coins size={22} />
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Estimated Gross Revenue</span>
                <span class="text-2xl font-bold text-gray-800">₹{totalRevenue}</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div class="bg-white border border-rose-100/40 rounded-2xl p-5 shadow-sm flex items-center space-x-4 floating-card-3">
              <div class="bg-rose-50 text-primary p-3 rounded-xl flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active Salons</span>
                <span class="text-2xl font-bold text-gray-800">{activeSalonsCount}</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div class="bg-white border border-rose-100/40 rounded-2xl p-5 shadow-sm flex items-center space-x-4 floating-card-4">
              <div class="bg-rose-50 text-primary p-3 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={22} />
              </div>
              <div class="space-y-0.5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Completed Glows</span>
                <span class="text-2xl font-bold text-gray-800">{completedBookings}</span>
              </div>
            </div>
          </div>

          {/* Quick Platform Status note */}
          <div class="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-6 border border-rose-100/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="space-y-1">
              <h3 class="font-serif font-bold text-base text-gray-900">Partner Recruitment Live 🚀</h3>
              <p class="text-xs text-gray-500 font-light max-w-xl leading-relaxed">
                Hyderabad's premium beauty marketplace is growing! Recruit high-performing salon partners or manage active slots directly. Add a new salon location using the button below.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              class="bg-primary hover:bg-primary-dark text-white rounded-xl py-3 px-6 text-xs font-semibold shadow-md hover:shadow-lg transition-premium flex items-center space-x-1.5 self-stretch sm:self-auto justify-center"
            >
              <PlusCircle size={16} />
              <span>Add Partner Salon</span>
            </button>
          </div>

        </div>
      )}

      {/* 2. PARTNER SALONS LIST */}
      {activeTab === 'salons' && (
        <div class="space-y-6 animate-fade-in-up">
          <div class="flex justify-between items-center">
            <h3 class="font-serif font-bold text-lg text-gray-900">Registered Partner Brands</h3>
            <button
              onClick={() => setShowAddModal(true)}
              class="bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 px-4 text-xs font-semibold shadow-sm transition-premium flex items-center gap-1.5"
            >
              <Plus size={14} /> Add New Salon
            </button>
          </div>

          <div class="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-stone-50 border-b border-stone-100 text-gray-400 uppercase font-bold tracking-wider">
                  <th class="py-4 px-6">ID & Name</th>
                  <th class="py-4 px-6">Neighborhood</th>
                  <th class="py-4 px-6">Rating Level</th>
                  <th class="py-4 px-6">Pricing Tier</th>
                  <th class="py-4 px-6">Services List</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-50 text-gray-700">
                {salons.map(s => (
                  <tr key={s.id} class="hover:bg-rose-50/10 transition-premium">
                    <td class="py-4 px-6 font-semibold flex items-center space-x-3">
                      <img src={s.image} alt={s.name} class="w-9 h-9 rounded-full object-cover shrink-0 bg-stone-50" />
                      <div class="flex flex-col">
                        <span class="text-gray-900 font-serif font-bold text-xs">{s.name}</span>
                        <span class="text-[10px] text-gray-400 font-light">{s.distance}</span>
                      </div>
                    </td>
                    <td class="py-4 px-6">{s.area}</td>
                    <td class="py-4 px-6 font-semibold text-amber-500">⭐ {s.rating} <span class="text-gray-400 font-light">({s.ratingCount})</span></td>
                    <td class="py-4 px-6 font-bold text-gold-600">{s.priceTier}</td>
                    <td class="py-4 px-6 font-light text-gray-400">{s.services.map(srv => srv.name.split(' ')[0]).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BOOKINGS LOG TABLE */}
      {activeTab === 'bookings' && (
        <div class="space-y-6 animate-fade-in-up">
          <h3 class="font-serif font-bold text-lg text-gray-900 pb-2">Active System Booking Logs</h3>

          {bookings.length > 0 ? (
            <div class="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-stone-50 border-b border-stone-100 text-gray-400 uppercase font-bold tracking-wider">
                    <th class="py-4 px-6">Booking ID</th>
                    <th class="py-4 px-6">Customer & Contact</th>
                    <th class="py-4 px-6">Salon & Service</th>
                    <th class="py-4 px-6">Date & Slot</th>
                    <th class="py-4 px-6">Billing</th>
                    <th class="py-4 px-6">Status</th>
                    <th class="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-50 text-gray-700">
                  {bookings.map(b => (
                    <tr key={b.id} class="hover:bg-rose-50/10 transition-premium">
                      <td class="py-4 px-6 font-bold text-gray-900">{b.id}</td>
                      <td class="py-4 px-6">
                        <div class="flex flex-col">
                          <span class="font-semibold text-gray-800">{b.customerName}</span>
                          <span class="text-[10px] text-gray-400 font-light">{b.customerPhone}</span>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex flex-col">
                          <span class="font-semibold text-gray-800">{b.salonName}</span>
                          <span class="text-[10px] text-primary">{b.serviceName}</span>
                        </div>
                      </td>
                      <td class="py-4 px-6 font-medium">{b.date} at {b.time}</td>
                      <td class="py-4 px-6 font-bold text-gray-800">₹{b.price}</td>
                      <td class="py-4 px-6">
                        <span class={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          b.status === 'Confirmed'
                            ? 'text-emerald-700 bg-emerald-50'
                            : b.status === 'Completed'
                            ? 'text-gray-700 bg-stone-100'
                            : 'text-red-700 bg-red-50'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td class="py-4 px-6 text-right">
                        {b.status === 'Confirmed' && (
                          <div class="flex justify-end gap-2.5">
                            <button
                              onClick={() => handleMarkCompleted(b.id)}
                              class="text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 transition-premium"
                              title="Mark Completed"
                            >
                              <CheckCircle2 size={13} /> Complete
                            </button>
                            <button
                              onClick={() => cancelBooking(b.id)}
                              class="text-red-500 hover:text-red-700 font-semibold transition-premium"
                              title="Cancel Appointment"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p class="text-xs text-gray-400 font-light italic">No booking logs present in system.</p>
          )}
        </div>
      )}

      {/* ADD SALON PARTNER MODAL FORM */}
      {showAddModal && (
        <div class="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in-up">
          <div class="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-rose-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div class="flex justify-between items-center border-b border-stone-100 pb-3">
              <h3 class="font-serif font-bold text-lg text-gray-900">Add New Partner Salon</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                class="text-gray-400 hover:text-gray-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateSalon} class="space-y-4">
              <div>
                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Salon Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bounce Salon Gachibowli"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Hyderabad Area</label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs cursor-pointer"
                  >
                    {HYDERABAD_AREAS.map((a, idx) => (
                      <option key={idx} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Price Tier</label>
                  <select
                    value={newPriceTier}
                    onChange={(e) => setNewPriceTier(e.target.value)}
                    class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs cursor-pointer"
                  >
                    <option value="₹">₹ (Budget)</option>
                    <option value="₹₹">₹₹ (Mid-range)</option>
                    <option value="₹₹₹">₹₹₹ (Premium)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Road No 36, Near Jubilee Hills Checkpost"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                />
              </div>

              <div>
                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">About & Specialty Description</label>
                <textarea
                  required
                  rows={2.5}
                  placeholder="Describe salon interiors, special aesthetic brands, or target customer hair goals..."
                  value={newAbout}
                  onChange={(e) => setNewAbout(e.target.value)}
                  class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                />
              </div>

              <div>
                <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Cover Image URL (Unsplash)</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Image URL link"
                  class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3 text-xs"
                />
              </div>

              <div class="bg-rose-50 text-primary p-3 rounded-xl text-[10px] font-light leading-relaxed">
                ✨ Note: Adding this salon will pre-populate it with standard hair styling and facial services, as well as a senior stylist, so customers can immediately start booking!
              </div>

              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  class="flex-1 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-semibold shadow-md"
                >
                  Register Salon
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
