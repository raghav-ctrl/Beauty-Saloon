import React, { startTransition, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OpeningShowcase from './components/OpeningShowcase';
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

const INTRO_TOTAL_DURATION = 5000;
const INTRO_EXIT_DURATION = 700;

export default function App() {
  const [introStage, setIntroStage] = useState('playing');

  useEffect(() => {
    document.body.style.overflow = introStage === 'done' ? '' : 'hidden';

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldReduceMotion = mediaQuery.matches;
    const totalDuration = shouldReduceMotion ? 900 : INTRO_TOTAL_DURATION;
    const exitDuration = shouldReduceMotion ? 180 : INTRO_EXIT_DURATION;

    if (introStage === 'done') {
      return () => {
        document.body.style.overflow = '';
      };
    }

    const timer = window.setTimeout(() => {
      startTransition(() => {
        setIntroStage((currentStage) => {
          if (currentStage === 'playing') {
            return 'closing';
          }

          return 'done';
        });
      });
    }, introStage === 'playing' ? totalDuration - exitDuration : exitDuration);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [introStage]);

  const skipIntro = () => {
    startTransition(() => setIntroStage('done'));
  };

  const showIntro = introStage !== 'done';

  return (
    <BookingProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        {showIntro && (
          <OpeningShowcase
            isClosing={introStage === 'closing'}
            onSkip={skipIntro}
          />
        )}

        <div class={`app-shell ${showIntro ? 'app-shell--masked' : 'app-shell--ready'} min-h-screen flex flex-col bg-[#FAFAFA] font-sans selection:bg-rose-100 selection:text-primary-800`}>
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
