import { EventBus } from '../state/EventBus.js';
import { Orchestrator } from '../animations/Orchestrator.js';

export class Parallax {
  constructor(el) {
    this.el = el;
    this.folds = Array.from(document.querySelectorAll('.fold'));
    this.foldsContainer = document.querySelector('.folds-container');
    this.init();
  }

  init() {
    // Sidewave Immersive Parallax Effect
    if (this.foldsContainer && this.folds.length > 0) {
      const updateFolds = () => {
        const scrollTop = this.foldsContainer.scrollTop;
        const containerHeight = this.foldsContainer.clientHeight;

        this.folds.forEach((fold, index) => {
          const foldTop = index * containerHeight;
          const distance = scrollTop - foldTop;
          const progress = distance / containerHeight;

          fold.style.transformOrigin = 'center center';

          if (progress > 0 && progress <= 1) {
            // We are scrolling PAST this fold (camera moves forward, fold comes closer)
            const scale = 1 + (2.5 * progress); // Grows massive
            const opacity = 1 - Math.pow(progress, 1.5); // Fades out smoothly
            const translateY = progress * containerHeight; // Pinned

            fold.style.transform = `translateY(${translateY}px) scale(${scale})`;
            fold.style.opacity = opacity;
            fold.style.zIndex = 2;
          } else if (progress < 0 && progress >= -1) {
            // This fold is coming INTO view (starts far away and grows)
            const scale = 1 - Math.abs(progress * 0.4); // Starts at 0.6, grows to 1
            const opacity = 1 - Math.abs(progress); // Starts at 0, fades to 1
            const translateY = progress * containerHeight; // Pinned

            fold.style.transform = `translateY(${translateY}px) scale(${scale})`;
            fold.style.opacity = opacity;
            fold.style.zIndex = 1;
          } else if (progress > 1 || progress < -1) {
            fold.style.transform = `translateY(${containerHeight}px) scale(0)`;
            fold.style.opacity = 0;
            fold.style.zIndex = 0;
          } else {
            // Exactly in view (progress = 0)
            fold.style.transform = `translateY(0) scale(1)`;
            fold.style.opacity = 1;
            fold.style.zIndex = 2;
          }
        });
      };

      this.foldsContainer.addEventListener('scroll', () => {
        requestAnimationFrame(updateFolds);
      });
      
      // Initial trigger
      updateFolds();
    }

    if (typeof window.Lenis !== 'undefined') {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      const parallaxLayers = this.el.querySelectorAll('.parallax-layer').length 
        ? this.el.querySelectorAll('.parallax-layer')
        : document.querySelectorAll('.parallax-layer');
      
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', (e) => {
        const scrollY = e.animatedScroll || window.scrollY;
        
        parallaxLayers.forEach(layer => {
          const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
          const yPos = -(scrollY * speed);
          layer.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  }
}
