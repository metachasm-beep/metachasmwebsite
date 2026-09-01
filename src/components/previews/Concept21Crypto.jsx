import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept21Crypto() {
  const [rotation, setRotation] = useState(0);
  const [decryptedText, setDecryptedText] = useState('');
  
  const selectedIndex = Math.abs(Math.round(rotation / (360 / TECH_CATEGORIES.length)) % TECH_CATEGORIES.length);
  const category = TECH_CATEGORIES[selectedIndex];
  
  useEffect(() => {
    // Decrypt animation
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const target = category.items.join(' \n ');
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDecryptedText(target.split('').map((letter, index) => {
        if(index < iteration) return letter;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if(iteration >= target.length) clearInterval(interval);
      iteration += 1;
    }, 10);
    
    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <div className="w-full h-full bg-[#020202] flex items-center justify-center font-mono overflow-hidden relative">
      {/* Decrypted Output */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
        <div className="text-center whitespace-pre-wrap text-[10px] leading-relaxed opacity-60 text-white">
          {decryptedText}
        </div>
      </div>
      
      {/* Massive Dial */}
      <motion.div 
        className="w-[150vw] h-[150vw] md:w-[600px] md:h-[600px] rounded-full border-[2px] border-dashed border-white/20 absolute cursor-grab active:cursor-grabbing flex items-center justify-center z-20 mix-blend-difference"
        drag="rotate"
        onDrag={(e, info) => setRotation(r => r + info.delta.x)}
        style={{ rotate: rotation }}
      >
        {TECH_CATEGORIES.map((cat, i) => (
          <div 
            key={i} 
            className="absolute top-4 w-4 h-4 bg-white rounded-full flex items-center justify-center"
            style={{ transform: `rotate(${i * (360 / TECH_CATEGORIES.length)}deg) translateY(-280px)` }}
          />
        ))}
      </motion.div>
      
      {/* Center Lock Reticle */}
      <div className="absolute w-16 h-16 border-2 border-white/50 rounded-full z-30 pointer-events-none flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      <div className="absolute top-10 text-white/50 text-[10px] tracking-[0.5em] z-50">UPLINK ESTABLISHED</div>
    </div>
  );
}