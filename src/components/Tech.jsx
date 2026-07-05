import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { useInView, motion } from 'framer-motion';
import { GlowBorderCard } from './ui/glow-border-card';
import DecryptedText from './react-bits/DecryptedText/DecryptedText';
import Magnet from './react-bits/Magnet/Magnet';

const TECH_CATEGORIES = [
  {
    id: '01',
    title: 'Frontend Ecosystem',
    items: [
      'React 19', 'Next.js 15', 'Tailwind v4', 'WebGL', 'Three.js', 'GSAP', 'Framer Motion', 'Zustand', 'WebAssembly', 'Vite', 'TypeScript',
      'SolidJS', 'Svelte 5', 'Qwik', 'Remix', 'Astro', 'Nuxt.js', 'Vue 3', 'Alpine.js', 'Lit',
      'Radix UI', 'Shadcn UI', 'Headless UI', 'Mantine', 'Redux Toolkit', 'Jotai', 'XState', 'React Query', 'SWR',
      'RxJS', 'D3.js', 'Chart.js', 'Lottie', 'Rive', 'Canvas API', 'WebGPU', 'PixiJS', 'Babylon.js',
      'Storybook', 'Cypress', 'Playwright', 'Vitest', 'Jest', 'Testing Library'
    ],
  },
  {
    id: '02',
    title: 'Backend & Cloud',
    items: [
      'Node.js', 'Go', 'Rust', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Vercel', 'Cloudflare', 'GraphQL', 'gRPC',
      'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'C#', '.NET 9', 'Elixir', 'Phoenix', 'Ruby on Rails',
      'MongoDB', 'Cassandra', 'ScyllaDB', 'DynamoDB', 'Supabase', 'Firebase', 'Prisma', 'Drizzle ORM', 'TypeORM',
      'Kafka', 'RabbitMQ', 'NATS', 'Celery', 'BullMQ', 'Apache Flink', 'Spark',
      'Terraform', 'Ansible', 'Pulumi', 'GitHub Actions', 'ArgoCD',
      'Elasticsearch', 'Meilisearch', 'Prometheus', 'Grafana', 'Datadog', 'Sentry'
    ],
  },
  {
    id: '03',
    title: 'Mobile & Native',
    items: [
      'Swift', 'Kotlin', 'React Native', 'Expo', 'iOS', 'Android', 'Flutter', 'CoreML', 'Metal API', 'ARKit', 'WebRTC',
      'Objective-C', 'Dart', 'Ionic', 'Capacitor', 'Tauri', 'Electron', 'Qt', 'C++',
      'RealityKit', 'SceneKit', 'HealthKit', 'WatchKit', 'Jetpack Compose', 'SwiftUI',
      'TensorFlow Lite', 'PyTorch Mobile', 'MediaPipe', 'OpenCV', 'FFmpeg', 'AVFoundation',
      'Realm', 'SQLite', 'Room', 'CoreData', 'Fastlane', 'Bitrise',
      'Appium', 'Detox', 'XCTest', 'Espresso', 'Crashlytics', 'RevenueCat'
    ],
  },
];

const ALL_TECH = TECH_CATEGORIES.flatMap(cat => cat.items);

export default function Tech() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const [isMobile, setIsMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      anime({
        targets: '.tech-item-reveal',
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(50),
        easing: 'easeOutExpo',
        duration: 1200
      });
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="fold min-h-screen w-full flex flex-col items-center justify-center bg-transparent text-[#111111] relative overflow-hidden"
      id="tech"
    >
      {/* ── BACKGROUND ENGINEERING GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111111 1px, transparent 1px),
            linear-gradient(to bottom, #111111 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9F6]/0 via-[#F9F9F6]/80 to-[#F9F9F6]/0 pointer-events-none z-0" />
      
      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="w-full flex flex-col items-center justify-center relative z-10 flex-1 max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-24">
        
        {/* Header section */}
        <div className="w-full flex flex-col items-center text-center mb-12 md:mb-20">
          <p
            className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [05] — Architecture
          </p>
          <h2
            className="text-[clamp(2rem,6vw,7rem)] font-black tracking-tighter text-[#111111] uppercase leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Stack
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse" />
            <p className="text-xs md:text-sm tracking-widest text-[#111111]/60 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-[#0055FF] font-bold">{ALL_TECH.length}</span> ACTIVE MODULES
            </p>
          </div>
        </div>

        {/* ── MOBILE TAB SYSTEM ── */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-8 w-full max-w-[90vw] mx-auto p-1.5 bg-[#111111]/5 rounded-xl backdrop-blur-sm">
          {TECH_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-3 px-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-[#111111] text-[#F9F9F6] shadow-md shadow-[#111111]/20'
                  : 'text-[#111111]/50 hover:text-[#111111] hover:bg-[#111111]/10'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {cat.id} // {cat.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* ── ARCHITECTURE PILLARS (GLOW BORDER CARDS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl items-start relative">
          {TECH_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx} 
              className={`group relative w-full h-auto ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''} ${isMobile && activeTab !== idx ? 'hidden' : 'block'}`}
              drag={!isMobile}
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              dragElastic={0.4}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: idx * 0.5, // Stagger the floating effect
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlowBorderCard
                color="rgba(0,85,255,0.2)"
                borderWidth={1}
                borderRadius="16px"
                className="w-full h-auto pointer-events-none" // Disable pointer events on children so grab works cleanly
                width="100%"
                height="auto"
              >
                <div className="w-full h-auto flex flex-col items-start p-6 md:p-8 bg-[#F9F9F6]/50 backdrop-blur-sm relative overflow-hidden transition-colors duration-500 group-hover:bg-[#F9F9F6]/80 pointer-events-auto">
                  
                  {/* Category Header */}
                  <div className="w-full flex justify-between items-start mb-10 border-b border-[#111111]/10 pb-6">
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase text-[#0055FF] font-bold"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      SYS_{cat.id}
                    </span>
                    <span 
                      className="text-[10px] tracking-[0.2em] text-[#111111]/30 uppercase"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      SEC // 0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className="text-xl md:text-2xl font-bold tracking-tight text-[#111111] uppercase whitespace-pre-line mb-8 leading-[1.2]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <DecryptedText
                      text={cat.title}
                      animateOn="hover"
                      speed={35}
                      maxIterations={6}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$"
                      className="text-current pointer-events-none"
                      encryptedClassName="text-[#0055FF]/40"
                    />
                  </h3>

                  {/* Tech items Grid */}
                  <div className="flex flex-wrap gap-3 w-full">
                    {cat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="tech-item-reveal opacity-0 w-full sm:w-auto">
                        <Magnet padding={15} magnetStrength={2}>
                          <div className="px-4 py-2 border border-[#111111]/15 rounded bg-transparent group/item transition-colors duration-300 hover:border-[#0055FF] hover:bg-[#0055FF]/5">
                            <span
                              className="text-xs md:text-sm tracking-[0.15em] uppercase text-[#111111]/70 group-hover/item:text-[#0055FF] transition-colors duration-300"
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              {item}
                            </span>
                          </div>
                        </Magnet>
                      </div>
                    ))}
                  </div>

                  {/* Abstract Tech Graphic inside Card */}
                  <div className="absolute bottom-[-20%] right-[-10%] w-[200px] h-[200px] rounded-full border border-[#0055FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[2px] pointer-events-none" />
                  <div className="absolute bottom-[-10%] right-[-5%] w-[100px] h-[100px] rounded-full border border-[#0055FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px] pointer-events-none" />
                  
                </div>
              </GlowBorderCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


