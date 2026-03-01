import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], .tilt-card';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    document.body.classList.add('cursor-active');

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.2, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.2, ease: 'power3.out' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const onPointerMove = (event: PointerEvent) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;

      gsap.to(ring, {
        scale: 1.65,
        opacity: 0.95,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(dot, {
        scale: 0.55,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;

      gsap.to(ring, {
        scale: 1,
        opacity: 0.75,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
