import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroGodRays } from './ui/hero-god-rays';
import { MorphText } from './ui/morph-text';
import Logo from './ui/Logo';

import About from './About';
import Services from './Services';
import Testimonials from './Testimonials';
import Tech from './Tech';
import FAQ from './FAQ';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_LAYERS = 7;
const NAV_HASHES = ['hero', 'ecosystem', 'capabilities', 'concept', 'architecture', 'intel', 'contact'];

const DECRYPTION_STATES = [
  "METACHASM",
  "APPS & WEBSITES"
];

export default function TunnelExperience() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const [heroStep, setHeroStep] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.set('.tunnel-layer', { autoAlpha: 0, y: 40, zIndex: 10 });
      gsap.set('.tunnel-layer-0', { autoAlpha: 1, y: 0, zIndex: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${TOTAL_LAYERS * 100}%`,
          pin: pinnedRef.current,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            
            // Hero Step Logic
            const nextStep = p < (0.5 / TOTAL_LAYERS) ? 0 : 1;
            setHeroStep(prev => prev === nextStep ? prev : nextStep);

            const currentSegment = Math.floor(p * TOTAL_LAYERS);
            const clampedSegment = Math.min(currentSegment, TOTAL_LAYERS - 1);

            window.dispatchEvent(new CustomEvent('foldChange', { 
              detail: { index: clampedSegment, hash: NAV_HASHES[clampedSegment] } 
            }));
          }
        }
      });

      // Segment 0: Hero Decrypt (Handled by AnimeJS via state)
      tl.to({}, { duration: 1 }); 

      // Segments 1-6: Layer Transitions
      for (let i = 0; i < TOTAL_LAYERS - 1; i++) {
        tl.to(`.tunnel-layer-${i}`, {
          autoAlpha: 0,
          y: -40,
          duration: 0.5,
          ease: 'power2.inOut'
        }, i + 1);

        tl.fromTo(`.tunnel-layer-${i + 1}`, 
          { autoAlpha: 0, y: 40, zIndex: 50 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.inOut' },
          i + 1.5
        );
      }
    }, containerRef);
    
    const handleGoToFold = (e) => {
      const index = e.detail?.index;
      if (typeof index === 'number') {
        const targetMultiplier = index === 0 ? 0 : index + 1;
        window.scrollTo({
          top: targetMultiplier * window.innerHeight,
          behavior: 'smooth'
        });
      }
    };
    window.addEventListener('goToFold', handleGoToFold);

    const parallaxBgs = gsap.utils.toArray('.parallax-bg');
    gsap.set(parallaxBgs, { scale: 1.05 });
    const xTo = gsap.quickTo(parallaxBgs, 'x', { duration: 1.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(parallaxBgs, 'y', { duration: 1.5, ease: 'power2.out' });

    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    const onResize = () => { winWidth = window.innerWidth; winHeight = window.innerHeight; };
    window.addEventListener('resize', onResize, { passive: true });

    const onMouseMove = (e) => {
      const x = (e.clientX / winWidth - 0.5) * 2;
      const y = (e.clientY / winHeight - 0.5) * 2;
      xTo(x * 30);
      yTo(y * 30);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('goToFold', handleGoToFold);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (heroStep === 1) {
      anime({
        targets: `.hero-text-0`,
        letterSpacing: ['-0.025em', '0.8em'],
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(20px)'],
        duration: 600,
        easing: 'easeInExpo'
      });
      anime({
        targets: `.hero-text-1`,
        letterSpacing: ['0.8em', '-0.025em'],
        opacity: [0, 1],
        filter: ['blur(20px)', 'blur(0px)'],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    } else {
      anime({
        targets: `.hero-text-0`,
        letterSpacing: ['0.8em', '-0.025em'],
        opacity: [0, 1],
        filter: ['blur(20px)', 'blur(0px)'],
        duration: 1000,
        easing: 'easeOutExpo'
      });
      anime({
        targets: `.hero-text-1`,
        opacity: 0,
        duration: 300
      });
    }
  }, [heroStep]);

  return (
    <section ref={containerRef} className="w-full relative bg-background text-foreground font-sans select-none">
      <div ref={pinnedRef} className="w-full h-screen relative overflow-hidden">
        
        {/* ── LAYER 7 (index 6): CONTACT ──────────────────────────────────── */}
        <div className="tunnel-layer-6 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
          <img
            src="/assets/bg-parallax-contact.webp"
            className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
            style={{ zIndex: -2, transform: 'scale(1.05)' }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <Contact />
          </div>
        </div>

        {/* ── LAYER 6 (index 5): FAQ ─────────────────────────────────────── */}
        <div className="tunnel-layer-5 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
          <img
            src="/assets/bg-parallax-faq.webp"
            className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            style={{ zIndex: -2, transform: 'scale(1.05)' }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/80 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <FAQ />
          </div>
        </div>

        {/* ── LAYER 5 (index 4): TECH ─────────────────────────────────────── */}
        <div className="tunnel-layer-4 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
          <img
            src="/assets/bg-parallax-tech.webp"
            className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
            style={{ zIndex: -2, transform: 'scale(1.05)' }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <Tech />
          </div>
        </div>

        {/* ── LAYER 4 (index 3): TESTIMONIALS ─────────────────────────────── */}
        <div className="tunnel-layer-3 absolute inset-0 will-change-transform flex flex-col overflow-hidden">
          <img
            src="/assets/bg-parallax-testimonials.webp"
            className="parallax-bg absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
            style={{ zIndex: -2, transform: 'scale(1.05)' }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/80 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <Testimonials />
          </div>
        </div>

        {/* ── LAYER 3 (index 2): SERVICES ─────────────────────────────────── */}
        <div className="tunnel-layer-2 absolute inset-0 will-change-transform flex flex-col">
          <img
            src="/assets/fold-4.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none"
            style={{ zIndex: -1 }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <Services />
          </div>
        </div>

        {/* ── LAYER 2 (index 1): ABOUT ────────────────────────────────────── */}
        <div className="tunnel-layer-1 absolute inset-0 will-change-transform flex flex-col">
          <img
            src="/assets/fold-3.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none"
            style={{ zIndex: -1 }}
            alt=""
          />
          <div
            className="absolute inset-0 bg-[#F9F9F6]/75 pointer-events-none"
            style={{ zIndex: -1 }}
          />
          <div className="relative w-full h-full overflow-y-auto pointer-events-auto hide-scrollbar flex flex-col justify-start">
            <About />
          </div>
        </div>

        {/* ── LAYER 1 (index 0): HERO ─────────────────────────────────────── */}
        <div className="tunnel-layer-0 absolute inset-0 will-change-transform flex items-center justify-center">
          {/* Background / Environment */}
          <div className="absolute inset-0 bg-[#FAFAFA]" style={{ zIndex: -3 }} />
          <img
            src="/assets/fold-1.webp"
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
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
                    className={`hero-text-${idx} absolute inset-0 flex items-center justify-center text-[clamp(1.8rem,7.5vw,8.5rem)] font-black tracking-tight text-[#111111] leading-[0.85] uppercase break-words`}
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
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span 
                className="text-[10px] font-bold tracking-[0.4em] text-[#111111]/40 uppercase group-hover:text-[#0055FF] transition-colors duration-500" 
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {heroStep < 1 ? `SCROLL TO DECRYPT [0/1]` : `Initialize Sequence`}
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
      </div>
    </section>
  );
}
