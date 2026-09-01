import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));

export default function Concept14Marquee() {
  const [activeTech, setActiveTech] = useState(null);
  const cols = [ALL_TECH.slice(0, 5), ALL_TECH.slice(5, 10), ALL_TECH.slice(10, 15)];

  return (
    <div className="w-full h-full flex bg-[#F9F9F6] overflow-hidden relative">
      {cols.map((col, i) => (
        <div key={i} className="flex-1 h-full overflow-hidden border-r border-black/10 relative">
          <motion.div 
            className="flex flex-col gap-8 py-8"
            animate={{ y: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 15 + i * 5, ease: 'linear' }}
          >
            {[...col, ...col, ...col].map((tech, j) => (
              <div 
                key={j} 
                className="text-4xl md:text-6xl font-black text-center cursor-pointer hover:text-blue-600 transition-colors uppercase leading-none"
                onClick={() => setActiveTech(tech)}
                style={{ WebkitTextStroke: '1px black', color: 'transparent' }}
              >
                {tech.name}
              </div>
            ))}
          </motion.div>
        </div>
      ))}
      
      {/* Bottom Sheet */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full bg-black text-white p-8 rounded-t-3xl"
        initial={{ y: '100%' }}
        animate={{ y: activeTech ? '0%' : '100%' }}
      >
        <button className="absolute top-4 right-4 text-white/50" onClick={() => setActiveTech(null)}>Close</button>
        {activeTech && (
          <>
            <div className="text-xs tracking-widest" style={{ color: activeTech.color }}>{activeTech.category}</div>
            <div className="text-3xl font-bold mt-2">{activeTech.name}</div>
            <p className="mt-4 text-white/70">Lorem ipsum dolor sit amet. Tap another item to update this bottom sheet instantly.</p>
          </>
        )}
      </motion.div>
    </div>
  );
}