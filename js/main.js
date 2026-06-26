import { ComponentEngine } from './components/ComponentEngine.js';
import { Cursor } from './components/Cursor.js';
import { Navigation } from './components/Navigation.js';
import { Parallax } from './components/Parallax.js';
import { Portfolio } from './components/Portfolio.js';
import { AnimationOrchestrator } from './animations/Orchestrator.js';

document.addEventListener('DOMContentLoaded', () => {
  const orchestrator = new AnimationOrchestrator();

  // Initialize Preloader
  const enterBtn = document.getElementById('enter-universe-btn');
  const preloader = document.getElementById('preloader');
  
  if (enterBtn && preloader) {
    enterBtn.addEventListener('click', () => {
      preloader.classList.add('hidden');
      setTimeout(() => orchestrator.hidePreloader(), 300);
    });
  } else {
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      orchestrator.hidePreloader();
    }, 2000);
  }

  // Initialize Component Engine
  const engine = new ComponentEngine({
    Cursor,
    Navigation,
    Parallax,
    Portfolio
  });

  engine.init();

  // Global Animations
  orchestrator.initLogoAnimation('.logo');
  orchestrator.applyTilt('.service-card, .portfolio-item, .test-card, .dashboard-mockup');
  orchestrator.revealElements('.fold');
});
