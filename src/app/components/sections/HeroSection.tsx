import { useState, useEffect, useRef } from 'react';
import portfolioData from '../../../data/portfolio.json';
import { motion } from 'motion/react';
import { ChevronDown, Facebook, Github, Globe, Linkedin, Sparkles, Twitter } from 'lucide-react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';
import { useDepthParallax } from '../../hooks/useDepthParallax';
import { ProfileAvatar } from '../shared/ProfileAvatar';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const socialConnects = [
    { label: 'GitHub', href: portfolioData.links.github, icon: Github },
    { label: 'LinkedIn', href: portfolioData.links.linkedin, icon: Linkedin },
    { label: 'Twitter', href: portfolioData.links.twitter, icon: Twitter },
    { label: 'Facebook', href: portfolioData.links.facebook, icon: Facebook },
    { label: 'Website', href: portfolioData.links.website, icon: Globe },
  ];

  useSectionReveal(sectionRef, '.reveal-item');
  useTiltCards(sectionRef);
  useDepthParallax(sectionRef);

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
      className="section-shell relative min-h-[760px] w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-gray-900 dark:to-black"
      onMouseMove={handleMouseMove}
    >
      <div
        data-depth="1.4"
        data-depth-x="-12"
        className="absolute -left-16 top-14 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]"
      />
      <div
        data-depth="1.1"
        data-depth-x="16"
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-sky-300/16 blur-[120px]"
      />

      {/* Animated glow background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-85"
          animate={{
            background: [
              'radial-gradient(50% 52% at 22% 28%, rgba(6, 182, 212, 0.32), transparent 73%)',
              'radial-gradient(52% 50% at 76% 35%, rgba(16, 185, 129, 0.24), transparent 74%)',
              'radial-gradient(48% 52% at 34% 72%, rgba(14, 116, 144, 0.33), transparent 70%)',
            ],
          }}
          transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
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
      <div className="mesh-aurora relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 pb-12 pt-20">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl text-center lg:text-left reveal-item"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 reveal-item"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-700 backdrop-blur-sm dark:text-cyan-400">
                <Sparkles size={12} />
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
              className="flex items-center justify-center gap-2 text-base text-slate-600 dark:text-gray-400 lg:justify-start reveal-item"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              {portfolioData.location}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start reveal-item"
            >
              <a
                href={`mailto:${portfolioData.email}`}
                className="tilt-card prism-card neon-outline group rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/45"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="tilt-card prism-card neon-outline rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                View Projects
              </a>
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {socialConnects.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal-item inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-white/65 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:border-cyan-500/45 hover:text-cyan-700 dark:bg-white/5 dark:text-gray-300 dark:hover:text-cyan-300"
                >
                  <social.icon size={11} className="text-cyan-600 dark:text-cyan-400" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35 }}
            className="reveal-item relative mx-auto w-full max-w-md"
          >
            <div data-depth="1.3" data-depth-x="-14" className="orbital-float absolute -left-6 top-5 h-16 w-16 rounded-2xl border border-cyan-400/35 bg-cyan-400/20 backdrop-blur-xl" />
            <div data-depth="1.1" data-depth-x="14" className="orbital-float absolute -right-4 bottom-16 h-14 w-14 rounded-full border border-sky-300/35 bg-sky-300/20 backdrop-blur-xl" />

            <div className="tilt-card prism-card holo-card relative overflow-hidden rounded-[1.75rem] p-3">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(103,232,249,0.25),transparent_38%)]" />
              <ProfileAvatar className="h-[340px] w-full rounded-[1.25rem] object-cover" />
              <div className="relative mt-3 rounded-xl border border-slate-200/85 bg-white/88 p-3 dark:border-white/10 dark:bg-slate-900/70">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">Tech + Travel</p>
                <p className="mt-1 text-sm text-slate-700 dark:text-gray-300">
                  Building product systems while collecting stories across countries.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border border-slate-200/70 bg-white/90 p-2 dark:border-white/10 dark:bg-white/5">
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{portfolioData.countriesVisited.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400">Countries</p>
                  </div>
                  <div className="rounded-lg border border-slate-200/70 bg-white/90 p-2 dark:border-white/10 dark:bg-white/5">
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{portfolioData.roles.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400">Roles</p>
                  </div>
                  <div className="rounded-lg border border-slate-200/70 bg-white/90 p-2 dark:border-white/10 dark:bg-white/5">
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{portfolioData.skills.length}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400">Skills</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
        
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
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </section>
  );
}
