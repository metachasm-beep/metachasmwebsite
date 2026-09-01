import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept18Cyberdeck() {
  const [rotation, setRotation] = useState(0);
  const categories = TECH_CATEGORIES;
  
  // Calculate which category is selected based on rotation
  const selectedIndex = Math.abs(Math.round(rotation / 90) % categories.length);
  const activeCategory = categories[selectedIndex];

  return (
    <div className="w-full h-full bg-[#1a1412] flex flex-col items-center font-mono overflow-hidden" style={{ textShadow: '0 0 5px rgba(255,160,0,0.5)' }}>
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-50" />
      
      {/* Dial Section */}
      <div className="w-full h-1/2 flex flex-col items-center justify-center bg-[#241e1b] border-b-4 border-[#3a302b] shadow-2xl z-10 relative">
        <div className="text-[#ffa000] text-xs tracking-[0.3em] absolute top-8">TUNE BAND</div>
        <motion.div 
          className="w-48 h-48 rounded-full border-[8px] border-[#3a302b] bg-[#1a1412] relative cursor-grab active:cursor-grabbing flex items-center justify-center shadow-inner"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDrag={(e, info) => setRotation(r => r + info.delta.x)}
          style={{ rotate: rotation }}
        >
          {/* Dial Grip Marks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
            <div key={deg} className="absolute w-2 h-6 bg-[#3a302b] rounded-sm" style={{ transform: `rotate(${deg}deg) translateY(-20px)`, top: 20 }} />
          ))}
          <div className="w-16 h-16 rounded-full bg-[#ffa000] blur-md opacity-20" />
        </motion.div>
      </div>

      {/* Terminal Screen Section */}
      <div className="w-full h-1/2 p-6 flex flex-col text-[#ffa000] relative">
        <div className="text-xs opacity-50 mb-4 animate-pulse">C:\SYSTEM\BOOT &gt; RUN {activeCategory.title.toUpperCase()}</div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            className="flex flex-col gap-2"
          >
            {activeCategory.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[#ffa000]/20 pb-1">
                <span className="font-bold text-lg tracking-widest">{item}</span>
                <span className="text-[10px] opacity-60">OK</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
