import React from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#ffffff', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#ffffff', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#ffffff', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept28LiquidGlass() {
  return (
    <div className="w-full h-full bg-zinc-950 text-white overflow-hidden font-sans relative">
      {/* Ambient moving background */}
      <motion.div 
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 0%, #1e3a8a 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #1e3a8a 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, #1e3a8a 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #1e3a8a 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-40 blur-2xl"
      />
      
      <div className="absolute inset-0 overflow-y-auto no-scrollbar px-6 pt-24 pb-24 flex flex-col gap-4">
        <h2 className="text-3xl font-light tracking-tight mb-8">Architecture</h2>
        
        {ALL_TECH.map((tech, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.05 }}
            className="w-full p-6 rounded-2xl relative overflow-hidden flex flex-col gap-2"
          >
            {/* The Liquid Glass Frame */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl z-0" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)' }} />
            
            <div className="relative z-20 flex justify-between items-center">
              <span className="text-2xl font-medium tracking-tight">{tech.name}</span>
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs opacity-50">&rarr;</span>
            </div>
            <span className="relative z-20 text-xs tracking-widest uppercase opacity-40">{tech.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}