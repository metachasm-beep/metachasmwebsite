;

import React, { useState, useMemo, useEffect, useRef } from "react";
import anime from 'animejs';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TestimonialItem {
    /** Unique identifier for the card */
    id: string | number;
    /** Title displayed for the card */
    title: string;
    /** Description text for the card */
    description: string;
    /** Image URL/path for the card */
    image?: string;
}

interface TestimonialsCardProps {
    /** Array of testimonial items to display */
    items: TestimonialItem[];
    /** Additional CSS classes for the container */
    className?: string;
    /** Width of the card stack (default: 400) */
    width?: number;
    /** Whether to show navigation arrows (default: true) */
    showNavigation?: boolean;
    /** Whether to show the counter (default: true) */
    showCounter?: boolean;
    /** Whether to enable auto-play (default: false) */
    autoPlay?: boolean;
    /** Auto-play interval in ms (default: 3000) */
    autoPlayInterval?: number;
}

export function TestimonialsCard({
    items,
    className,
    width = 400,
    showNavigation = true,
    showCounter = true,
    autoPlay = false,
    autoPlayInterval = 3000,
}: TestimonialsCardProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const activeItem = items[activeIndex];
    const floatRef = useRef(null);

    // Auto-play effect
    useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, items.length]);

    // Anime.js Floating Effect
    useEffect(() => {
        if (floatRef.current) {
            anime({
                targets: floatRef.current,
                translateY: ['-5px', '5px'],
                rotateZ: ['-1deg', '1deg'],
                direction: 'alternate',
                loop: true,
                duration: 3000,
                easing: 'easeInOutSine'
            });
        }
    }, []);

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            setDirection(1);
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setDirection(-1);
            setActiveIndex(activeIndex - 1);
        }
    };

    // Pre-calculate rotations for visual variety
    const rotations = useMemo(() => [4, -2, -9, 7], []);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center p-8 w-full", className)}>
            <div
                className="relative flex flex-col items-center justify-center gap-8 w-full"
                style={{ perspective: "1400px", maxWidth: `${width}px` }}
            >
                {/* Counter */}
                {showCounter && (
                    <div className="text-center font-mono text-sm text-neutral-500 dark:text-neutral-400">
                        {activeIndex + 1} / {items.length}
                    </div>
                )}
                
                <div 
                    ref={floatRef}
                    className="p-6 md:p-8 flex flex-col justify-center min-h-[250px] w-full items-center text-center border border-[#111111]/10 bg-white/50 backdrop-blur-sm rounded-3xl"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -25 }}
                            transition={{ duration: 0.35 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                {activeItem.title}
                            </h3>
                            <p className="text-base text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed max-w-lg">
                                {activeItem.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                {showNavigation && items.length > 1 && (
                    <div className="flex gap-4 justify-center mt-4">
                        <button
                            disabled={activeIndex === 0}
                            onClick={handlePrev}
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                                activeIndex === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
                            )}
                            aria-label="Previous card"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        </button>
                        <button
                            disabled={activeIndex === items.length - 1}
                            onClick={handleNext}
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all",
                                activeIndex === items.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105"
                            )}
                            aria-label="Next card"
                        >
                            <ArrowRight className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestimonialsCard;
