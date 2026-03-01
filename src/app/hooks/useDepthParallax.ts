import { RefObject, useEffect } from 'react';
import { gsap } from '../utils/gsap';

export function useDepthParallax(sectionRef: RefObject<HTMLElement>, selector = '[data-depth]') {
  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const nodes = gsap.utils.toArray<HTMLElement>(selector, section);
      nodes.forEach((node) => {
        const depth = Number(node.dataset.depth ?? '1');
        const depthX = Number(node.dataset.depthX ?? '0');
        const depthY = Number(node.dataset.depthY ?? `${depth * 18}`);

        gsap.fromTo(
          node,
          { x: depthX * -0.35, y: depthY * -0.35 },
          {
            x: depthX,
            y: depthY,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.05,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, selector]);
}
