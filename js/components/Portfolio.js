import { EventBus } from '../state/EventBus.js';
import { Orchestrator } from '../animations/Orchestrator.js';

export class Portfolio {
  constructor(el) {
    this.el = el;
    this.filterBtns = this.el.querySelectorAll('.filter-btn');
    this.portfolioItems = this.el.querySelectorAll('.portfolio-item');
    this.init();
  }

  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter items
        this.portfolioItems.forEach(item => {
          // Reset animation state
          item.classList.remove('visible');
          item.style.transition = 'none';
          
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            // Re-trigger animation
            setTimeout(() => {
              item.style.transition = '';
              item.classList.add('visible');
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
}
