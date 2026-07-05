import React from 'react';
import BlurText from './react-bits/BlurText/BlurText.jsx';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="hero-section fold" id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="hero-brutalist-grid" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="hero-label reveal-up" style={{ marginBottom: '1.5rem' }}>[ 00 &mdash; Core Phase ]</div>
          <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column', gap: '0.1em', alignItems: 'center' }}>
            <BlurText 
              text="ENGINEERING" 
              delay={50}
              animateBy="letters"
              direction="top"
              className="title-line"
            />
            <BlurText 
              text="TOMORROW" 
              delay={50}
              animateBy="letters"
              direction="bottom"
              className="title-line"
            />
          </h1>
          <p className="hero-subtitle reveal-up" style={{ marginTop: '2rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }} data-delay="300">
            The gap between idea and live product? That's us.
          </p>
          <div className="hero-cta-group reveal-up" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }} data-delay="400">
            <Button size="lg" asChild>
              <a href="#services">EXPLORE</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">CONNECT</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
