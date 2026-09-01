import React, { useState } from 'react';
import Concept17Hud from './Concept17Hud';
import Concept18Cyberdeck from './Concept18Cyberdeck';
import Concept19DataCore from './Concept19DataCore';
import Concept20Circuit from './Concept20Circuit';
import Concept21Crypto from './Concept21Crypto';
import Concept22Terminal from './Concept22Terminal';
import Concept23ColdLuxury from './Concept23ColdLuxury';
import Concept24Biometric from './Concept24Biometric';
import Concept25Blueprint from './Concept25Blueprint';
import Concept26Kinetic from './Concept26Kinetic';
import Concept27Spotlight from './Concept27Spotlight';
import Concept28LiquidGlass from './Concept28LiquidGlass';
import Concept29Monolith from './Concept29Monolith';
import Concept30PhysicsDeck from './Concept30PhysicsDeck';
import Concept31Editorial from './Concept31Editorial';

const PREVIEWS = [
  { id: 27, name: 'Cinematic Spotlight', Component: Concept27Spotlight },
  { id: 28, name: 'Liquid Glass', Component: Concept28LiquidGlass },
  { id: 29, name: 'The Monolith', Component: Concept29Monolith },
  { id: 30, name: 'Physics Deck', Component: Concept30PhysicsDeck },
  { id: 31, name: 'Editorial Accordion', Component: Concept31Editorial },
  // Older futuristic ones
  { id: 22, name: 'Terminal Log', Component: Concept22Terminal },
  { id: 23, name: 'Cold Luxury', Component: Concept23ColdLuxury },
  { id: 24, name: 'Biometric Scan', Component: Concept24Biometric },
  { id: 25, name: 'Blueprint Grid', Component: Concept25Blueprint },
  { id: 26, name: 'Kinetic Marquee', Component: Concept26Kinetic },
];

export default function PreviewLab({ onClose }) {
  const [activePreview, setActivePreview] = useState(0);
  const ActiveComponent = PREVIEWS[activePreview].Component;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-row">
      {/* Sidebar for buttons */}
      <div className="w-64 border-r border-white/10 flex flex-col p-4 shrink-0 bg-zinc-950 overflow-y-auto">
        <h2 className="text-white/50 text-xs tracking-widest uppercase mb-6">Metachasm Lab</h2>
        <div className="flex flex-col gap-2 mb-8">
          {PREVIEWS.map((p, i) => (
            <button 
              key={p.id}
              onClick={() => setActivePreview(i)}
              className={`px-4 py-3 rounded-lg text-xs font-bold text-left transition-colors ${activePreview === i ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mt-auto py-3 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-400/10 rounded-lg">
          Exit Lab
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12 bg-[#050505]">
        {/* Render a mobile phone frame simulation */}
        <div className="w-full h-full md:w-[390px] md:h-[844px] md:rounded-[3rem] md:border-[8px] border-zinc-800 overflow-hidden relative shadow-2xl bg-black">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}