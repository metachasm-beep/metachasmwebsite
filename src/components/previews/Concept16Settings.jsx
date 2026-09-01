import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));

export default function Concept16Settings() {
  const [expanded, setExpanded] = useState('01');
  const [toggles, setToggles] = useState({});

  const handleToggle = (item) => {
    if (navigator.vibrate) navigator.vibrate(50);
    setToggles(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="w-full h-full bg-[#f2f2f7] overflow-y-auto pb-20">
      <div className="p-8 pb-4">
        <h2 className="text-3xl font-bold text-black">Settings</h2>
        <p className="text-black/50 text-sm mt-1">Configure your stack.</p>
      </div>

      <div className="px-4 flex flex-col gap-6">
        {TECH_CATEGORIES.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <button 
              className="w-full p-4 flex justify-between items-center bg-white z-10 relative"
              onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: cat.color }}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="font-semibold text-black">{cat.title}</span>
              </div>
              <span className="text-black/30 font-bold">{expanded === cat.id ? '−' : '+'}</span>
            </button>
            
            <AnimatePresence>
              {expanded === cat.id && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-2">
                    {cat.items.map((item, i) => (
                      <div key={item} className="flex justify-between items-center py-3 border-t border-gray-100">
                        <span className="text-black/80">{item}</span>
                        <button 
                          onClick={() => handleToggle(item)}
                          className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${toggles[item] ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <motion.div 
                            className="w-5 h-5 bg-white rounded-full shadow-sm"
                            animate={{ x: toggles[item] ? 20 : 0 }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}