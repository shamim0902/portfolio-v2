import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';

export function SceneBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backdropRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const orbs = gsap.utils.toArray<HTMLElement>('.scene-orb', backdropRef.current);
      orbs.forEach((orb, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.to(orb, {
          x: direction * (36 + index * 12),
          y: direction * (-28 - index * 8),
          rotation: direction * (8 + index * 3),
          duration: 14 + index * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.to('.scene-grid', {
        backgroundPosition: '170px 120px',
        duration: 32,
        ease: 'none',
        repeat: -1,
      });
    }, backdropRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={backdropRef} className="site-stage pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="scene-grid absolute inset-0" />
      <div className="scene-orb absolute -left-14 top-16 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-400/35 via-sky-400/20 to-transparent blur-[90px]" />
      <div className="scene-orb absolute right-[-6rem] top-[28%] h-80 w-80 rounded-full bg-gradient-to-br from-emerald-300/28 via-cyan-300/20 to-transparent blur-[110px]" />
      <div className="scene-orb absolute bottom-[-8rem] left-[38%] h-96 w-96 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-300/16 to-transparent blur-[120px]" />
      <div className="scene-orb absolute bottom-[-5rem] right-[16%] h-72 w-72 rounded-full bg-gradient-to-br from-orange-300/18 via-cyan-300/12 to-transparent blur-[120px]" />
    </div>
  );
}
