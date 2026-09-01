import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TECH_CATEGORIES = [
  {
    id: '01',
    title: 'Frontend',
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
    title: 'Backend',
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
    title: 'Mobile',
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

const ALL_TECH = TECH_CATEGORIES.flatMap(cat => 
  cat.items.map(item => ({ name: item, category: cat.title, color: cat.color, id: cat.id }))
);

// Glitch Text Component for Hover
const GlitchText = ({ text, isHovered, defaultColor, highlightColor }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\\\/[]{}—=+*^?#_';
  
  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span style={{ color: isHovered ? highlightColor : defaultColor, transition: 'color 0.2s' }}>
      {displayText}
    </span>
  );
};

// A single column streaming down
const MatrixColumn = ({ items, speed, delay }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <div className="relative overflow-hidden h-full flex-1 border-r border-[#0055FF]/20 last:border-r-0">
      <motion.div 
        className="flex flex-col w-full absolute top-0 left-0"
        animate={{ y: ['-50%', '0%'] }}
        transition={{ 
          repeat: Infinity, 
          ease: 'linear', 
          duration: speed,
          delay: delay
        }}
      >
        {/* We duplicate the items to create a seamless loop */}
        {[...items, ...items].map((tech, i) => (
          <div 
            key={i} 
            className="py-3 px-2 md:px-4 cursor-crosshair group flex flex-col border-b border-[#0055FF]/10 hover:bg-[#0055FF]/10 transition-colors"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-between items-center opacity-40 mb-1">
              <span className="text-[8px] md:text-[10px] tracking-widest text-[#0055FF]">SYS_{tech.id}</span>
              <span className="text-[8px] md:text-[10px] text-[#F9F9F6]/30">[{tech.category}]</span>
            </div>
            <div className="text-xs md:text-sm lg:text-base font-bold tracking-wider break-words uppercase">
              <GlitchText 
                text={tech.name} 
                isHovered={hoveredIndex === i} 
                defaultColor="#F9F9F6" 
                highlightColor={tech.color} 
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Tech() {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Determine columns based on screen width
      const numCols = mobile ? 2 : window.innerWidth < 1024 ? 3 : 5;
      
      // Shuffle ALL_TECH to distribute randomly across columns
      const shuffled = [...ALL_TECH].sort(() => 0.5 - Math.random());
      const cols = Array.from({ length: numCols }, () => []);
      
      shuffled.forEach((tech, i) => {
        cols[i % numCols].push(tech);
      });
      
      setColumns(cols);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="fold min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-[#F9F9F6] relative overflow-hidden"
      id="tech"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* ── MATRIX SCANLINE OVERLAY ── */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0) 50%, rgba(0, 85, 255, 0.2) 50%)`,
          backgroundSize: '100% 4px',
        }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-40 pointer-events-none" />
      
      {/* ── HEADER / TERMINAL PROMPT ── */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 z-30 flex flex-col gap-2 pointer-events-none bg-gradient-to-b from-[#050505] to-transparent pb-16">
        <div className="flex justify-between items-center opacity-60">
          <span className="text-[10px] md:text-xs text-[#0055FF]">root@metachasm:~# ./view_architecture.sh</span>
          <span className="text-[10px] md:text-xs">TIME: {new Date().toLocaleTimeString()}</span>
        </div>
        <h2
          className="text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none mt-2 text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-[#0055FF] mr-2">{"//"}</span> THE STACK
        </h2>
        <div className="flex gap-4 mt-2">
          {TECH_CATEGORIES.map(cat => (
            <div key={cat.id} className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ backgroundColor: cat.color }} />
              <span className="text-[8px] md:text-[10px] tracking-widest opacity-60">{cat.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TERMINAL COLUMNS ── */}
      <div className="w-full h-full flex mt-32 md:mt-40 mb-10 border-y border-[#0055FF]/30 relative z-20 mx-4 md:mx-8">
        {columns.map((colItems, idx) => (
          <MatrixColumn 
            key={idx} 
            items={colItems} 
            // Vary speed and direction slightly for each column
            speed={isMobile ? 30 + Math.random() * 20 : 40 + Math.random() * 30} 
            delay={Math.random() * -20} 
          />
        ))}
      </div>

      {/* ── FOOTER / STATUS ── */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-30 flex justify-between items-center pointer-events-none bg-gradient-to-t from-[#050505] to-transparent pt-16">
        <span className="text-[10px] md:text-xs text-[#0055FF] animate-pulse">SYSTEM ONLINE</span>
        <span className="text-[10px] md:text-xs opacity-50">MODULES: {ALL_TECH.length}</span>
      </div>

    </section>
  );
}
