import { useRef } from 'react';
import { motion } from 'motion/react';
import portfolioData from '../../../data/portfolio.json';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';
import { useDepthParallax } from '../../hooks/useDepthParallax';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, '.reveal-item');
  useTiltCards(sectionRef);
  useDepthParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-shell mesh-aurora relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-20 dark:from-black dark:via-gray-900 dark:to-black md:py-24"
    >
      <div data-depth="1.3" className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div data-depth="1.1" data-depth-x="12" className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-emerald-300/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-9 text-center reveal-item">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">About Me</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Building Products That Matter</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.article className="tilt-card prism-card holo-card rounded-xl p-5 reveal-item">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-gray-300 md:text-base">
              {portfolioData.about}
            </p>
          </motion.article>

          <motion.article className="tilt-card prism-card holo-card rounded-xl p-5 reveal-item">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              Career Journey
            </h3>
            <div className="space-y-2.5">
              {portfolioData.roles.map((role, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-300/70 bg-white/80 px-3 py-2.5 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {role}
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article className="tilt-card prism-card holo-card rounded-xl p-5 reveal-item lg:col-span-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
              Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-700 dark:text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
