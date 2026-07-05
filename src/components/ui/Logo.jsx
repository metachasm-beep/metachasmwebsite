import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Logo({ className = '', size = 28 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const polygons = svgRef.current.querySelectorAll('polygon');
    
    // Calculate max delay so we can synchronize the pause at the end
    const staggerAmount = 40;
    const maxDelay = (polygons.length - 1) * staggerAmount;
    
    polygons.forEach((poly, index) => {
      // Generate complex target vectors for the multi-phase animation
      const shatterX = anime.random(-60, 60);
      const shatterY = anime.random(-60, 60);
      const driftX = anime.random(-20, 20);
      const driftY = anime.random(-20, 20);
      const scaleDown = anime.random(50, 80) / 100;
      
      const polyDelay = index * staggerAmount;
      const polyEndDelay = (maxDelay - polyDelay) + 1000;
      
      // A new, highly-choreographed 3D sequence
      anime({
        targets: poly,
        keyframes: [
          // Phase 1: Smoothly pull apart and tumble
          { 
            translateX: shatterX, translateY: shatterY, 
            rotateZ: 180, rotateX: 180, scale: scaleDown,
            duration: 3000, easing: 'easeInOutSine' 
          },
          // Phase 2 (The Drift): Slow, zero-gravity float to a new nearby point, tumbling to 270deg
          {
            translateX: driftX, translateY: driftY,
            rotateZ: 270, rotateX: 270,
            duration: 2000, easing: 'easeInOutSine'
          },
          // Phase 3: Smoothly reassemble and click into place
          { 
            translateX: 0, translateY: 0, 
            rotateZ: 360, rotateX: 360, scale: 1,
            duration: 3000, easing: 'easeInOutSine' 
          }
        ],
        loop: true,
        delay: polyDelay,
        endDelay: polyEndDelay
      });
    });
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size, perspective: '1000px' }}>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="silverTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="100%" stopColor="#c4c9d0"/>
          </linearGradient>
          <linearGradient id="silverLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9ca3af"/>
            <stop offset="100%" stopColor="#4b5563"/>
          </linearGradient>
          <linearGradient id="blueRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
          <linearGradient id="blueDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a"/>
            <stop offset="100%" stopColor="#0f172a"/>
          </linearGradient>
        </defs>
        <g transform="translate(100, 100)">
          <polygon points="0,10 40,-13 0,-36 -40,-13" fill="url(#blueDark)"/>
          <polygon points="0,10 40,-13 40,33 0,56" fill="url(#blueDark)"/>
          <polygon points="0,10 -40,-13 -40,33 0,56" fill="url(#blueDark)"/>
          <polygon points="-75,-33 -35,-56 0,-36 -40,-13" fill="url(#silverTop)"/>
          <polygon points="-75,-33 -40,-13 -40,33 -75,10" fill="url(#silverLeft)"/>
          <polygon points="75,-33 35,-56 0,-36 40,-13" fill="url(#silverTop)"/>
          <polygon points="75,-33 40,-13 40,33 75,10" fill="url(#blueRight)"/>
          <polygon points="-40,33 0,10 40,33 0,56" fill="url(#silverTop)"/>
          <polygon points="-40,33 0,56 0,102 -40,79" fill="url(#silverLeft)"/>
          <polygon points="40,33 0,56 0,102 40,79" fill="url(#blueRight)"/>
          <polygon points="0,-90 20,-78 0,-66 -20,-78" fill="url(#silverTop)"/>
          <polygon points="-20,-78 0,-66 0,-43 -20,-55" fill="url(#silverLeft)"/>
          <polygon points="20,-78 0,-66 0,-43 20,-55" fill="url(#blueRight)"/>
        </g>
      </svg>
    </div>
  );
}
