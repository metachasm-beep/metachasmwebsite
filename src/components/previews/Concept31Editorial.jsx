import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#ffffff', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#ffffff', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#ffffff', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept31Editorial() {
  const [openCat, setOpenCat] = useState('01');

  return (
    <div className="w-full h-full bg-[#050505] text-[#f4f4f5] font-sans px-8 py-16 overflow-y-auto no-scrollbar">
      <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-16">Index / Architecture</div>
      
      <div className="flex flex-col">
        {TECH_CATEGORIES.map((cat, i) => {
          const isOpen = openCat === cat.id;
          
          return (
            <div key={i} className="flex flex-col border-b border-white/10">
              <button 
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                className="py-8 flex justify-between items-baseline text-left w-full"
              >
                <span className={`text-4xl md:text-5xl font-light tracking-tighter transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-40'}`}>
                  {cat.title}
                </span>
                <span className="text-[10px] opacity-30 tracking-widest">{isOpen ? 'CLOSE' : 'OPEN'}</span>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 flex flex-col gap-6 pt-4">
                      {cat.items.map((item, j) => (
                        <div key={j} className="text-xl font-light opacity-80 flex gap-8">
                          <span className="text-[10px] opacity-40 pt-2">0{j+1}</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}