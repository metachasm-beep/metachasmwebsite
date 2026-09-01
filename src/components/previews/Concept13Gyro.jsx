import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));

export default function Concept13Gyro() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e) => {
      // Very basic gyro mapping
      setRotation({ x: e.beta || 0, y: e.gamma || 0 });
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] perspective-[1000px] overflow-hidden">
      <h2 className="text-white text-xl font-bold absolute top-10">Gyroscopic Sphere (Tilt Device)</h2>
      <motion.div 
        className="relative w-64 h-64 preserve-3d"
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        {ALL_TECH.map((tech, i) => {
          // distribute on sphere
          const phi = Math.acos(-1 + (2 * i) / ALL_TECH.length);
          const theta = Math.sqrt(ALL_TECH.length * Math.PI) * phi;
          const x = 120 * Math.cos(theta) * Math.sin(phi);
          const y = 120 * Math.sin(theta) * Math.sin(phi);
          const z = 120 * Math.cos(phi);
          
          return (
            <div 
              key={i} 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold whitespace-nowrap"
              style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)`, color: tech.color }}
            >
              {tech.name}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}