import React from 'react';

export default function CinematicOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        // Replaced expensive global backdrop-filter with a lightweight cinematic vignette
        background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.03) 100%)',
        mixBlendMode: 'multiply'
      }}
    >
      {/* Heavy backdrop filters removed to guarantee 60fps scrolling performance */}
    </div>
  );
}
