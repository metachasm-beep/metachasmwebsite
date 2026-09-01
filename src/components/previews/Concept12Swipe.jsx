import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));

export default function Concept12Swipe() {
  const [cards, setCards] = useState(ALL_TECH);
  
  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setCards(prev => prev.slice(1));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#111111] overflow-hidden">
      <h2 className="text-white text-2xl font-bold mb-8">Swipe Your Stack</h2>
      <div className="relative w-72 h-96">
        <AnimatePresence>
          {cards.slice(0, 3).reverse().map((tech, idx) => {
            const isTop = idx === cards.slice(0, 3).length - 1;
            return (
              <motion.div
                key={tech.name}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1 - (2 - idx) * 0.05, opacity: 1, y: (2 - idx) * -15 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute w-full h-full rounded-2xl flex flex-col items-center justify-center border-2"
                style={{ backgroundColor: '#1a1a1a', borderColor: tech.color }}
              >
                <span className="text-sm font-mono tracking-widest mb-4" style={{ color: tech.color }}>{tech.category}</span>
                <h3 className="text-4xl font-bold text-white text-center">{tech.name}</h3>
                {isTop && <p className="absolute bottom-6 text-xs text-white/40">Swipe Left or Right</p>}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {cards.length === 0 && <div className="text-white text-center mt-20">Stack Complete!</div>}
      </div>
    </div>
  );
}