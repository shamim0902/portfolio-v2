import { RefObject, useEffect } from 'react';
import { gsap } from '../utils/gsap';

export function useTiltCards(sectionRef: RefObject<HTMLElement>, selector = '.tilt-card') {
  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    const cards = Array.from(sectionRef.current.querySelectorAll<HTMLElement>(selector));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      gsap.set(card, {
        transformPerspective: 950,
        transformStyle: 'preserve-3d',
      });

      const rotateXTo = gsap.quickTo(card, 'rotationX', { duration: 0.24, ease: 'power3.out' });
      const rotateYTo = gsap.quickTo(card, 'rotationY', { duration: 0.24, ease: 'power3.out' });
      const yTo = gsap.quickTo(card, 'y', { duration: 0.24, ease: 'power3.out' });

      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;

        rotateYTo(relX * 8);
        rotateXTo(relY * -8);
        yTo(-4);
      };

      const onLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
        yTo(0);
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      cleanups.forEach((dispose) => dispose());
    };
  }, [sectionRef, selector]);
}
