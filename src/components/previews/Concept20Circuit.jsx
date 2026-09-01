import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept20Circuit() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Power surge line height
  const surgeHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="w-full h-full bg-[#0a0a0a] overflow-y-auto relative no-scrollbar" ref={containerRef}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00FF41 1px, transparent 1px), linear-gradient(90deg, #00FF41 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Central Bus Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[200vh] bg-[#00FF41]/20">
        <motion.div className="w-full bg-[#00FF41] shadow-[0_0_15px_#00FF41]" style={{ height: surgeHeight }} />
      </div>

      <div className="h-[200vh] py-[50vh] relative flex flex-col gap-12 w-full px-6">
        {ALL_TECH.map((tech, i) => {
          const isLeft = i % 2 === 0;
          return (
            <CircuitNode key={i} tech={tech} isLeft={isLeft} containerRef={containerRef} index={i} total={ALL_TECH.length} />
          );
        })}
      </div>
    </div>
  );
}

function CircuitNode({ tech, isLeft, containerRef, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  // Calculate when the surge reaches this node
  const nodePosition = index / total;
  const isPowered = useTransform(scrollYProgress, v => v >= nodePosition);

  return (
    <div ref={ref} className={`w-1/2 flex items-center relative ${isLeft ? 'self-start pr-8 justify-end' : 'self-end pl-8 justify-start'}`}>
      {/* Branch line connecting to center */}
      <motion.div 
        className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#00FF41] shadow-[0_0_10px_#00FF41] ${isLeft ? 'right-0' : 'left-0'}`}
        style={{ width: '2rem' }}
        initial={{ scaleX: 0 }}
        style={{ originX: isLeft ? 1 : 0, scaleX: isPowered }}
      />
      
      {/* Node Box */}
      <motion.div 
        className="border border-[#00FF41]/30 p-3 bg-black flex flex-col font-mono"
        style={{ 
          borderColor: isPowered,
          boxShadow: useTransform(isPowered, p => p ? '0 0 20px rgba(0,255,65,0.3)' : 'none')
        }}
      >
        <span className="text-[#00FF41] text-lg font-bold uppercase">{tech.name}</span>
        <span className="text-[#00FF41]/50 text-[8px] tracking-[0.2em]">{tech.category}</span>
      </motion.div>
    </div>
  );
}