import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GlobalBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The timeline scrubs over the entire document scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.folds-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });

      // The GSAP timeline uses values 0 to 1 as its total duration mapped to the scroll.
      
      // Phase 1: Scroll from 0 to 0.4
      // Layer 1 zooms out massively and fades
      tl.to('.bg-layer-1', { scale: 5, autoAlpha: 0, ease: 'power2.inOut', duration: 0.4 }, 0);
      
      // Phase 2: Layer 2 starts appearing at 0.1, fully visible by 0.3, zooms out by 0.8
      tl.fromTo('.bg-layer-2', 
        { scale: 0.5, autoAlpha: 0 }, 
        { scale: 1.2, autoAlpha: 1, ease: 'power2.out', duration: 0.2 }, 0.1
      );
      tl.to('.bg-layer-2', { scale: 5, autoAlpha: 0, ease: 'power2.in', duration: 0.5 }, 0.3);

      // Phase 3: Layer 3 (Core) comes into focus towards the end (0.6 to 1)
      tl.fromTo('.bg-layer-3',
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, ease: 'power2.out', duration: 0.4 }, 0.6
      );

    }, bgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={bgRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none', background: '#E0E5EC' }}>
      
      {/* LAYER 3: CORE (Deepest) */}
      <div className="bg-layer-3" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', visibility: 'hidden', willChange: 'transform' }}>
        <img src="/images/minimal_layer3.png" alt="Core Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* LAYER 2: CIRCULAR APERTURE (Middle) */}
      <div className="bg-layer-2" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', visibility: 'hidden', willChange: 'transform' }}>
        <img src="/images/minimal_layer2.png" alt="Circular Aperture Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* LAYER 1: RECTANGULAR APERTURE (Front) */}
      <div className="bg-layer-1" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', willChange: 'transform' }}>
        <img src="/images/minimal_layer1.png" alt="Rectangular Aperture Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      
      {/* Atmospheric overly to ensure glass panels stand out against bright backgrounds */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(224,229,236,0.3) 0%, rgba(224,229,236,0.9) 100%)' }}></div>
    </div>
  );
}
