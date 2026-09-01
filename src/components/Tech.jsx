import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const TECH_CATEGORIES = [
  {
    id: '01',
    title: 'Frontend Ecosystem',
    color: '#0055FF',
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
    color: '#FF3366',
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
    color: '#00E676',
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

// Generate an array of all technologies with their category info attached
const ALL_TECH = TECH_CATEGORIES.flatMap(cat => 
  cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id }))
);

// Helper to generate hexagonal spiral coordinates (axial q, r)
function generateHexSpiral(n) {
  const coords = [[0, 0]];
  const directions = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
  let radius = 1;
  while (coords.length < n) {
    let q = -radius;
    let r = radius;
    for (const [dq, dr] of directions) {
      for (let i = 0; i < radius; i++) {
        if (coords.length >= n) break;
        coords.push([q, r]);
        q += dq;
        r += dr;
      }
    }
    radius++;
  }
  return coords;
}

export default function Tech() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use useMemo to generate the grid once
  const hexGrid = useMemo(() => {
    const size = window.innerWidth < 768 ? 45 : 65; // Hexagon radius
    const gap = window.innerWidth < 768 ? 4 : 6;
    const s = size + gap;
    
    // Shuffle or organize ALL_TECH. Let's group them by category slightly, or just random
    // A simple grouped sort
    const sortedTech = [...ALL_TECH].sort((a, b) => a.id.localeCompare(b.id));
    const spiral = generateHexSpiral(sortedTech.length);
    
    return sortedTech.map((tech, index) => {
      const [q, r] = spiral[index];
      // Pointy-topped hex to pixel conversion
      const x = s * Math.sqrt(3) * (q + r / 2);
      const y = s * (3 / 2) * r;
      return { ...tech, x, y, size };
    });
  }, []);

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
      
      {/* ── HEADER ── */}
      <div className="absolute top-12 md:top-24 w-full flex flex-col items-center text-center z-20 pointer-events-none">
        <p
          className="text-[10px] font-medium tracking-[0.4em] text-[#111111]/40 uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          [05] — Architecture
        </p>
        <h2
          className="text-[clamp(2rem,5vw,5rem)] font-black tracking-tighter text-[#111111] uppercase leading-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The Stack
        </h2>
        
        {/* Category Legend */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-4 pointer-events-auto max-w-[95vw]">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-all border ${activeCategory === null ? 'bg-[#111111] text-[#F9F9F6] border-[#111111]' : 'bg-transparent text-[#111111]/50 border-[#111111]/20 hover:border-[#111111]/50'}`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            All Modules
          </button>
          {TECH_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-all border`}
              style={{ 
                fontFamily: 'var(--font-mono)',
                backgroundColor: activeCategory === cat.id ? cat.color : 'transparent',
                color: activeCategory === cat.id ? '#FFF' : cat.color,
                borderColor: activeCategory === cat.id ? cat.color : `${cat.color}40`,
                opacity: activeCategory === null || activeCategory === cat.id ? 1 : 0.4
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── DRAGGABLE HONEYCOMB GRID ── */}
      <div className="w-full h-[70vh] relative z-10 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing mt-24">
        <motion.div
          drag
          dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
          animate={{ scale: isMobile ? 0.35 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute w-[3000px] h-[3000px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute left-1/2 top-1/2 w-0 h-0">
            {hexGrid.map((tech, idx) => {
              const isFaded = activeCategory && activeCategory !== tech.id;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "20%" }}
                  transition={{ 
                    delay: idx * 0.01,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  }}
                  className="absolute flex items-center justify-center text-center transition-all duration-500 group hover:z-50"
                  style={{
                    width: tech.size * Math.sqrt(3),
                    height: tech.size * 2,
                    left: tech.x - (tech.size * Math.sqrt(3)) / 2,
                    top: tech.y - tech.size,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    backgroundColor: isFaded ? 'rgba(17, 17, 17, 0.03)' : 'rgba(249, 249, 246, 0.9)',
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${isFaded ? 'rgba(17, 17, 17, 0.05)' : tech.color + '40'}`,
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)',
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    backgroundColor: tech.color,
                    zIndex: 50,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span 
                    className={`text-[9px] md:text-[11px] font-bold tracking-wider leading-tight px-2 transition-colors duration-200 group-hover:text-white ${isFaded ? 'text-[#111111]/20' : 'text-[#111111]/80'}`}
                    style={{ 
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {tech.name}
                  </span>
                  
                  {/* Hover tooltip/glow effect overlay inside the hex */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 mix-blend-overlay pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-8 z-20 pointer-events-none opacity-50 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] font-bold uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          Click & Drag to explore
        </span>
      </div>

    </section>
  );
}
