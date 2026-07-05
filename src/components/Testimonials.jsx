import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './react-bits/DecryptedText/DecryptedText';

const TESTIMONIALS = [
  {
    id: 1,
    title: "Global Fintech Leader",
    description: "Metachasm completely overhauled our digital ecosystem. They didn't just build an app; they engineered a platform that handles millions of transactions flawlessly.",
  },
  {
    id: 2,
    title: "Next-Gen SaaS Startup",
    description: "Working with them felt like looking into the future. The design aesthetics and the raw performance of the web application they delivered blew our investors away.",
  },
  {
    id: 3,
    title: "E-Commerce Giant",
    description: "The gap between idea and live product really is non-existent with this team. From concept to deployment, everything was executed with surgical precision.",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-[#111111] overflow-hidden"
    >
      <div className="w-full flex flex-col items-center justify-center relative z-10 flex-1 max-w-[1200px] mx-auto px-6 py-12 md:py-24">
        
        {/* Header section perfectly centered */}
        <div className="w-full flex flex-col items-center text-center mb-12 md:mb-20">
          <p
            className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [03] — Proof of Concept
          </p>
          <h2
            className="text-[clamp(2.5rem,6vw,7rem)] font-black tracking-tighter text-[#111111] uppercase leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Verified. <span className="text-[#0055FF]">Impact.</span>
          </h2>
        </div>

        {/* Minimalist Data Log / Testimonial Viewer */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center relative min-h-[300px]">
          
          <div className="w-full border-t border-b border-[#111111]/15 py-12 md:py-16 px-4 md:px-12 flex flex-col items-center text-center relative overflow-hidden bg-[#F9F9F6]/20">
            {/* Scanline Background */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(17,17,17,1) 1px, transparent 1px)',
                backgroundSize: '100% 4px'
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Quote Text */}
                <p 
                  className="text-xl md:text-3xl leading-relaxed md:leading-snug mb-8 max-w-3xl text-[#111111]/80"
                  style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontStyle: 'italic' }}
                >
                  "{TESTIMONIALS[activeIndex].description}"
                </p>

                {/* Author / Client Title */}
                <h3 
                  className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#0055FF]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <DecryptedText
                    text={TESTIMONIALS[activeIndex].title}
                    animateOn="view"
                    speed={40}
                    maxIterations={8}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$"
                    className="text-current"
                    encryptedClassName="text-[#111111]/20"
                  />
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-4 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 h-[2px] ${activeIndex === idx ? 'w-8 bg-[#0055FF]' : 'w-4 bg-[#111111]/20 hover:bg-[#111111]/50'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}


