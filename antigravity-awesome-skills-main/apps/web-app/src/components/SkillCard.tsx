import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SkillStarButton } from './SkillStarButton';
import type { Skill } from '../types';

interface SkillCardProps {
    skill: Skill;
    starCount: number;
    index?: number;
    featured?: boolean;
}

export const SkillCard = React.memo(({ skill, starCount, index = 0, featured = false }: SkillCardProps) => {
    // 3D Tilt & Glow effect logic
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXPos = e.clientX - rect.left;
            const mouseYPos = e.clientY - rect.top;
            
            x.set(mouseXPos);
            y.set(mouseYPos);
            
            const xPct = mouseXPos / width - 0.5;
            const yPct = mouseYPos / height - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2) }}
            className={`h-full ${featured ? 'w-full' : ''}`}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="h-full relative group"
            >
                <Link
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    to={`/skill/${skill.id}`}
                    className={`relative flex flex-col h-full rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-md p-6 shadow-xl transition-all duration-300 dark:border-slate-800/80 overflow-hidden ${featured ? 'md:p-8 min-h-[300px]' : ''}`}
                >
                    {/* Glow effect that tracks mouse */}
                    <motion.div 
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(400px circle at ${useTransform(x, v => `${v}px`)} ${useTransform(y, v => `${v}px`)}, rgba(99, 102, 241, 0.15), transparent 40%)`
                      }}
                    />

                    <div className="flex flex-wrap items-center justify-between mb-4 gap-2 relative z-10">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 ${featured ? 'p-3' : ''}`}>
                                <Book className={`${featured ? 'h-6 w-6' : 'h-5 w-5'} text-indigo-400`} />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                {skill.category || 'Uncategorized'}
                            </span>
                            
                            {/* Dynamic AI Verified Badge */}
                            {skill.trust_score !== undefined && skill.trust_score > 85 && (
                                <div className="relative group/badge">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-sm opacity-60 group-hover/badge:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                    <span className="relative text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/50 text-emerald-400 uppercase tracking-tighter flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" />
                                        Verified
                                    </span>
                                </div>
                            )}
                        </div>
                        <SkillStarButton
                            skillId={skill.id}
                            initialCount={starCount}
                            variant="default"
                        />
                    </div>

                    <h3 className={`${featured ? 'text-2xl md:text-3xl mb-3' : 'text-lg mb-2'} font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1 relative z-10`}>
                        @{skill.name}
                    </h3>

                    <p className={`text-slate-400 ${featured ? 'text-base md:text-lg line-clamp-3 mb-6' : 'text-sm line-clamp-2 mb-4'} flex-grow relative z-10 leading-relaxed`}>
                        {skill.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-slate-800 relative z-10">
                        <span className="flex items-center gap-1">Risk: <span className={`font-semibold ${skill.risk === 'high' ? 'text-rose-400' : skill.risk === 'low' ? 'text-emerald-400' : 'text-amber-400'}`}>{skill.risk || 'unknown'}</span></span>
                        {skill.date_added && (
                            <span className="ml-2 font-mono">{skill.date_added}</span>
                        )}
                    </div>

                    <div className="flex items-center text-sm font-semibold text-indigo-400 pt-1 mt-auto group-hover:translate-x-2 transition-transform relative z-10">
                        Read Skill <ArrowRight className="ml-1.5 h-4 w-4" />
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
});

SkillCard.displayName = 'SkillCard';
