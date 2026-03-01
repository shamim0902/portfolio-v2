import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], .tilt-card';

export function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current || !ringRef.current || !dotRef.current) return;
    if (typeof window === 'undefined') return;

    const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersFinePointer || prefersReducedMotion) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const isInteractiveRef = { current: false };
    document.body.classList.add('cursor-active');

    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    gsap.set([glow, ring, dot], { x: startX, y: startY });

    const glowX = gsap.quickTo(glow, 'x', { duration: 0.34, ease: 'power3.out' });
    const glowY = gsap.quickTo(glow, 'y', { duration: 0.34, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.2, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.2, ease: 'power3.out' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power3.out' });

    const moveTo = (x: number, y: number) => {
      glowX(x);
      glowY(y);
      ringX(x);
      ringY(y);
      dotX(x);
      dotY(y);
    };

    const onPointerMove = (event: PointerEvent) => {
      moveTo(event.clientX, event.clientY);
    };

    const onMouseMove = (event: MouseEvent) => {
      moveTo(event.clientX, event.clientY);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      isInteractiveRef.current = true;

      gsap.to(glow, {
        opacity: 0.48,
        scale: 1.12,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(ring, {
        scale: 1.26,
        opacity: 1,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(dot, {
        scale: 0.9,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      isInteractiveRef.current = false;

      gsap.to(glow, {
        opacity: 0.33,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(ring, {
        scale: 1,
        opacity: 0.8,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onPointerDown = () => {
      gsap.to(dot, {
        scale: 0.66,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(ring, {
        scale: 0.92,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onPointerUp = () => {
      gsap.to(dot, {
        scale: isInteractiveRef.current ? 0.9 : 1,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: true,
      });

      gsap.to(ring, {
        scale: isInteractiveRef.current ? 1.26 : 1,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onWindowBlur = () => {
      isInteractiveRef.current = false;
      gsap.to(glow, { opacity: 0.33, scale: 1, duration: 0.15, overwrite: true });
      gsap.to(ring, { scale: 1, opacity: 0.8, duration: 0.15, overwrite: true });
      gsap.to(dot, { scale: 1, duration: 0.15, overwrite: true });
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="custom-cursor-glow" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
