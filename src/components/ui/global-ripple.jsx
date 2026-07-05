import React, { useEffect } from 'react';
import anime from 'animejs';

export function GlobalRipple() {
  useEffect(() => {
    const handleMouseDown = (e) => {
      // Don't spawn on right click
      if (e.button !== 0) return;

      const { clientX, clientY } = e;

      // Create ripple element
      const ripple = document.createElement('div');
      ripple.style.position = 'fixed';
      ripple.style.left = `${clientX}px`;
      ripple.style.top = `${clientY}px`;
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      ripple.style.borderRadius = '50%';
      // Adaptive color based on dark mode or generic subtle color
      ripple.style.border = '2px solid rgba(17, 17, 17, 0.4)';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '99999';
      
      document.body.appendChild(ripple);

      anime({
        targets: ripple,
        scale: [0, 5],
        opacity: [0.8, 0],
        borderWidth: ['2px', '0px'],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
}
