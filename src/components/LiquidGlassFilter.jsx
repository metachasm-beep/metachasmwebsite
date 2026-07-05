import React from 'react';

// This SVG defines the matrix needed for true Liquid Glass "Gooey" metaball merging.
// It applies a heavy blur, then uses a color matrix to sharply clamp the alpha channel,
// creating a physical "merging" effect when two filtered elements intersect.
export function LiquidGlassFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <defs>
        <filter id="liquid-glass-merge">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 25 -10" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
        <filter id="liquid-glass-merge-subtle">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 18 -7" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
