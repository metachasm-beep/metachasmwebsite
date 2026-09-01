import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept17Hud() {
  const containerRef = useRef(null);
  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto relative text-[#00E676] font-mono scroll-smooth no-scrollbar" ref={containerRef}>
      {/* Static HUD Overlay */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 border border-[#00E676]/30 pointer-events-none z-50 flex items-center justify-between px-2">
        <div className="w-2 h-2 border-l border-t border-[#00E676]" />
        <div className="text-[10px] opacity-50">TARGET LOCK</div>
        <div className="w-2 h-2 border-r border-b border-[#00E676]" />
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/80 to-[#050505]" />
      
      <div className="py-[50vh] flex flex-col items-center gap-16 relative z-10">
        {ALL_TECH.map((tech, i) => (
          <HudItem key={i} tech={tech} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
}

function HudItem({ tech, containerRef }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: ["start end", "end start"] });
  // Map progress to distance from center (0.5 is center)
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.5, 1.5, 0.5]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.2, 1, 0.2]);
  const color = useTransform(scrollYProgress, [0.45, 0.5, 0.55], ['#00E676', tech.color, '#00E676']);

  return (
    <motion.div ref={ref} style={{ scale, opacity, color }} className="text-2xl font-bold uppercase tracking-widest text-center w-full flex flex-col items-center">
      {tech.name}
      <motion.div style={{ opacity }} className="text-[8px] mt-2 opacity-50 tracking-[0.5em]">{tech.category} // V_1.0</motion.div>
    </motion.div>
  );
}