import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept24Biometric() {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col relative overflow-hidden font-mono">
      <div className="text-[10px] text-[#0066ff] tracking-[0.2em] p-6 text-center absolute top-0 w-full">
        SECURITY CLEARANCE REQUIRED
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 gap-4 relative z-10">
        {ALL_TECH.slice(0, 7).map((tech, i) => (
          <div key={i} className="flex justify-between border-b border-[#0066ff]/20 pb-2">
            <span className="text-[#0066ff] text-xs">0{i+1}</span>
            <ScrambledText text={tech.name} isDecrypted={isDecrypted} chars={chars} />
            <span className="text-xs opacity-30">{tech.category.substring(0,3).toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Thumbprint zone */}
      <div className="h-48 w-full flex items-center justify-center relative z-20">
        <motion.button 
          onPointerDown={() => setIsDecrypted(true)}
          onPointerUp={() => setIsDecrypted(false)}
          onPointerLeave={() => setIsDecrypted(false)}
          className="w-24 h-24 rounded-full border border-[#0066ff]/40 flex items-center justify-center relative touch-none select-none"
          whileTap={{ scale: 0.95, borderColor: '#0066ff', boxShadow: '0 0 30px rgba(0,102,255,0.3)' }}
        >
          <div className={`w-16 h-16 rounded-full transition-colors duration-300 ${isDecrypted ? 'bg-[#0066ff]' : 'bg-[#0066ff]/10'}`} />
          <div className="absolute -bottom-6 text-[9px] text-[#0066ff]/60 tracking-widest whitespace-nowrap">HOLD TO DECRYPT</div>
        </motion.button>
      </div>
    </div>
  );
}

function ScrambledText({ text, isDecrypted, chars }) {
  const [display, setDisplay] = useState(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
  
  React.useEffect(() => {
    let interval;
    if (isDecrypted) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplay(text.split('').map((letter, index) => {
          if(index < iteration) return letter;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        if(iteration >= text.length) clearInterval(interval);
        iteration += 0.5;
      }, 30);
    } else {
      interval = setInterval(() => {
        setDisplay(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isDecrypted, text]);

  return <span className={`text-lg font-bold tracking-wider ${isDecrypted ? 'text-white' : 'text-white/40'}`}>{display}</span>;
}