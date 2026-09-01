import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));

export default function Concept15Story() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TECH_CATEGORIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTap = (e) => {
    const x = e.clientX;
    if (x < window.innerWidth / 2) {
      setCurrentIndex(prev => (prev === 0 ? TECH_CATEGORIES.length - 1 : prev - 1));
    } else {
      setCurrentIndex(prev => (prev + 1) % TECH_CATEGORIES.length);
    }
  };

  const currentCat = TECH_CATEGORIES[currentIndex];

  return (
    <div className="w-full h-full bg-black relative flex flex-col cursor-pointer overflow-hidden" onClick={handleTap}>
      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-2 z-50">
        {TECH_CATEGORIES.map((cat, i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: i < currentIndex ? '100%' : '0%' }}
              animate={{ width: i === currentIndex ? '100%' : i < currentIndex ? '100%' : '0%' }}
              transition={{ duration: i === currentIndex ? 5 : 0, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: currentCat.color + '20' }}
        >
          <div className="text-sm tracking-[0.5em] text-white/50 mb-8 uppercase">{currentCat.title}</div>
          <div className="flex flex-wrap justify-center gap-4">
            {currentCat.items.map((item, j) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: j * 0.1 }}
                className="text-2xl md:text-4xl font-bold text-white text-center"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}