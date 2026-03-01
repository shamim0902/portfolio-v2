import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import portfolioData from '../../../data/portfolio.json';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Parallax effect for cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-20 dark:from-black dark:via-gray-900 dark:to-black md:py-24"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">About Me</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Building Products That Matter</h2>
        </motion.div>

        {/* About text */}
        <div
          ref={addToRefs}
          className="mb-10 rounded-xl border border-slate-300/70 bg-white/80 p-5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 dark:border-white/10 dark:bg-white/5 md:p-6"
        >
          <p className="text-base leading-relaxed text-slate-700 dark:text-gray-300 md:text-lg">
            {portfolioData.about}
          </p>
        </div>

        {/* Roles */}
        <div className="mb-10">
          <h3 className="mb-4 text-center text-xl font-bold text-slate-900 dark:text-white">Career Journey</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {portfolioData.roles.map((role, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="group rounded-lg border border-slate-300/70 bg-gradient-to-br from-white to-slate-100 p-4 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/50 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-sm text-slate-700 dark:text-gray-300">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="mb-4 text-center text-xl font-bold text-slate-900 dark:text-white">Technical Skills</h3>
          <div
            ref={addToRefs}
            className="flex flex-wrap justify-center gap-2"
          >
            {portfolioData.skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="cursor-default rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 px-4 py-1.5 text-xs font-medium text-cyan-700 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 dark:text-cyan-400"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
