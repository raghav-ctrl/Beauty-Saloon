import React, { createContext, useContext, useState, useEffect } from 'react';
import { SALONS as INITIAL_SALONS } from '../data/mockData';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Data version: bump this when INITIAL_SALONS changes or to reset caches
  const DATA_VERSION = 'v3_clean_launch';

  const [salons, setSalons] = useState(() => {
    const storedVersion = localStorage.getItem('glowspot_data_version');
    if (storedVersion !== DATA_VERSION) {
      // Data has been updated or reset — clear all stale caches and use fresh data
      localStorage.removeItem('glowspot_salons');
      localStorage.removeItem('glowspot_bookings');
      localStorage.removeItem('glowspot_loyalty');
      localStorage.removeItem('glowspot_favorites');
      localStorage.setItem('glowspot_data_version', DATA_VERSION);
      return INITIAL_SALONS;
    }
    const local = localStorage.getItem('glowspot_salons');
    return local ? JSON.parse(local) : INITIAL_SALONS;
  });

  const [bookings, setBookings] = useState(() => {
    const local = localStorage.getItem('glowspot_bookings');
    return local ? JSON.parse(local) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const local = localStorage.getItem('glowspot_favorites');
    return local ? JSON.parse(local) : [];
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const local = localStorage.getItem('glowspot_loyalty');
    return local ? parseInt(local, 10) : 0;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('glowspot_salons', JSON.stringify(salons));
  }, [salons]);

  useEffect(() => {
    localStorage.setItem('glowspot_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('glowspot_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('glowspot_loyalty', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  const addBooking = (bookingData) => {
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      status: "Confirmed",
      ...bookingData
    };
    
    setBookings(prev => [newBooking, ...prev]);

    // Earn points: 10% of booking cost is added as loyalty points
    const pointsEarned = Math.floor(bookingData.price / 10);
    setLoyaltyPoints(prev => prev + pointsEarned);

    return newId;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: 'Canceled' } : b)
    );
  };

  const toggleFavorite = (salonId) => {
    setFavorites(prev => {
      if (prev.includes(salonId)) {
        return prev.filter(id => id !== salonId);
      } else {
        return [...prev, salonId];
      }
    });
  };

  const redeemPoints = (pointsToRedeem) => {
    if (pointsToRedeem <= loyaltyPoints) {
      setLoyaltyPoints(prev => prev - pointsToRedeem);
      return pointsToRedeem; // 1 point = ₹1 discount
    }
    return 0;
  };

  const addReview = (salonId, reviewText, ratingValue, userName) => {
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newReview = {
      id: `r-${Date.now()}`,
      user: userName || "Verified Customer",
      rating: ratingValue,
      date: formattedDate,
      comment: reviewText
    };

    setSalons(prevSalons =>
      prevSalons.map(s => {
        if (s.id === salonId) {
          const updatedReviews = [newReview, ...(s.reviews || [])];
          // Recalculate average rating
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));
          
          return {
            ...s,
            reviews: updatedReviews,
            rating: newAvgRating,
            ratingCount: updatedReviews.length
          };
        }
        return s;
      })
    );
  };

  const addSalon = (newSalonData) => {
    const nextId = salons.length > 0 ? Math.max(...salons.map(s => s.id)) + 1 : 1;
    const finalSalon = {
      id: nextId,
      rating: 5.0,
      ratingCount: 1,
      distance: `${(1 + Math.random() * 5).toFixed(1)} km`,
      reviews: [
        {
          id: "r-init",
          user: "GlowSpot Guide",
          rating: 5,
          date: "Recently Added",
          comment: "Welcome to this new premium beauty spot in Hyderabad!"
        }
      ],
      ...newSalonData
    };
    setSalons(prev => [finalSalon, ...prev]);
  };

  const updateSalon = (updatedSalon) => {
    setSalons(prev =>
      prev.map(s => s.id === updatedSalon.id ? { ...s, ...updatedSalon } : s)
    );
  };

  return (
    <BookingContext.Provider value={{
      salons,
      bookings,
      favorites,
      loyaltyPoints,
      addBooking,
      cancelBooking,
      toggleFavorite,
      redeemPoints,
      addReview,
      addSalon,
      updateSalon
    }}>
      {children}
    </BookingContext.Provider>
  );
};
