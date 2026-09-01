import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_CATEGORIES = [
  { 
    id: '01', 
    title: 'Frontend / Client',
    items: [
      { name: 'React 19', desc: 'Concurrent rendering and server-first architecture.' },
      { name: 'Next.js 15', desc: 'React framework for production-grade React Server Components.' },
      { name: 'Tailwind v4', desc: 'Utility-first CSS engine with unified configuration.' },
      { name: 'WebGL', desc: 'Low-level API for hardware-accelerated 2D and 3D graphics.' },
      { name: 'Three.js', desc: 'High-level 3D library abstracting WebGL complexities.' }
    ]
  },
  { 
    id: '02', 
    title: 'Backend / Infra',
    items: [
      { name: 'Node.js', desc: 'Asynchronous event-driven JavaScript runtime.' },
      { name: 'Go', desc: 'Concurrent, garbage-collected systems programming language.' },
      { name: 'Rust', desc: 'Memory-safe systems programming with zero-cost abstractions.' },
      { name: 'PostgreSQL', desc: 'Advanced open-source relational database management system.' },
      { name: 'Redis', desc: 'In-memory data structure store, used as a database, cache, and broker.' }
    ]
  },
  { 
    id: '03', 
    title: 'Mobile / Native',
    items: [
      { name: 'Swift', desc: 'Compiled programming language for iOS, macOS, watchOS, and tvOS.' },
      { name: 'Kotlin', desc: 'Statically typed language targeting the JVM, Android, and JavaScript.' },
      { name: 'React Native', desc: 'Framework for building native apps using React.' },
      { name: 'Expo', desc: 'Universal platform for making truly native apps with JavaScript.' },
      { name: 'CoreML', desc: 'Machine learning framework used across Apple products.' }
    ]
  }
];

export default function Tech() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="fold min-h-[100dvh] w-full flex flex-col bg-[#ececf0] text-[#111111] overflow-hidden relative"
      id="tech"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Subtle Noise Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-multiply z-0 pointer-events-none" />

      {/* 
        Horizontal scroll-snap pills for ecosystem categories 
        Using pt-[12vh] to clear the global HUD overlay headers in TunnelExperience
      */}
      <div className="flex-none pt-[12vh] md:pt-[15vh] pb-4 px-4 md:px-8 border-b border-[#111111]/10 relative z-10">
        <div className="max-w-6xl mx-auto flex overflow-x-auto md:justify-center snap-x snap-mandatory hide-scrollbar gap-4 items-center">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mr-2 shrink-0 hidden md:block">
            Select Spec:
          </span>
          {TECH_CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 snap-start px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === i 
                  ? 'bg-[#111111] text-[#ececf0] shadow-sm' 
                  : 'bg-transparent text-[#111111]/60 hover:bg-[#111111]/10 border border-[#111111]/20'
              }`}
            >
              {cat.id} - {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* 
        Below, each technology is a stark, edge-to-edge specification tile.
        flex-1 forces this container to take all remaining height exactly.
      */}
      <div className="flex-1 w-full flex flex-col px-4 md:px-8 pb-8 relative z-10">
        <div className="w-full h-full max-w-6xl mx-auto flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex-1 w-full h-full flex flex-col"
            >
              {TECH_CATEGORIES[activeTab].items.map((tech, i) => (
                <div 
                  key={i} 
                  className="flex-1 flex flex-col justify-center border-b border-[#111111]/10 last:border-b-0 group cursor-default"
                >
                  <div className="flex flex-row items-center justify-between w-full h-full py-2 gap-4">
                    
                    {/* Huge numerical index */}
                    <div className="flex-none w-16 md:w-24 overflow-hidden flex items-center">
                      <span className="text-5xl md:text-7xl font-light tracking-tighter text-[#111111]/10 -ml-2 group-hover:text-[#111111]/30 transition-colors duration-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content block: Tech name and 1-line copy */}
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-start gap-1 md:gap-8 min-w-0">
                      <h3 className="text-xl md:text-3xl font-medium tracking-tight whitespace-nowrap text-[#111111]">
                        {tech.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-[#111111]/60 truncate font-mono uppercase tracking-widest mt-1 md:mt-0">
                        {tech.desc}
                      </p>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex-none w-4 h-4 rounded-full border border-[#111111]/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#111111]/30 group-hover:bg-[#111111] transition-colors" />
                    </div>
                    
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
