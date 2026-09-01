import React, { useState } from 'react';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept25Blueprint() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="w-full h-full bg-[#f4f4f6] text-[#2b5a84] font-mono p-4 overflow-y-auto no-scrollbar relative">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#2b5a84 1px, transparent 1px), linear-gradient(90deg, #2b5a84 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      
      <div className="text-[10px] uppercase tracking-widest border-b border-[#2b5a84] pb-2 mb-6">
        SCHEMATIC: STACK_ARCHITECTURE
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-2 gap-4 relative">
        {/* SVG connecting lines could go here, simplified to CSS borders for now */}
        {ALL_TECH.slice(0, 6).map((tech, i) => {
          const isActive = activeNode === i;
          const isLarge = i === 0 || i === 3;
          return (
            <button
              key={i}
              onClick={() => setActiveNode(isActive ? null : i)}
              className={`border p-4 text-left relative transition-all duration-300 ${isLarge ? 'col-span-2' : 'col-span-1'} ${isActive ? 'border-[#2b5a84] bg-[#2b5a84]/10 shadow-[0_0_15px_rgba(43,90,132,0.2)]' : 'border-[#2b5a84]/30 bg-white/50'}`}
            >
              <div className="text-[8px] opacity-60 mb-2">{tech.category} // NODE_{i}</div>
              <div className="text-xl font-bold">{tech.name}</div>
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#2b5a84] rounded-full animate-ping" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 border border-[#2b5a84]/30 p-4 bg-white/50 text-[9px] leading-relaxed">
        DIAGRAM EXPLANATION:<br/>
        Select a node to trace dependencies across the application layer. Solid lines indicate runtime requirement.
      </div>
    </div>
  );
}