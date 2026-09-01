import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept22Terminal() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-[#00ff41] font-mono p-4 overflow-y-auto no-scrollbar">
      <div className="text-[10px] opacity-50 mb-8 border-b border-[#00ff41]/20 pb-2">
        <span className="block">&gt; SYSTEM.ENV: PRODUCTION</span>
        <span className="block">&gt; INITIALIZING STACK LOG...</span>
      </div>
      
      <div className="flex flex-col gap-1">
        {ALL_TECH.map((tech, i) => {
          const isExpanded = expanded === i;
          return (
            <div key={i} className="flex flex-col">
              <button 
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="text-left w-full hover:bg-[#00ff41]/10 flex gap-2 py-1 transition-colors"
              >
                <span className="opacity-50">[{String(i + 1).padStart(2, '0')}]</span>
                <span className="font-bold">{tech.name}</span>
                <span className="ml-auto opacity-30">{isExpanded ? '[-]' : '[+]'}</span>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-8 py-2 text-[10px] text-[#00ff41]/70 flex flex-col gap-1 border-l border-[#00ff41]/20 ml-[10px] my-1">
                      <span>{'{'}</span>
                      <span className="pl-4">"id": "{tech.id}",</span>
                      <span className="pl-4">"layer": "{tech.category.toUpperCase()}",</span>
                      <span className="pl-4">"status": "ACTIVE",</span>
                      <span className="pl-4">"dependencies": ["core", "ui"]</span>
                      <span>{'}'}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="text-[10px] opacity-50 mt-8 animate-pulse">&gt; _</div>
    </div>
  );
}