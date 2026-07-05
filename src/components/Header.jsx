import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './ui/Logo';

// Folds mapping in TunnelExperience:
// 0: Hero
// 1: About (Ecosystem)
// 2: Services (Capabilities)
// 3: Testimonials (Proof of Concept)
// 4: Tech (Architecture)
// 5: FAQ (Intel)
// 6: Contact (Initiate)
const NAV_LINKS = [
  { label: 'Ecosystem', index: 1, code: '01' },
  { label: 'Capabilities', index: 2, code: '02' },
  { label: 'Concept', index: 3, code: '03' },
  { label: 'Architecture', index: 4, code: '04' },
  { label: 'Intel', index: 5, code: '05' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleNavClick = (e, index) => {
    e.preventDefault();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('goToFold', { detail: { index } }));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F9F6]/80 backdrop-blur-lg border-b border-[#111111]/10 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto px-6 md:px-12 h-16 flex items-center justify-between max-w-[1600px]">

          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, 0)}
            className="flex items-center gap-3 group" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Logo size={28} />
            <span className="text-[13px] font-bold tracking-[0.25em] text-[#111111] uppercase group-hover:opacity-60 transition-opacity duration-300">
              Metachasm
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-10" style={{ fontFamily: 'var(--font-mono)' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.code}
                href={`#fold-${link.index}`}
                onClick={(e) => handleNavClick(e, link.index)}
                className="relative flex items-center px-4 xl:px-8 py-5 text-[10px] xl:text-xs tracking-widest uppercase text-[#111111]/50 hover:text-[#111111] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-[#111111] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={(e) => handleNavClick(e, 6)}
              className="text-[10px] xl:text-xs tracking-[0.2em] uppercase font-semibold text-[#111111] border border-[#111111] px-6 py-2.5 hover:bg-[#111111] hover:text-[#F9F9F6] transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            className="lg:hidden text-[#111111] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[99] bg-[#F9F9F6]/95 backdrop-blur-xl flex flex-col items-start justify-center px-10"
          >
            <button
              className="absolute top-5 right-6 text-[#111111] p-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-[9px] tracking-[0.3em] text-[#111111]/40 uppercase mb-12" style={{ fontFamily: 'var(--font-mono)' }}>
              // Navigation
            </p>

            <nav className="flex flex-col gap-0 w-full" style={{ fontFamily: 'var(--font-heading)' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.code}
                  href={`#fold-${link.index}`}
                  onClick={(e) => handleNavClick(e, link.index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="flex items-baseline py-5 border-b border-[#111111]/10 text-3xl md:text-4xl text-[#111111] hover:pl-4 transition-all duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <button
              onClick={(e) => handleNavClick(e, 6)}
              className="mt-16 text-sm tracking-[0.2em] uppercase font-semibold text-[#111111] border border-[#111111] px-10 py-4 hover:bg-[#111111] hover:text-[#F9F9F6] transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


