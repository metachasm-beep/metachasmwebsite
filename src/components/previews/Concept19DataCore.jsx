import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept19DataCore() {
  const [rotation, setRotation] = useState(0);
  const items = ALL_TECH;
  const radius = 180;

  return (
    <div className="w-full h-full bg-[#050b14] flex flex-col items-center justify-center font-mono overflow-hidden perspective-[1000px]">
      <div className="absolute top-10 text-[#00aaff] text-xs tracking-[0.4em] z-50">CYLINDRICAL ARRAY</div>
      
      {/* 3D Cylinder Container */}
      <motion.div 
        className="relative w-full h-64 preserve-3d cursor-grab active:cursor-grabbing"
        drag="x"
        onDrag={(e, info) => setRotation(r => r + info.delta.x * 0.5)}
        style={{ rotateY: rotation }}
      >
        {items.map((tech, i) => {
          const angle = (i / items.length) * 360;
          return (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 text-center text-[#00aaff] border border-[#00aaff]/20 bg-[#00aaff]/5 p-2 backdrop-blur-sm"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                // Highlight items facing front
                opacity: 1,
              }}
            >
              <div className="text-[8px] opacity-50 mb-1">{tech.category}</div>
              <div className="text-xl font-bold">{tech.name}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Holographic floor projection */}
      <div className="absolute bottom-20 w-64 h-16 bg-[#00aaff] blur-3xl opacity-20 rounded-[100%]" style={{ transform: 'rotateX(60deg)' }} />
    </div>
  );
}