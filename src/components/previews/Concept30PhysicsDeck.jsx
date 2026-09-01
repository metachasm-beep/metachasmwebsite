import React from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#ffffff', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#ffffff', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#ffffff', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept30PhysicsDeck() {
  return (
    <div className="w-full h-full bg-[#111111] text-white font-sans p-6 overflow-y-auto no-scrollbar">
      <div className="text-sm font-light tracking-tight opacity-50 mb-8">Tactile Interface. Press deeply.</div>
      
      <div className="grid grid-cols-2 gap-4">
        {ALL_TECH.map((tech, i) => {
          // Create an asymmetric bento grid
          const isLarge = i === 0 || i === 4 || i === 7;
          
          return (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.96, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`bg-[#1a1a1a] rounded-3xl p-6 flex flex-col justify-between cursor-pointer select-none touch-none ${isLarge ? 'col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square'}`}
            >
              <span className="text-[10px] tracking-widest uppercase opacity-40">{tech.category}</span>
              <span className={`font-medium tracking-tight ${isLarge ? 'text-3xl' : 'text-xl'}`}>{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}