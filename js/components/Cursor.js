import { EventBus } from '../state/EventBus.js';
import { Orchestrator } from '../animations/Orchestrator.js';

export class Cursor {
  constructor(el) {
    this.el = el;
    this.cursorFollower = document.getElementById('cursor-follower');
    if (!this.cursorFollower) return;
    this.init();
  }

  init() {
    if (window.matchMedia("(pointer: fine)").matches) {
      let mouseX = 0, mouseY = 0;
      let followerX = 0, followerY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor
        this.el.style.left = `${mouseX}px`;
        this.el.style.top = `${mouseY}px`;
      });
      
      // Smooth follower loop
      const renderFollower = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        this.cursorFollower.style.left = `${followerX}px`;
        this.cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(renderFollower);
      };
      renderFollower();
      
      // Hover effects
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .service-card, .portfolio-item');
      interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
          this.el.classList.add('hovering');
          this.cursorFollower.classList.add('hovering');
        });
        item.addEventListener('mouseleave', () => {
          this.el.classList.remove('hovering');
          this.cursorFollower.classList.remove('hovering');
        });
      });
    }
  }
}
