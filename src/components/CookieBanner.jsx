import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner({ onReadPolicy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('metachasm_cookie_consent');
    if (!consent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('metachasm_cookie_consent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('metachasm_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-[100]"
        >
          <div className="bg-[#111111]/90 backdrop-blur-xl border border-[#FAFAFA]/10 shadow-2xl p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-left">
              <h4 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                YOUR PRIVACY. OUR PROTOCOL.
              </h4>
              <p className="text-[#FAFAFA]/70 text-sm leading-relaxed font-sans">
                We use cookies to optimize platform performance and analyze traffic. Under the DPDP Act, you have the right to choose how your data is handled. 
                <button 
                  onClick={onReadPolicy}
                  className="ml-2 text-[#0055FF] hover:text-white underline transition-colors"
                >
                  Read Policy
                </button>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={acceptEssential}
                className="w-full sm:w-auto px-6 py-3 border border-[#FAFAFA]/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-[#FAFAFA]/10 transition-colors rounded"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="w-full sm:w-auto px-6 py-3 bg-[#0055FF] text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors rounded"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


