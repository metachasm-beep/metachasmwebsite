import React from 'react';

export function HeroGodRays() {
  return (
    <div className="w-full h-full flex justify-center items-center pointer-events-none relative overflow-hidden">
      
      {/* CSS Keyframes for slow rotation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .rays-layer {
          position: absolute;
          width: 150vw;
          height: 150vw;
          top: 50%;
          left: 50%;
          margin-left: -75vw;
          margin-top: -75vw;
          border-radius: 50%;
          filter: blur(15px);
          /* The mask completely hides the center point (the 'black hole') and fades out edges */
          mask-image: radial-gradient(circle at center, transparent 10%, black 30%, black 60%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, transparent 10%, black 30%, black 60%, transparent 100%);
        }
        
        .rays-1 {
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 10deg,
            rgba(17, 17, 17, 0.04) 10deg 20deg
          );
          animation: spin-slow 60s linear infinite;
        }

        .rays-2 {
          background: repeating-conic-gradient(
            from 5deg,
            transparent 0deg 15deg,
            rgba(0, 85, 255, 0.05) 15deg 30deg /* Subtle electric blue rays */
          );
          animation: spin-slow-reverse 80s linear infinite;
        }
      `}</style>

      {/* The rotating light rays */}
      <div className="rays-layer rays-1" />
      <div className="rays-layer rays-2" />

      {/* Ambient background glow to wash out any central artifacts */}
      <div className="absolute w-[400px] h-[400px] bg-[#FAFAFA] rounded-full blur-[80px] opacity-100" />
      <div className="absolute w-[200px] h-[200px] bg-[#0055FF] rounded-full blur-[100px] opacity-20" />
    </div>
  );
}


