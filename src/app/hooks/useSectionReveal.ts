import { RefObject, useEffect } from 'react';
import { gsap } from '../utils/gsap';

type SectionRevealOptions = {
  once?: boolean;
  start?: string;
};

export function useSectionReveal(
  sectionRef: RefObject<HTMLElement>,
  selector = '.reveal-item',
  options?: SectionRevealOptions
) {
  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const once = options?.once ?? false;
    const start = options?.start ?? 'top 88%';

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector, sectionRef.current);

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: 30,
            z: -120,
            opacity: 0,
            rotateX: 11,
            rotateY: -6,
            transformOrigin: '50% 100%',
            force3D: true,
          },
          {
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.72,
            ease: 'power3.out',
            delay: index * 0.03,
            scrollTrigger: {
              trigger: item,
              start,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, selector, options?.once, options?.start]);
}
