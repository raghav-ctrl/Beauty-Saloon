import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StyleRecommender from './components/StyleRecommender';

// Page Imports
import Home from './pages/Home';
import Listing from './pages/Listing';
import Detail from './pages/Detail';
import BookingFlow from './pages/BookingFlow';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

// Scroll to top handler for clean transitions
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <div class="min-h-screen flex flex-col bg-[#FAFAFA] font-sans selection:bg-rose-100 selection:text-primary-800">
          <Navbar />
          
          <main class="flex-grow animate-fade-in-up">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/booking/:id" element={<BookingFlow />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
          <StyleRecommender />
        </div>
      </Router>
    </BookingProvider>
  );
}
