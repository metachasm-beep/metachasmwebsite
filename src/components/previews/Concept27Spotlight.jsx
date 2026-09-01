import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#ffffff', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#ffffff', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#ffffff', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept27Spotlight() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setScrollProgress(scrollTop / (scrollHeight - clientHeight));
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full h-full bg-[#050505] text-white flex flex-col overflow-y-auto no-scrollbar font-sans relative pb-[50vh] pt-[40vh]"
    >
      {/* Fixed Spotlight gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between">
        <div className="h-[40vh] bg-gradient-to-b from-[#050505] via-[#050505] to-transparent" />
        <div className="h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505] to-transparent" />
      </div>

      <div className="px-8 flex flex-col gap-12 relative z-0">
        {ALL_TECH.map((tech, i) => {
          // A very rough simulated focus calculation for the preview lab
          const itemProgress = i / (ALL_TECH.length - 1);
          const distance = Math.abs(scrollProgress - itemProgress);
          const opacity = Math.max(0.1, 1 - (distance * 4));
          const scale = Math.max(0.9, 1 - (distance * 0.5));
          
          return (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center text-center transition-all duration-300"
              style={{ opacity, transform: `scale(${scale})` }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-4">{tech.category}</span>
              <span className="text-4xl md:text-5xl font-light tracking-tight">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}