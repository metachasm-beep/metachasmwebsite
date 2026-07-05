import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { useInView } from 'framer-motion';
import DecryptedText from './react-bits/DecryptedText/DecryptedText';

const SERVICES = [
  {
    id: '01',
    title: 'IMMERSIVE WEB',
    tag: 'Digital Experience',
    desc: 'High-performance SPAs with fluid motion design, WebGL interactions, and optimized rendering pipelines. We make browsers feel like native apps.',
    keywords: ['WebGL', 'Motion', 'SPA', 'Performance'],
  },
  {
    id: '02',
    title: 'MOBILE ECOSYSTEMS',
    tag: 'Native Platform',
    desc: 'Native and cross-platform mobile experiences engineered for maximum performance. From Swift to Kotlin to React Native — pixel-perfect across every device.',
    keywords: ['iOS', 'Android', 'React Native', 'Swift'],
  },
  {
    id: '03',
    title: 'CLOUD PLATFORMS',
    tag: 'Infrastructure',
    desc: 'Scalable cloud infrastructures, serverless edge computing, and high-throughput custom APIs. The invisible backbone of everything we build.',
    keywords: ['Serverless', 'Edge', 'API', 'Scale'],
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    anime({
      targets: '#morphing-path',
      d: [
        { value: 'M 10 80 Q 95 10 180 80 T 350 80 T 520 80 T 690 80' },
        { value: 'M 10 80 Q 95 150 180 80 T 350 80 T 520 80 T 690 80' },
        { value: 'M 10 80 Q 95 10 180 80 T 350 150 T 520 80 T 690 80' }
      ],
      easing: 'easeInOutSine',
      duration: 4000,
      loop: true,
      direction: 'alternate',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="fold min-h-screen w-full flex flex-col items-center justify-center bg-transparent text-[#111111] relative overflow-hidden"
      id="services"
    >
      {/* Morphing SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] text-[#111111]"
        viewBox="0 0 700 300"
        preserveAspectRatio="none"
      >
        <path
          id="morphing-path"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          d="M 10 80 Q 95 80 180 80 T 350 80 T 520 80 T 690 80"
        />
      </svg>
      
      {/* Main Centered Container */}
      <div className="w-full flex flex-col items-center justify-center relative z-10 flex-1 max-w-[1200px] mx-auto px-6 py-12 md:py-24">
        
        {/* Header section perfectly centered */}
        <div className="w-full flex flex-col items-center text-center mb-16 md:mb-24">
          <p
            className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [02] — Capabilities
          </p>
          <h2
            className="text-[clamp(2rem,6vw,7rem)] font-black tracking-tighter text-[#111111] uppercase leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Terminal Index
          </h2>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col gap-6 md:gap-12 max-w-6xl mt-4 md:mt-8 border-t border-[#111111]/15 pt-6 md:pt-12">
          {SERVICES.map((service, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={service.id}
                className="w-full border-b border-[#111111]/10 relative group cursor-pointer transition-colors duration-300 hover:bg-[#F9F9F6]/40 pb-6 md:pb-10"
                onClick={() => setActiveIndex(isActive ? -1 : index)}
              >
                {/* Accordion Header */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 gap-6 md:gap-8">
                  {/* Left: ID */}
                  <div className="flex items-center gap-6 w-[120px]">
                    <span 
                      className={`text-sm md:text-base tracking-[0.2em] font-medium transition-colors duration-300 ${isActive ? 'text-[#0055FF]' : 'text-[#111111]/40 group-hover:text-[#111111]/70'}`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      SYS_{service.id}
                    </span>
                  </div>
                  
                  {/* Center: Title */}
                  <div className="flex-1 flex justify-start md:justify-center">
                    <h3 
                      className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-[#111111] scale-[1.02] md:scale-105' : 'text-[#111111]/70 group-hover:text-[#111111]'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <DecryptedText
                        text={service.title}
                        animateOn="hover"
                        speed={30}
                        maxIterations={6}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$"
                        className="text-current"
                        encryptedClassName="text-[#111111]/20"
                      />
                    </h3>
                  </div>

                  {/* Right: Tag */}
                  <div className="flex items-center md:justify-end gap-3 w-[180px] opacity-60">
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#0055FF]' : 'bg-[#111111]/30 group-hover:bg-[#111111]/60'}`} />
                    <span 
                      className={`text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-[#0055FF] font-bold' : ''}`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Accordion Body */}
                <div 
                  className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[400px] opacity-100 mt-8 pb-4' : 'max-h-0 opacity-0 mt-0'}`}
                >
                  <div className="w-full flex flex-col items-center text-center px-4 md:px-8 max-w-3xl mx-auto">
                    <p 
                      className="text-lg md:text-xl leading-relaxed text-[#111111]/70 mb-8"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                    >
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {service.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] tracking-[0.25em] uppercase px-5 py-3 border transition-colors duration-300 border-[#111111]/20 text-[#111111]/60 bg-transparent hover:border-[#0055FF] hover:text-[#0055FF]"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Optional subtle active indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0055FF]" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


