import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, Phone, Mail, CheckCircle2, Ticket, Scissors, Check, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const { salons, loyaltyPoints, addBooking, redeemPoints } = useBooking();

  const salon = salons.find(s => s.id === parseInt(id, 10));

  if (!salon) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 class="text-2xl font-serif font-bold text-gray-800">Salon not found</h2>
        <Link to="/listing" class="bg-primary text-white px-6 py-2 rounded-xl text-xs font-semibold">
          Back to Listings
        </Link>
      </div>
    );
  }

  // Pre-selected parameters from Details page redirect
  const initServiceId = locationState?.serviceId || salon.services[0]?.id;
  const initStylistId = locationState?.stylistId || salon.stylists[0]?.id;
  const initDate = locationState?.date || new Date().toISOString().split('T')[0];
  const initTimeSlot = locationState?.timeSlot || "09:00 AM";

  // Form States
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(initServiceId);
  const [selectedStylistId, setSelectedStylistId] = useState(initStylistId);
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(initTimeSlot);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Loyalty discount state
  const [redeemChecked, setRedeemChecked] = useState(false);
  const [pointsRedeemed, setPointsRedeemed] = useState(0);

  // Validation States
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  // Success Screen
  const [bookingSuccessId, setBookingSuccessId] = useState('');

  const selectedService = salon.services.find(s => s.id === selectedServiceId) || salon.services[0];
  const selectedStylist = salon.stylists.find(s => s.id === selectedStylistId) || salon.stylists[0];

  // Pricing calculations
  const priceSubtotal = selectedService ? selectedService.price : 0;
  const gstTax = Math.floor(priceSubtotal * 0.18); // 18% GST standard in India
  const platformFee = 25; // ₹25 standard platform fee
  
  // Maximum redeemable is up to subtotal, or maximum user points
  const maxRedeemablePoints = Math.min(loyaltyPoints, priceSubtotal);
  const discount = redeemChecked ? maxRedeemablePoints : 0;
  
  const finalTotal = priceSubtotal + gstTax + platformFee - discount;

  // Handle phone validation
  const validatePhone = (num) => {
    const cleanNum = num.replace(/\D/g, '');
    if (cleanNum.length !== 10) {
      setPhoneError('Please enter a valid 10-digit Indian phone number.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Handle email validation
  const validateEmail = (mail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(mail)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedServiceId || !selectedStylistId) {
        setFormError('Please select a service and stylist before continuing.');
        return;
      }
      setFormError('');
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        setFormError('Please select a date and booking slot.');
        return;
      }
      setFormError('');
      setStep(3);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Final Validation
    if (!customerName.trim()) {
      setFormError('Name field is required.');
      return;
    }
    if (!validatePhone(customerPhone)) return;
    if (!validateEmail(customerEmail)) return;

    // Process points deduction
    if (redeemChecked && maxRedeemablePoints > 0) {
      redeemPoints(maxRedeemablePoints);
      setPointsRedeemed(maxRedeemablePoints);
    }

    // Save booking
    const bookingId = addBooking({
      salonId: salon.id,
      salonName: salon.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      stylistId: selectedStylist.id,
      stylistName: selectedStylist.name,
      date: selectedDate,
      time: selectedTimeSlot,
      price: selectedService.price,
      customerName: customerName.trim(),
      customerPhone: customerPhone.replace(/\D/g, ''),
      customerEmail: customerEmail.trim(),
      customerNotes: customerNotes.trim(),
      discountRedeemed: discount
    });

    setBookingSuccessId(bookingId);
  };

  // Date lists generator
  const getDatesList = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        dateStr: d.toISOString().split('T')[0],
        dayNum: d.getDate(),
        dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        month: d.toLocaleDateString('en-IN', { month: 'short' })
      });
    }
    return dates;
  };

  const dateOptions = getDatesList();

  const slotsOptions = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:30 PM", "03:00 PM", "04:30 PM", "05:30 PM", 
    "07:00 PM", "08:00 PM"
  ];

  if (bookingSuccessId) {
    return (
      <div class="max-w-xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in-up font-sans">
        <div class="bg-white border border-rose-100 rounded-3xl p-8 shadow-2xl space-y-6">
          <div class="bg-emerald-50 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={44} class="animate-bounce" />
          </div>

          <div class="space-y-2">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Booking Confirmed
            </span>
            <h2 class="text-3xl font-serif font-bold text-gray-900 mt-2">You're All Set to Glow!</h2>
            <p class="text-xs text-gray-500 font-light leading-relaxed">
              We have sent a confirmation details and location map link to your phone number and email.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div class="bg-stone-50/50 border border-stone-100 rounded-2xl p-5 text-left space-y-3 text-xs">
            <div class="flex justify-between pb-2 border-b border-stone-100">
              <span class="text-gray-400">Booking Reference</span>
              <span class="font-bold text-gray-800">{bookingSuccessId}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Salon Partner</span>
              <span class="font-semibold text-gray-800">{salon.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Service</span>
              <span class="font-semibold text-gray-800">{selectedService.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Specialist</span>
              <span class="font-semibold text-gray-800">{selectedStylist.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Date & Slot</span>
              <span class="font-semibold text-gray-800">{selectedDate} at {selectedTimeSlot}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-stone-100 font-bold text-sm">
              <span class="text-gray-800">Final Paid</span>
              <span class="text-primary">₹{finalTotal}</span>
            </div>
          </div>

          <div class="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-3.5 border border-rose-100/50 text-[10px] text-gray-600 font-light leading-relaxed">
            ✨ You earned <strong class="text-primary font-bold">+{Math.floor(selectedService.price / 10)} Loyalty Points</strong> from this booking! Points will be added to your profile card instantly.
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/profile"
              class="flex-1 bg-primary hover:bg-primary-dark text-white rounded-xl py-3 text-xs font-semibold shadow-md hover:shadow-lg transition-premium text-center"
            >
              Manage Bookings
            </Link>
            <Link
              to="/"
              class="flex-1 border border-stone-200 hover:bg-stone-50 text-gray-600 rounded-xl py-3 text-xs font-semibold transition-premium text-center"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Wizard Steps indicator */}
      <div class="flex justify-center items-center mb-10 max-w-lg mx-auto">
        {[
          { num: 1, name: "Services" },
          { num: 2, name: "Date & Time" },
          { num: 3, name: "Confirmation" }
        ].map((s) => (
          <React.Fragment key={s.num}>
            <div class="flex flex-col items-center relative z-10">
              <div class={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-premium ${
                step >= s.num 
                  ? 'bg-primary text-white ring-4 ring-rose-100' 
                  : 'bg-stone-100 border border-stone-200 text-gray-400'
              }`}>
                {step > s.num ? <Check size={14} /> : s.num}
              </div>
              <span class={`text-[10px] mt-1.5 font-semibold tracking-wide ${
                step >= s.num ? 'text-primary' : 'text-gray-400'
              }`}>
                {s.name}
              </span>
            </div>
            {s.num < 3 && (
              <div class={`h-0.5 flex-1 mx-2 -mt-4 transition-premium duration-500 ${
                step > s.num ? 'bg-primary' : 'bg-stone-100'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: ACTIVE STEP DETAILS */}
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white border border-rose-100/50 rounded-2xl p-6 md:p-8 shadow-sm min-h-[400px] flex flex-col justify-between">
            
            {/* Step 1: Select Service & Stylist */}
            {step === 1 && (
              <div class="space-y-6 animate-fade-in-up">
                <h3 class="font-serif font-bold text-lg text-gray-900 border-b border-stone-50 pb-3">
                  Choose Service & Styling Partner
                </h3>

                {/* Service select radio */}
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block">Select Service</label>
                  <div class="space-y-2.5">
                    {salon.services.map((srv, idx) => (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        class={`border rounded-xl p-3.5 flex justify-between items-center cursor-pointer transition-premium shadow-sm floating-card-${(idx % 4) + 1} ${
                          selectedServiceId === srv.id
                            ? 'border-primary bg-rose-50/20 shadow-md'
                            : 'border-stone-200 hover:border-primary/20'
                        }`}
                      >
                        <div class="flex items-center space-x-3">
                          <div class={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedServiceId === srv.id ? 'border-primary bg-primary text-white' : 'border-stone-300'
                          }`}>
                            {selectedServiceId === srv.id && <div class="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <div>
                            <h4 class="text-xs font-bold text-gray-800">{srv.name}</h4>
                            <span class="text-[10px] text-gray-400 font-light">{srv.duration}</span>
                          </div>
                        </div>
                        <span class="text-xs font-bold text-gray-900">₹{srv.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stylist Selector */}
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block">Choose Stylist Specialist</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {salon.stylists.map((sty, idx) => (
                      <div
                        key={sty.id}
                        onClick={() => setSelectedStylistId(sty.id)}
                        class={`border rounded-xl p-3.5 text-center flex flex-col items-center justify-center space-y-2 cursor-pointer transition-premium shadow-sm floating-card-${(idx % 4) + 1} ${
                          selectedStylistId === sty.id
                            ? 'border-primary bg-rose-50/20'
                            : 'border-stone-200 hover:border-primary/20'
                        }`}
                      >
                        <img src={sty.image} alt={sty.name} class="w-11 h-11 rounded-full object-cover shadow-inner bg-stone-100" />
                        <div>
                          <h4 class="text-xs font-bold text-gray-800 leading-tight">{sty.name}</h4>
                          <span class="text-[9px] text-primary uppercase font-semibold">{sty.role.split(' ')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose Date & Time */}
            {step === 2 && (
              <div class="space-y-6 animate-fade-in-up">
                <h3 class="font-serif font-bold text-lg text-gray-900 border-b border-stone-50 pb-3">
                  Choose Date & Time Slot
                </h3>

                {/* Date Slider */}
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block">Available Dates</label>
                  <div class="grid grid-cols-3 sm:grid-cols-7 gap-2">
                    {dateOptions.map((dt) => (
                      <button
                        key={dt.dateStr}
                        onClick={() => setSelectedDate(dt.dateStr)}
                        class={`border p-2 rounded-xl transition-premium text-center flex flex-col justify-center shadow-sm ${
                          selectedDate === dt.dateStr
                            ? 'bg-primary text-white border-primary'
                            : 'bg-stone-50 border-stone-200 text-gray-700 hover:border-primary/20'
                        }`}
                      >
                        <span class="text-[9px] font-light">{dt.dayName}</span>
                        <span class="text-xs font-bold mt-0.5">{dt.dayNum}</span>
                        <span class="text-[9px] font-light">{dt.month}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid slots picker */}
                <div class="space-y-3">
                  <label class="text-xs font-bold text-gray-400 uppercase tracking-wider block">Available Time Slots</label>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {slotsOptions.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        class={`border text-[11px] py-2 rounded-xl text-center transition-premium ${
                          selectedTimeSlot === slot
                            ? 'bg-gold hover:bg-gold-dark text-gray-900 border-gold font-semibold shadow-sm'
                            : 'bg-white border-stone-200 text-gray-600 hover:border-gold/45'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details Form */}
            {step === 3 && (
              <div class="space-y-6 animate-fade-in-up">
                <h3 class="font-serif font-bold text-lg text-gray-900 border-b border-stone-50 pb-3">
                  Guest & Billing Details
                </h3>

                <form class="space-y-4">
                  <div>
                    <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Reddy"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2.5 px-3.5 text-xs transition-premium"
                    />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Phone Number (10 digit)</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (e.target.value.length >= 10) validatePhone(e.target.value);
                        }}
                        class={`w-full bg-stone-50 border focus:outline-none rounded-xl py-2.5 px-3.5 text-xs transition-premium ${
                          phoneError ? 'border-red-400 focus:border-red-400' : 'border-stone-200 focus:border-primary'
                        }`}
                      />
                      {phoneError && <span class="text-[10px] text-red-500 mt-1 block">{phoneError}</span>}
                    </div>

                    <div>
                      <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. aditi@gmail.com"
                        value={customerEmail}
                        onChange={(e) => {
                          setCustomerEmail(e.target.value);
                          if (e.target.value.includes('@')) validateEmail(e.target.value);
                        }}
                        class={`w-full bg-stone-50 border focus:outline-none rounded-xl py-2.5 px-3.5 text-xs transition-premium ${
                          emailError ? 'border-red-400 focus:border-red-400' : 'border-stone-200 focus:border-primary'
                        }`}
                      />
                      {emailError && <span class="text-[10px] text-red-500 mt-1 block">{emailError}</span>}
                    </div>
                  </div>

                  <div>
                    <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Special Requirements (Optional)</label>
                    <textarea
                      rows={2.5}
                      placeholder="e.g. Hair Wash preferences, sensitive skin alert, home service parking details..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      class="w-full bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3.5 text-xs transition-premium"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div class="pt-6 border-t border-stone-100 flex justify-between items-center gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  class="border border-stone-200 hover:bg-stone-50 text-gray-600 rounded-xl py-2.5 px-6 text-xs font-semibold transition-premium"
                >
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              {formError && (
                <div class="flex items-center text-red-500 text-xs gap-1">
                  <AlertCircle size={14} />
                  <span>{formError}</span>
                </div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  class="bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 px-7 text-xs font-semibold shadow-md hover:shadow-lg transition-premium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  class="bg-primary hover:bg-primary-dark text-white rounded-xl py-3 px-8 text-xs font-semibold shadow-md hover:shadow-lg transition-premium"
                >
                  Confirm Appointment
                </button>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY SIDEBAR */}
        <aside class="space-y-6">
          <div class="bg-white border border-rose-100/50 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 class="font-serif font-bold text-base text-gray-900 pb-3 border-b border-stone-100">
              Booking Details
            </h3>

            {/* Selected item preview */}
            <div class="space-y-3.5 text-xs pb-4 border-b border-stone-100">
              <div>
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Salon Brand</span>
                <div class="font-bold text-gray-800 text-sm mt-0.5">{salon.name}</div>
                <div class="text-[10px] text-gray-500 font-light mt-0.5">{salon.area}</div>
              </div>

              {selectedService && (
                <div>
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Selected Service</span>
                  <div class="font-semibold text-gray-800 mt-0.5">{selectedService.name}</div>
                  <div class="text-[10px] text-gray-400 font-light mt-0.5">Duration: {selectedService.duration}</div>
                </div>
              )}

              {selectedStylist && (
                <div>
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Stylist Assigned</span>
                  <div class="font-semibold text-gray-800 mt-0.5">{selectedStylist.name}</div>
                  <div class="text-[9px] text-primary uppercase font-bold mt-0.5">{selectedStylist.role}</div>
                </div>
              )}

              <div>
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Date & Time Slot</span>
                <div class="font-semibold text-gray-800 mt-0.5">
                  {selectedDate} at {selectedTimeSlot}
                </div>
              </div>
            </div>

            {/* Loyalty points coupon box */}
            {loyaltyPoints > 0 && (
              <div class="bg-gradient-to-r from-rose-50/50 to-amber-50/50 rounded-xl p-3.5 border border-rose-100/30 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-bold text-gray-600 flex items-center gap-1">
                    <Ticket size={12} class="text-rose-500" /> Apply Loyalty Points
                  </span>
                  <span class="text-[10px] font-bold text-primary">✨ {loyaltyPoints} Pts</span>
                </div>
                <p class="text-[9px] text-gray-500 font-light">Redeem points for instant cash discount (1 Pt = ₹1).</p>
                
                <label class="flex items-center space-x-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={redeemChecked}
                    onChange={(e) => setRedeemChecked(e.target.checked)}
                    class="rounded border-stone-300 text-primary focus:ring-primary w-3.5 h-3.5"
                  />
                  <span class="text-[10px] font-semibold text-gray-700">
                    Redeem {maxRedeemablePoints} points (Save ₹{maxRedeemablePoints})
                  </span>
                </label>
              </div>
            )}

            {/* Price list details */}
            <div class="space-y-2.5 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-400">Subtotal Price</span>
                <span class="font-semibold text-gray-800">₹{priceSubtotal}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">GST Tax (18% Govt)</span>
                <span class="font-semibold text-gray-800">₹{gstTax}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Platform Handling</span>
                <span class="font-semibold text-gray-800">₹{platformFee}</span>
              </div>

              {discount > 0 && (
                <div class="flex justify-between text-green-600 font-medium">
                  <span>Loyalty Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div class="flex justify-between pt-3.5 border-t border-stone-100 font-bold text-sm">
                <span class="text-gray-800">Total Payable</span>
                <span class="text-primary text-base">₹{finalTotal}</span>
              </div>
            </div>

            <div class="text-[10px] text-gray-400 font-light leading-relaxed text-center">
              🔒 256-bit Secure Marketplace checkout. No credit card details required at book-time.
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
}
