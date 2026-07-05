import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TunnelExperience from './components/TunnelExperience.jsx';
import About from './components/About.jsx';
import Tech from './components/Tech.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import LegalModal from './components/LegalModal.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import RevealLoader from './components/ui/reveal-loader';
import CursorSpotlight from './components/ui/CursorSpotlight.jsx';
import CinematicOverlay from './components/ui/CinematicOverlay.jsx';
import WebGLTest from './components/WebGLTest.jsx';
import { GlobalRipple } from './components/ui/global-ripple';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: null });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // Initial configuration for ScrollTrigger
    ScrollTrigger.config({
      ignoreMobileResize: true,
      syncInterval: 100
    });
    
    const handleLegalModal = (e) => {
      setLegalModal({ isOpen: true, type: e.detail });
    };
    window.addEventListener('openLegalModal', handleLegalModal);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('openLegalModal', handleLegalModal);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <CursorSpotlight />
      <CinematicOverlay />
      <RevealLoader 
        text="METACHASM" 
        bgColors={["#ffffff", "#f0f0f0"]} 
        textColor="#111111"
        movementDirection="bottom-up"
        staggerOrder="left-to-right"
      />
      <GlobalRipple />
      <div className="noise-bg">
        <div className="app-container">
          <Header />
          <main className="folds-container" style={{ position: 'relative', zIndex: 1 }}>
            <ErrorBoundary>
              <TunnelExperience />
            </ErrorBoundary>
          </main>
          
          <Toaster />
          <CookieBanner onReadPolicy={() => setLegalModal({ isOpen: true, type: 'privacy' })} />
          <LegalModal 
            isOpen={legalModal.isOpen} 
            type={legalModal.type} 
            onClose={() => setLegalModal({ isOpen: false, type: null })} 
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
