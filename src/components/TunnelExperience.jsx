import React, { useRef, useEffect, useCallback, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { BlurText } from './ui/blur-text';
import { HeroGodRays } from './ui/hero-god-rays';
import { FluidMorphBg } from './ui/fluid-morph-bg';
import { MorphText } from './ui/morph-text';
import { CyberGlitchText } from './ui/cyber-glitch-text';
import Logo from './ui/Logo';

import About from './About';
import Services from './Services';
import Testimonials from './Testimonials';
import Tech from './Tech';
import FAQ from './FAQ';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TOTAL_LAYERS = 7;
const DURATION = 0.72;
const EASE = 'power3.inOut';

// ALL non-active layers share ONE resting state — tiny, blurred, and culled.
const RESTING = { scale: 0.05, autoAlpha: 0, filter: 'blur(30px)' };
const ACTIVE  = { scale: 1,    autoAlpha: 1, filter: 'blur(0px)' };

const DECRYPTION_STATES = [
  "METACHASM",
  "APPS & WEBSITES"
];

export default function TunnelExperience() {
  const containerRef = useRef(null);
  const currentLayer = useRef(0);
  const isAnimating  = useRef(false);
  const activeTween  = useRef(null);
  const touchStartY  = useRef(null);
  
  const [heroStep, setHeroStep] = useState(0);
  const heroStepRef = useRef(0);
  const prevStepRef = useRef(0);

  useEffect(() => {
    heroStepRef.current = heroStep;
    
    const currentIdx = heroStep;
    const prevIdx = prevStepRef.current;

    // Hyper-Stretch & Blur Dissolve
    if (currentIdx !== prevIdx) {
      // Outgoing text stretches out and blurs away
      anime({
        targets: `.hero-text-${prevIdx}`,
        letterSpacing: ['-0.025em', '0.8em'],
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(20px)'],
        duration: 600,
        easing: 'easeInExpo'
      });

      // Incoming text starts wide and blurred, snapping into focus
      anime({
        targets: `.hero-text-${currentIdx}`,
        letterSpacing: ['0.8em', '-0.025em'],
        opacity: [0, 1],
        filter: ['blur(20px)', 'blur(0px)'],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    } else if (heroStep === 0) {
      // On mount, ensure only step 0 is visible and tight
      anime.set(`.hero-text-0`, { letterSpacing: '-0.025em', filter: 'blur(0px)', opacity: 1 });
      anime.set(`.hero-text-1`, { opacity: 0 });
      anime.set(`.hero-text-2`, { opacity: 0 });
    }

    prevStepRef.current = heroStep;
  }, [heroStep]);

  useEffect(() => {
    // We removed the fragile anime.js opacity:0 hiding here to guarantee the Hero text is always visible.
    // The hero content will just use CSS animations or default to visible.
  }, []);

  const layerEl = (i) =>
    containerRef.current?.querySelector(`.tunnel-layer-${i}`);

  // ── Init: layer 0 fully visible, all others resting ────────────────────────
  const resetAllLayers = useCallback(() => {
    for (let i = 0; i < TOTAL_LAYERS; i++) {
      const el = layerEl(i);
      if (!el) continue;
      gsap.set(el, {
        ...(i === 0 ? ACTIVE : RESTING),
        zIndex: i === 0 ? 50 : 10,
      });
    }
  }, []);

  // ── Core transition ─────────────────────────────────────────────────────────
  const goToLayer = useCallback((nextIndex) => {
    if (isAnimating.current) return;
    if (nextIndex < 0 || nextIndex >= TOTAL_LAYERS) return;

    const prev = currentLayer.current;
    if (nextIndex === prev) return;

    const forward = nextIndex > prev;
    const prevEl  = layerEl(prev);
    const nextEl  = layerEl(nextIndex);
    if (!prevEl || !nextEl) return;

    isAnimating.current = true;

    // Departing layer sits ON TOP (zIndex 60) so its exit is always seen.
    // Arriving layer starts BELOW (zIndex 50), grows up from underneath.
    gsap.set(prevEl, { ...ACTIVE,   zIndex: 60 });
    gsap.set(nextEl, { ...RESTING,  zIndex: 50 });

    const tl = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        // Hard snap both layers to canonical states — no dirty transforms left.
        gsap.set(prevEl, { ...RESTING, zIndex: 10 });
        gsap.set(nextEl, { ...ACTIVE,  zIndex: 50 });
        currentLayer.current = nextIndex;
        isAnimating.current  = false;
        activeTween.current  = null;
      },
    });

    // Depart: forward → zooms past camera; backward → recedes.
    tl.to(prevEl, {
      scale:   forward ? 12 : 0.05,
      autoAlpha: 0,
      filter:  forward ? 'blur(20px)' : 'blur(30px)',
    }, 0);

    // Arrive: always grows in from tiny — same motion forward and backward.
    tl.to(nextEl, { ...ACTIVE }, 0);

    activeTween.current = tl;
  }, []);

  // ── Scroll Boundary Helper ──────────────────────────────────────────────────
  const isScrollableAndNotAtBoundary = (target, deltaY) => {
    let el = target;
    while (el && el !== document.body && el !== containerRef.current) {
      const style = window.getComputedStyle(el);
      const isScrollable = (style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
      
      if (isScrollable) {
        if (deltaY > 0) {
          // Scrolling down
          if (Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight - 1) {
            return true;
          }
        } else {
          // Scrolling up
          if (el.scrollTop > 1) {
            return true;
          }
        }
      }
      el = el.parentElement;
    }
    return false;
  };

  // ── Wheel ───────────────────────────────────────────────────────────────────
  const onWheel = useCallback((e) => {
    if (isAnimating.current) {
      e.preventDefault();
      return;
    }
    
    // Check if the user is scrolling inside a scrollable div that hasn't hit its boundary yet
    if (isScrollableAndNotAtBoundary(e.target, e.deltaY)) {
      return; // Allow native scroll to happen naturally
    }

    e.preventDefault(); // Now it's safe to hijack the scroll for the 3D transition
    
    if (Math.abs(e.deltaY) < 2) return;
    const forward = e.deltaY > 0;

    // Hero Fold Scroll Hijack
    if (currentLayer.current === 0) {
      if (forward && heroStepRef.current < 2) {
        isAnimating.current = true;
        setHeroStep(s => s + 1);
        setTimeout(() => { isAnimating.current = false; }, 600);
        return;
      }
      if (!forward && heroStepRef.current > 0) {
        isAnimating.current = true;
        setHeroStep(s => s - 1);
        setTimeout(() => { isAnimating.current = false; }, 600);
        return;
      }
    }

    goToLayer(currentLayer.current + (forward ? 1 : -1));
  }, [goToLayer]);

  // ── Touch ───────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    
    if (Math.abs(delta) < 30 || isAnimating.current) return;

    // Check if they are swiping inside a scrollable div
    if (isScrollableAndNotAtBoundary(e.target, delta)) {
      return; // Allow native scroll to happen
    }

    const forward = delta > 0;

    // Hero Fold Scroll Hijack
    if (currentLayer.current === 0) {
      if (forward && heroStepRef.current < 2) {
        isAnimating.current = true;
        setHeroStep(s => s + 1);
        setTimeout(() => { isAnimating.current = false; }, 600);
        return;
      }
      if (!forward && heroStepRef.current > 0) {
        isAnimating.current = true;
        setHeroStep(s => s - 1);
        setTimeout(() => { isAnimating.current = false; }, 600);
        return;
      }
    }

    goToLayer(currentLayer.current + (forward ? 1 : -1));
  }, [goToLayer]);

  useEffect(() => {
    resetAllLayers();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel',      onWheel,      { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true  });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true  });

    const handleGoToFold = (e) => {
      const index = e.detail?.index;
      if (typeof index === 'number') {
        goToLayer(index);
      }
    };
    window.addEventListener('goToFold', handleGoToFold);

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      
      gsap.to('.parallax-bg', {
        x: x * 30,
        y: y * 30,
        scale: 1.05,
        duration: 1.5,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('wheel',      onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('goToFold', handleGoToFold);
      window.removeEventListener('mousemove', onMouseMove);
      if (activeTween.current) activeTween.current.kill();
    };
  }, [resetAllLayers, onWheel, onTouchStart, onTouchEnd, goToLayer]);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-background text-foreground font-sans select-none"
      style={{ touchAction: 'none' }}
    >
      {/* ── LAYER 7 (index 6): CONTACT ──────────────────────────────────── */}
      <div className="tunnel-layer-6 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
        <img
          src="/assets/bg-parallax-contact.png"
          className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
          style={{ zIndex: -2, transform: 'scale(1.05)' }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <Contact />
        </div>
      </div>

      {/* ── LAYER 6 (index 5): FAQ ─────────────────────────────────────── */}
      <div className="tunnel-layer-5 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
        <img
          src="/assets/bg-parallax-faq.png"
          className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          style={{ zIndex: -2, transform: 'scale(1.05)' }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/80 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <FAQ />
        </div>
      </div>

      {/* ── LAYER 5 (index 4): TECH ─────────────────────────────────────── */}
      <div className="tunnel-layer-4 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
        <img
          src="/assets/bg-parallax-tech.png"
          className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
          style={{ zIndex: -2, transform: 'scale(1.05)' }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <Tech />
        </div>
      </div>

      {/* ── LAYER 4 (index 3): TESTIMONIALS ─────────────────────────────── */}
      <div className="tunnel-layer-3 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
        <img
          src="/assets/bg-parallax-testimonials.png"
          className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          style={{ zIndex: -2, transform: 'scale(1.05)' }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/80 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <Testimonials />
        </div>
      </div>

      {/* ── LAYER 3 (index 2): SERVICES ─────────────────────────────────── */}
      <div className="tunnel-layer-2 absolute inset-0 will-change-transform flex flex-col">
        <img
          src="/assets/fold-4.png"
          className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none"
          style={{ zIndex: -1 }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <Services />
        </div>
      </div>

      {/* ── LAYER 2 (index 1): ABOUT ────────────────────────────────────── */}
      <div className="tunnel-layer-1 absolute inset-0 will-change-transform flex flex-col">
        <img
          src="/assets/fold-3.png"
          className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none"
          style={{ zIndex: -1 }}
          alt=""
        />
        <div
          className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
          style={{ zIndex: -1 }}
        />
        <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start pt-20 lg:pt-0">
          <About />
        </div>
      </div>

      {/* ── LAYER 1 (index 0): HERO ─────────────────────────────────────── */}
      <div className="tunnel-layer-0 absolute inset-0 will-change-transform flex items-center justify-center">
        {/* Background / Environment */}
        <div className="absolute inset-0 bg-[#FAFAFA]" style={{ zIndex: -3 }} />
        <img
          src="/assets/fold-1.png"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-luminosity grayscale"
          style={{ zIndex: -2 }}
          alt=""
        />
        {/* God Rays Background Effect */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80 mix-blend-multiply">
           <HeroGodRays />
        </div>

        {/* HUD Overlay - Top */}
        <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex justify-between items-start pointer-events-none z-20">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] tracking-[0.4em] font-bold text-[#111111]/40 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>SYS.VER // 2.4.9</span>
            <span className="text-[9px] tracking-[0.4em] font-bold text-[#111111]/40 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>LATENCY // 0.02ms</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-pulse" />
            <span className="text-[9px] tracking-[0.4em] font-bold text-[#111111] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>ON_LINE</span>
          </div>
        </div>

        {/* HUD Overlay - Bottom Corners */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 pointer-events-none z-20 hidden md:block">
          <span className="text-[9px] tracking-[0.4em] font-bold text-[#111111]/30 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>ENG: ACTIVE</span>
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 pointer-events-none z-20 text-right hidden md:block">
          <span className="text-[9px] tracking-[0.4em] font-bold text-[#111111]/30 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>FWD // 01</span>
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-[90%] max-w-5xl pointer-events-auto mt-[-4vh]">
          
          {/* Logo with subtle glow interaction */}
          <div 
            className="mb-10 relative group cursor-pointer" 
            onClick={() => window.dispatchEvent(new CustomEvent('goToFold', { detail: { index: 1 } }))}
          >
            <div className="absolute inset-0 bg-[#0055FF] blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-full scale-150" />
            <Logo size={100} className="md:w-[120px] md:h-[120px] relative z-10 opacity-90 transition-transform duration-700 group-hover:scale-105" />
          </div>

          {/* Massive Glitch Typography */}
          <div className="flex flex-col items-center gap-2 mb-10 w-full relative h-[120px] md:h-[160px] justify-center overflow-visible">
            <div 
              className="transition-all duration-1000 ease-out flex items-center justify-center w-full relative h-full"
              style={{
                transform: `scale(${1 + heroStep * 0.05})`,
                opacity: heroStep === 0 ? 0.8 : 1,
              }}
            >
              {DECRYPTION_STATES.map((state, idx) => (
                <h1 
                  key={idx}
                  className={`hero-text-${idx} absolute inset-0 flex items-center justify-center text-[clamp(3rem,8vw,8.5rem)] font-black tracking-tight text-[#111111] leading-[0.85] uppercase whitespace-nowrap`}
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    pointerEvents: heroStep === idx ? 'auto' : 'none',
                    opacity: idx === 0 ? 1 : 0
                  }}
                >
                  {state}
                </h1>
              ))}
            </div>
          </div>

          {/* Statement */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2">
            <span 
              className="text-lg md:text-2xl text-[#111111]/60 transition-opacity duration-700"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.02em', opacity: heroStep === 1 ? 1 : 0.3 }}
            >
              Architecting the future of
            </span>
            <div 
              className="flex items-center justify-center h-[32px] md:h-[40px] transition-opacity duration-700"
              style={{ opacity: heroStep === 1 ? 1 : 0.3 }}
            >
              <MorphText 
                words={["Digital Ecosystems.", "Immersive Realities.", "High-Performance Web.", "Intelligent Platforms."]}
                fontSize="clamp(1.125rem, 2vw, 1.5rem)"
                fontFamily="var(--font-sans)"
                className="text-[#0055FF] font-semibold tracking-tight"
              />
            </div>
          </div>

          {/* Action Trigger */}
          <div 
            className="mt-16 flex flex-col items-center gap-6 cursor-pointer group"
            onClick={() => {
              if (heroStep < 1) setHeroStep(1);
              else window.dispatchEvent(new CustomEvent('goToFold', { detail: { index: 1 } }));
            }}
          >
            <span 
              className="text-[10px] font-bold tracking-[0.4em] text-[#111111]/40 uppercase group-hover:text-[#0055FF] transition-colors duration-500" 
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {heroStep < 1 ? `SCROLL TO DECRYPT [${heroStep}/1]` : `Initialize Sequence`}
            </span>
            <div className="relative w-[1px] h-20 md:h-24 overflow-hidden">
              <div className="absolute inset-0 bg-[#111111]/10" />
              <div 
                className="absolute top-0 left-0 w-full bg-[#0055FF] transition-all duration-700 ease-out" 
                style={{ 
                  height: heroStep === 1 ? '50%' : `${(heroStep / 1) * 100}%`,
                  transform: heroStep === 1 ? 'translateY(-100%)' : 'translateY(0)',
                  animation: heroStep === 1 ? 'scrollLine 1.5s ease-in-out infinite' : 'none'
                }} 
              />
              <style>{`
                @keyframes scrollLine {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(200%); }
                }
              `}</style>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


