import React from 'react';

const TECH_CATEGORIES = [
  { id: '01', title: 'Frontend', color: '#ffffff', items: ['React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js'] },
  { id: '02', title: 'Backend', color: '#ffffff', items: ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis'] },
  { id: '03', title: 'Mobile', color: '#ffffff', items: ['Swift', 'Kotlin', 'React Native', 'Expo', 'iOS'] }
];
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id })));


// Simulated Sticky Stack since we don't have GSAP ScrollTrigger active in this mini preview
export default function Concept29Monolith() {
  return (
    <div className="w-full h-full bg-black text-white font-sans overflow-y-auto no-scrollbar relative">
      {TECH_CATEGORIES.map((cat, i) => (
        <div 
          key={i} 
          className="w-full h-[100dvh] sticky top-0 flex flex-col justify-between p-8 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
          style={{ 
            backgroundColor: `hsl(0, 0%, ${5 + (i * 5)}%)`, 
            zIndex: i 
          }}
        >
          <div className="text-[10px] tracking-[0.2em] uppercase opacity-50">Layer // {cat.id}</div>
          
          <div className="flex flex-col gap-6 my-auto">
            <h2 className="text-6xl font-light tracking-tighter mb-4">{cat.title}</h2>
            {cat.items.map((item, j) => (
              <div key={j} className="text-xl opacity-80 border-b border-white/10 pb-4 flex justify-between">
                <span>{item}</span>
                <span className="opacity-30">0{j+1}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] tracking-widest uppercase opacity-30 text-center animate-bounce">
            {i < TECH_CATEGORIES.length - 1 ? 'Scroll' : 'End of Stack'}
          </div>
        </div>
      ))}
    </div>
  );
}