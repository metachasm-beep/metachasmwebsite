import React, { useRef } from 'react';
import BlurText from './react-bits/BlurText/BlurText';
import Magnet from './react-bits/Magnet/Magnet';
import { AnimatedNumber } from './ui/animated-number';
import { CyberGlitchText } from './ui/cyber-glitch-text';
import { useInView } from 'framer-motion';

const PILLARS = [
  {
    id: '01',
    category: 'Engineering',
    items: [
      'SaaS Platforms',
      'Proprietary Architecture',
      'High-Performance APIs',
      'Edge Computing',
    ],
  },
  {
    id: '02',
    category: 'Experience',
    items: [
      'Interactive WebGL',
      'Fluid Motion Design',
      'Native Mobile',
      'Immersive UI',
    ],
  },
];

const STATS = [
  { value: 5, suffix: '+', label: 'Years Building' },
  { value: 50, suffix: '+', label: 'Products Shipped' },
  { value: 100, suffix: 'M+', label: 'Requests Served' },
];

export default function About() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.5 });
  
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-[#111111] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center gap-16 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-24">

        {/* ── HEADER BAR ───────────────────────────────────────────────── */}
        <div className="w-full flex flex-col items-center text-center mb-4 md:mb-8">
          <p
            className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [01] — Ecosystem
          </p>
        </div>

        {/* ── HEADLINE ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center leading-[0.88] tracking-tighter">
          <BlurText
            text="DIGITAL"
            delay={80}
            animateBy="letters"
            direction="top"
            className="font-black uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 7vw, 7rem)',
              color: '#111111',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          />
          <div style={{ marginTop: '-0.1em' }}>
            <CyberGlitchText 
              text="ECOSYSTEMS" 
              className="font-black uppercase tracking-tighter"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 7vw, 7rem)',
                color: '#111111',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            />
          </div>
        </div>

        {/* ── DESCRIPTOR TAGLINE ───────────────────────────────────────── */}
        <p
          className="max-w-3xl italic leading-[1.7] text-center mx-auto mb-4"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            fontWeight: 300,
            color: 'rgba(17,17,17,0.60)',
            letterSpacing: '0.01em',
          }}
        >
          We don't build products. We architect ecosystems — layered, breathing
          systems that exist at the intersection of rigorous engineering and
          obsessive craft. Every surface is intentional. Every decision compounds.
        </p>

        {/* ── STATS ROW ────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 border-y w-full max-w-5xl mx-auto"
          style={{ borderColor: 'rgba(17,17,17,0.1)' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-3 py-10 px-4 group ${
                i < STATS.length - 1 ? 'md:border-r border-b md:border-b-0' : ''
              }`}
              style={{ borderColor: 'rgba(17,17,17,0.1)' }}
            >
              <span
                className="font-black leading-none flex items-center justify-center transition-colors duration-500 group-hover:text-[#0055FF]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 5vw, 5rem)',
                  color: '#111111',
                  letterSpacing: '-0.04em',
                }}
              >
                <AnimatedNumber value={isInView ? stat.value : 0} />
                <span>{stat.suffix}</span>
              </span>
              <span
                className="tracking-[0.3em] uppercase text-[10px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#111111',
                  opacity: 0.5,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── TWO PILLARS ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-center items-start w-full gap-16 md:gap-32 mt-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col items-center w-full md:w-1/3"
            >
              {/* Pillar header */}
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#0055FF] mb-6 font-bold"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                SYS_{pillar.id} // {pillar.category}
              </span>

              {/* Pillar items */}
              <ul className="flex flex-col items-center gap-4">
                {pillar.items.map((item) => (
                  <li key={item}>
                    <Magnet padding={20} magnetStrength={2}>
                      <div className="flex flex-col items-center group cursor-default">
                        <span
                          className="text-sm md:text-base tracking-[0.15em] uppercase text-[#111111]/60 group-hover:text-[#111111] transition-colors duration-500"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {item}
                        </span>
                        <div className="w-0 h-px bg-[#0055FF] mt-2 group-hover:w-1/2 transition-all duration-500 opacity-50" />
                      </div>
                    </Magnet>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
