import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from "../../lib/utils";

export function AnimeTextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 50,
  direction = "normal", 
  animateOnMount = true,
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!animateOnMount || !containerRef.current) return;
    
    // Select all letter elements
    const elements = containerRef.current.querySelectorAll('.anime-letter');
    
    // Set initial state
    anime.set(elements, {
      translateY: 40,
      translateZ: -50,
      opacity: 0,
    });

    // Animate
    animationRef.current = anime({
      targets: elements,
      translateY: 0,
      translateZ: 0,
      opacity: 1,
      easing: 'easeOutExpo',
      duration: 1200,
      delay: anime.stagger(staggerDelay, { start: delay, direction: direction }),
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [animateOnMount, delay, staggerDelay, direction]);

  // Split text into words and letters
  const renderText = () => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
        {word.split('').map((letter, letterIndex) => (
          <span
            key={`letter-${wordIndex}-${letterIndex}`}
            className="anime-letter inline-block"
            style={{ opacity: 0 }}
          >
            {letter}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={cn("inline-block", className)}>
      {renderText()}
    </div>
  );
}
