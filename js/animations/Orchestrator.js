export class AnimationOrchestrator {
  constructor() {
    this.hasGsap = typeof window.gsap !== 'undefined';
    this.hasAnime = typeof window.anime !== 'undefined';
    this.hasLenis = typeof window.Lenis !== 'undefined';
    this.lenis = null;
  }

  hidePreloader(callback) {
    setTimeout(() => {
      if (this.hasAnime) {
        window.anime({
          targets: '#hero .reveal-up',
          translateY: [50, 0],
          opacity: [0, 1],
          delay: window.anime.stagger(150, {start: 200}),
          easing: 'easeOutExpo',
          duration: 1500
        });
      } else {
        document.querySelectorAll('#hero .reveal-up, #hero .reveal-mask').forEach(el => {
          el.classList.add('visible');
        });
      }
      if (typeof callback === 'function') callback();
    }, 100);
  }

  initLogoAnimation(selector) {
    if (!this.hasAnime) return;
    
    const logoStr = document.querySelector(selector);
    if (logoStr) {
      const text = logoStr.innerText;
      logoStr.innerHTML = text.split('').map(c => `<span style="display:inline-block">${c}</span>`).join('');
      
      logoStr.addEventListener('mouseenter', () => {
        window.anime({
          targets: `${selector} span`,
          translateY: [0, -8, 0],
          delay: window.anime.stagger(30),
          duration: 600,
          easing: 'easeInOutSine'
        });
      });
    }
  }

  applyTilt(selector) {
    if (!this.hasGsap) return;
    
    const tiltCards = document.querySelectorAll(selector);
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        window.gsap.to(card, {
          duration: 0.4,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        window.gsap.to(card, {
          duration: 0.8,
          rotateX: 0,
          rotateY: 0,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  revealElements(containerSelector) {
    if (!this.hasGsap || typeof window.ScrollTrigger === 'undefined') return;
    
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.defaults({ scroller: '.folds-container' });

    window.gsap.utils.toArray(containerSelector).forEach((container) => {
      const elements = container.querySelectorAll('.reveal-up:not(#hero .reveal-up), .reveal-mask:not(#hero .reveal-mask)');
      if(elements.length > 0) {
        window.gsap.fromTo(elements, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%'
          }
        });
      }
    });
  }

  initScroll(parallaxSelector = '.parallax-layer') {
    if (!this.hasLenis) return;
    
    this.lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const parallaxLayers = document.querySelectorAll(parallaxSelector);
    
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    this.lenis.on('scroll', (e) => {
      const scrollY = e.animatedScroll || window.scrollY;
      
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}
