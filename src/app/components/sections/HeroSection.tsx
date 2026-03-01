import { useState, useEffect, useRef } from 'react';
import portfolioData from '../../../data/portfolio.json';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, '.reveal-item');
  useTiltCards(sectionRef);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-gray-900 dark:to-black"
      onMouseMove={handleMouseMove}
    >
      {/* Animated glow background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-80"
          animate={{
            background: [
              'radial-gradient(40% 40% at 30% 30%, rgba(6, 182, 212, 0.35), transparent 70%)',
              'radial-gradient(40% 40% at 70% 35%, rgba(34, 211, 238, 0.3), transparent 70%)',
              'radial-gradient(40% 40% at 35% 70%, rgba(14, 116, 144, 0.35), transparent 70%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{
            transform: `translate3d(${mousePosition.x * 12}px, ${-mousePosition.y * 12}px, 0)`,
          }}
        />
      )}
      
      {/* Fallback gradient for reduced motion */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent dark:from-cyan-500/20" />
      )}
      
      {/* Content overlay */}
      <div className="mesh-aurora relative z-10 flex h-full flex-col items-center justify-center px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl text-center reveal-item"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 reveal-item"
          >
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-700 backdrop-blur-sm dark:text-cyan-400">
              {portfolioData.title}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl reveal-item"
          >
            {portfolioData.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-2 text-lg text-slate-700 dark:text-gray-300 md:text-xl reveal-item"
          >
            {portfolioData.tagline}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-base text-slate-600 dark:text-gray-400 reveal-item"
          >
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            {portfolioData.location}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-3 reveal-item"
          >
            <a
              href={`mailto:${portfolioData.email}`}
              className="tilt-card neon-outline group rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="tilt-card neon-outline rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={scrollToNext}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer text-slate-500 transition-colors hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Decorative grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
    </section>
  );
}
