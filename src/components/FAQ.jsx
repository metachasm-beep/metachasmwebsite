import React from 'react';
import { GlowBorderCard } from './ui/glow-border-card';
import DecryptedText from './react-bits/DecryptedText/DecryptedText';

const FAQ_ITEMS = [
  {
    id: '01',
    question: "What is your typical project timeline?",
    answer: "Most platforms take 8-12 weeks from concept to launch. We work in rapid sprints, ensuring functional progress every two weeks."
  },
  {
    id: '02',
    question: "Do you only do design, or development too?",
    answer: "We handle the entire lifecycle. Product designers, frontend specialists, and backend engineers cover the gap between idea and live product."
  },
  {
    id: '03',
    question: "What tech stack do you specialize in?",
    answer: "React, Next.js, Tailwind, and Node.js for web. We leverage React Native and native languages for mobile when performance demands it."
  },
  {
    id: '04',
    question: "Do you take on redesign projects?",
    answer: "Yes. If your current product suffers from poor UX or outdated aesthetics, we can audit, redesign, and rebuild it to modern standards."
  },
  {
    id: '05',
    question: "How do you handle post-launch support?",
    answer: "We provide continuous monitoring, SLA-backed maintenance, and iterative scaling to ensure your platform remains resilient."
  },
  {
    id: '06',
    question: "Are your architectures scalable?",
    answer: "Absolutely. We deploy containerized, cloud-native solutions designed from day one to handle enterprise-level traffic gracefully."
  },
  {
    id: '07',
    question: "What is your pricing model?",
    answer: "We operate on flexible modular retainers or fixed-scope contracts, tailored specifically to the complexity of the architecture."
  },
  {
    id: '08',
    question: "How do we initiate a project?",
    answer: "Trigger the Initialize Sequence on our terminal, and our lead architects will contact you within 24 hours to begin scoping."
  }
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="fold min-h-screen w-full flex flex-col items-center justify-center bg-transparent text-[#111111] relative overflow-hidden"
    >
      <div className="w-full flex flex-col items-center justify-center relative z-10 flex-1 max-w-[1400px] mx-auto px-4 py-8 md:py-16">
        
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center mb-10 md:mb-16">
          <p
            className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [04] — Intel
          </p>
          <h2
            className="text-[clamp(2rem,5vw,6rem)] font-black tracking-tighter text-[#111111] uppercase leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            F.A.Q
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="group relative w-full h-full">
              <GlowBorderCard
                color="rgba(0,85,255,0.15)" 
                borderWidth={1}
                borderRadius="16px"
                className="w-full h-full"
                width="100%"
              >
                <div className="w-full min-h-[220px] flex flex-col items-start justify-start text-left p-6 md:p-8 bg-[#F9F9F6]/30 relative overflow-hidden transition-colors duration-500 group-hover:bg-[#F9F9F6]/60">
                  
                  {/* Subtle index */}
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-[#111111]/30 group-hover:text-[#0055FF] transition-colors duration-300 font-bold mb-4 block"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Q_{item.id}
                  </span>

                  {/* Question */}
                  <h3 
                    className="text-base lg:text-lg font-bold uppercase tracking-tight text-[#111111] mb-3 leading-snug break-words w-full"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <DecryptedText
                      text={item.question}
                      animateOn="hover"
                      speed={40}
                      maxIterations={5}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$"
                      className="text-current group-hover:text-[#0055FF] transition-colors duration-300 whitespace-normal"
                      encryptedClassName="text-[#0055FF]/40"
                    />
                  </h3>

                  {/* Answer */}
                  <p 
                    className="text-xs lg:text-sm leading-relaxed text-[#111111]/60 group-hover:text-[#111111]/80 transition-colors duration-300 mt-auto break-words"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
                  >
                    {item.answer}
                  </p>
                  
                </div>
              </GlowBorderCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


