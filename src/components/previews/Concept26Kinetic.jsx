import React from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept26Kinetic() {
  return (
    <div className="w-full h-full bg-white text-black flex flex-col overflow-hidden font-sans">
      {/* Massive scrolling marquee */}
      <div className="h-1/3 border-b border-black/10 flex flex-col justify-center overflow-hidden bg-black text-white relative">
        <motion.div 
          className="flex whitespace-nowrap text-7xl md:text-8xl font-black tracking-tighter uppercase"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        >
          <span className="px-4">TECHNOLOGY STACK <span className="text-[#ff3300]">&times;</span></span>
          <span className="px-4">TECHNOLOGY STACK <span className="text-[#ff3300]">&times;</span></span>
          <span className="px-4">TECHNOLOGY STACK <span className="text-[#ff3300]">&times;</span></span>
        </motion.div>
      </div>

      {/* Snap Carousel */}
      <div className="h-2/3 flex overflow-x-auto snap-x snap-mandatory no-scrollbar p-6 gap-6 items-center">
        {ALL_TECH.map((tech, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="shrink-0 w-64 h-80 bg-zinc-100 snap-center p-6 flex flex-col justify-between"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{tech.category}</div>
            <div className="text-4xl font-bold tracking-tight">{tech.name}</div>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xl mt-auto self-end">
              &rarr;
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}