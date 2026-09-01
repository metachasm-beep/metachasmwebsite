import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Core Phase' },
  { id: 'about', label: 'Ecosystem' },
  { id: 'services', label: 'Capabilities' },
  { id: 'testimonials', label: 'Impact' },
  { id: 'tech', label: 'Architecture' },
  { id: 'faq', label: 'Intel' },
  { id: 'contact', label: 'Contact' }
];

export default function NavigationDots() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleFoldChange = (e) => {
      if (typeof e.detail?.index === 'number') {
        setActiveIndex(e.detail.index);
      }
    };

    window.addEventListener('foldChange', handleFoldChange);
    return () => window.removeEventListener('foldChange', handleFoldChange);
  }, []);

  const handleClick = (index) => {
    window.dispatchEvent(new CustomEvent('goToFold', { detail: { index } }));
  };

  return (
    <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 md:gap-3 pointer-events-auto mix-blend-difference">
      {NAV_ITEMS.map((item, i) => {
        const isActive = activeIndex === i;
        return (
          <div key={item.id} className="relative group flex items-center justify-end">
            {/* Tooltip (Hidden on mobile to prevent overflow) */}
            <span 
              className={`hidden md:block absolute right-8 text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 pointer-events-none text-[#F9F9F6] ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {item.label}
            </span>
            
            {/* Dot */}
            <button
              onClick={() => handleClick(i)}
              aria-label={`Go to ${item.label}`}
              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full focus:outline-none cursor-pointer"
            >
              <div 
                className={`transition-all duration-300 rounded-full bg-[#F9F9F6] ${isActive ? 'w-1.5 h-1.5 md:w-2 md:h-2' : 'w-1 h-1 opacity-40 group-hover:opacity-100 group-hover:w-1.5 group-hover:h-1.5'}`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
