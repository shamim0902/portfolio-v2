import { RefObject, useEffect } from 'react';
import { gsap } from '../utils/gsap';

export function useSectionReveal(sectionRef: RefObject<HTMLElement>, selector = '.reveal-item') {
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector, sectionRef.current);

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: index * 0.03,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, selector]);
}
