# SPEC

Status: FINALIZED

## Project: Metachasm Website Design Overhaul

### Objective
Redesign the Metachasm website to look professional, feature a light background, have no errors, eliminate dead CTAs, and incorporate an immersive parallax effect identical to the one on `sidewave.it`.

### Requirements
- **Theme**: Light Mode (Apple-like Glassmorphism with light greys/whites and dark text).
- **Parallax**: GSAP ScrollTrigger based pinning with fade-ins for text and fixed background elements. Remove CSS scroll-snap.
- **CTAs**: Ensure all anchor links work. Provide a success state for the contact form. No `#` dead links.
- **Quality**: Zero console errors. Smooth 60fps performance using Lenis + GSAP.
- **Methodology**: Follow GSD rules, use atomic commits for logical units.
