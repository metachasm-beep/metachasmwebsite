import React from 'react';

const PROJECTS = [
  { id: 1, title: 'Nexus', category: 'SaaS Platform', img: '/images/scifi_dashboard_1782463634379.png' },
  { id: 2, title: 'Aura', category: 'Fintech Mobile', img: '/images/scifi_mobile_app_1782463650931.png' },
  { id: 3, title: 'Omni', category: 'E-Commerce', img: '/images/scifi_analytics_web_1782463661918.png' },
];

export default function Portfolio() {
  return (
    <section className="fold min-h-screen w-full flex items-center justify-center bg-background py-20" id="portfolio">
      <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center justify-center text-center w-full">
        
        <div className="reveal-up mb-24">
          <div className="inline-flex items-center gap-2 mb-12 text-xs font-bold tracking-widest text-primary uppercase">
            [ 03 &mdash; Works ]
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-foreground">
            Selected Works.
          </h2>
        </div>

        <div className="space-y-32 w-full">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="reveal-up" data-delay={idx * 100}>
              <div className="w-full aspect-[4/3] bg-muted mb-8 overflow-hidden group">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-2">
                  {project.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
