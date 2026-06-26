class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

const eventBus = new EventBus();




class Store extends EventBus {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.emit('stateChange', this.state);
  }
}

const store = new Store({
  activeFilter: 'all'
});


class AnimationOrchestrator {
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


class ComponentEngine {
  constructor(components = {}) {
    this.components = components;
    this.instances = [];
  }

  init() {
    const elements = document.querySelectorAll('[data-component]');
    elements.forEach(el => {
      const componentName = el.getAttribute('data-component');
      const ComponentClass = this.components[componentName];
      if (ComponentClass) {
        try {
          const instance = new ComponentClass(el);
          this.instances.push(instance);
        } catch (e) {
          console.error(`Error initializing component ${componentName}:`, e);
        }
      }
    });
  }
}





class Portfolio {
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





class Cursor {
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





class Navigation {
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





class Parallax {
  constructor(el) {
    this.el = el;
    this.folds = Array.from(document.querySelectorAll('.fold'));
    this.foldsContainer = document.querySelector('.folds-container');
    this.init();
  }

  init() {
    // Sidewave Immersive Parallax Effect
    if (this.foldsContainer && this.folds.length > 0 && typeof window.gsap !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      this.folds.forEach((fold, index) => {
        // Pin each fold so it stays in place while we scroll through it
        window.ScrollTrigger.create({
          trigger: fold,
          scroller: '.folds-container',
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false
        });

        // Add a scrub animation for the main content container
        const content = fold.querySelector('.section-container, .hero-brutalist-grid');
        if (content) {
          window.gsap.fromTo(content, 
            { opacity: 0, scale: 0.95, y: 50 },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: fold,
                scroller: '.folds-container',
                start: 'top bottom',
                end: 'top top',
                scrub: 1
              }
            }
          );
          
          // Staggered reveals for internal elements (Motion-Driven pattern)
          const innerElements = content.querySelectorAll('h1, h2, h3, p, .btn-primary, .service-card, .portfolio-item');
          if (innerElements.length > 0) {
             window.gsap.fromTo(innerElements,
               { opacity: 0, y: 30, rotationX: -10 },
               {
                 opacity: 1,
                 y: 0,
                 rotationX: 0,
                 stagger: 0.1,
                 ease: 'power3.out',
                 scrollTrigger: {
                   trigger: fold,
                   scroller: '.folds-container',
                   start: 'top 75%',
                   end: 'center center',
                   scrub: 1
                 }
               }
             );
          }
          
          // Fade out when leaving with depth effect
          if (index < this.folds.length - 1) {
             window.gsap.to(content, {
               opacity: 0,
               y: -80,
               scale: 0.95,
               ease: 'power2.in',
               scrollTrigger: {
                 trigger: fold,
                 scroller: '.folds-container',
                 start: 'top top',
                 end: 'bottom top',
                 scrub: 1
               }
             });
          }
        }
      });
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

  // Form handling
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      contactSuccess.style.display = 'block';
      setTimeout(() => {
        contactSuccess.style.display = 'none';
      }, 5000);
    });
  }
});
