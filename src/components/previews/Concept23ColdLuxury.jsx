import React from 'react';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#0055FF', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#FF3366', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#00E676', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


export default function Concept23ColdLuxury() {
  return (
    <div className="w-full h-full bg-[#ececf0] text-[#111111] overflow-y-auto no-scrollbar font-sans selection:bg-[#111111] selection:text-white">
      {/* Scroll-snap categories */}
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar border-b border-[#111111]/10 sticky top-0 bg-[#ececf0]/90 backdrop-blur-md z-10">
        {TECH_CATEGORIES.map((cat, i) => (
          <div key={i} className="shrink-0 w-32 snap-start p-4 text-[11px] font-medium tracking-widest uppercase">
            {cat.title}
          </div>
        ))}
      </div>

      {/* Edge-to-edge specs */}
      <div className="flex flex-col">
        {ALL_TECH.map((tech, i) => (
          <div key={i} className="flex flex-col border-b border-[#111111]/10 p-6 gap-8">
            <div className="flex justify-between items-start">
              <span className="text-4xl md:text-5xl font-light tracking-tighter text-[#111111]/20 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#111111]/20 mt-2" />
            </div>
            
            <div>
              <h3 className="text-2xl font-medium tracking-tight mb-1">{tech.name}</h3>
              <p className="text-sm text-[#111111]/60">Primary execution layer for {tech.category.toLowerCase()} architecture.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}