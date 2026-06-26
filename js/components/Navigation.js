import { EventBus } from '../state/EventBus.js';
import { Orchestrator } from '../animations/Orchestrator.js';

export class Navigation {
  constructor(el) {
    this.el = el;
    this.menuToggle = document.getElementById('menu-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    // Pure Native Routing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          const menuToggle = document.getElementById('menu-toggle');
          const navMenu = document.getElementById('nav-menu');
          if (menuToggle && navMenu) {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
          }
          
          // Let the browser natively snap it into view
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.el.classList.add('scrolled');
      } else {
        this.el.classList.remove('scrolled');
      }
    });

    if (this.menuToggle && this.navMenu) {
      this.menuToggle.addEventListener('click', () => {
        this.menuToggle.classList.toggle('open');
        this.navMenu.classList.toggle('open');
      });

      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.menuToggle.classList.remove('open');
          this.navMenu.classList.remove('open');
        });
      });
    }
  }
}
