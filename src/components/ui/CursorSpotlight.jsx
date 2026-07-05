import React, { useEffect, useState } from 'react';

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Check if the device is primarily a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId;
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smooth 60fps tracking without blocking the main thread
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        // A huge, soft radial gradient that acts like a point light.
        // mixBlendMode removed for massive performance gains during scrolling.
        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.04), transparent 40%)`,
      }}
    />
  );
}
