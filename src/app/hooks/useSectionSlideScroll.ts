import { RefObject, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

const NAV_OFFSET_PX = 96;
const LONG_PANEL_RATIO = 1.08;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function useSectionSlideScroll(
  containerRef: RefObject<HTMLElement>,
  options?: { panelSelector?: string }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const panelSelector = options?.panelSelector ?? 'section.section-shell';
    const cleanupFns: Array<() => void> = [];
    let rafId = 0;

    const cleanupAnimations = () => {
      while (cleanupFns.length) {
        const cleanup = cleanupFns.pop();
        if (cleanup) cleanup();
      }
    };

    const build = () => {
      cleanupAnimations();

      const panels = Array.from(container.children).filter(
        (node): node is HTMLElement =>
          node instanceof HTMLElement && node.matches(panelSelector)
      );

      if (panels.length < 2) return;

      const panelTweens: gsap.core.Tween[] = [];
      const triggers: ScrollTrigger[] = [];

      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, { clearProps: 'transform,opacity' });
          return;
        }

        const tween = gsap.fromTo(
          panel,
          { yPercent: 9, autoAlpha: 0.82 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom-=8%',
              end: `top top+=${NAV_OFFSET_PX}`,
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          }
        );

        panelTweens.push(tween);
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      const getSnapStops = () => {
        const maxScroll = ScrollTrigger.maxScroll(window);
        if (maxScroll <= 0) return [0, 1];

        return panels.map((panel) =>
          clamp((panel.offsetTop - NAV_OFFSET_PX) / maxScroll, 0, 1)
        );
      };

      const getPanelRanges = () => {
        return panels.map((panel, index) => {
          const start = Math.max(0, panel.offsetTop - NAV_OFFSET_PX);
          const nextPanel = panels[index + 1];
          const rawEnd = nextPanel ? Math.max(start, nextPanel.offsetTop - NAV_OFFSET_PX) : start + panel.offsetHeight;

          return {
            panel,
            start,
            end: rawEnd,
            height: panel.offsetHeight,
          };
        });
      };

      const snapTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: (progress: number) => {
            const maxScroll = ScrollTrigger.maxScroll(window);
            if (maxScroll <= 0) return progress;

            const currentScroll = progress * maxScroll;
            const panelRanges = getPanelRanges();
            const viewportH = window.innerHeight;
            const edgeThreshold = clamp(viewportH * 0.18, 84, 180);

            const activePanel = panelRanges.find(
              (range) => currentScroll >= range.start && currentScroll < range.end
            );

            // For tall sections, preserve free scroll while user is reading the middle.
            if (activePanel && activePanel.height > viewportH * LONG_PANEL_RATIO) {
              const distanceToTop = currentScroll - activePanel.start;
              const distanceToBottom = activePanel.end - currentScroll;

              if (distanceToTop > edgeThreshold && distanceToBottom > edgeThreshold) {
                return progress;
              }
            }

            const stops = getSnapStops();
            let nearest = stops[0];
            let minDistance = Math.abs(progress - nearest);

            for (let i = 1; i < stops.length; i += 1) {
              const distance = Math.abs(progress - stops[i]);
              if (distance < minDistance) {
                minDistance = distance;
                nearest = stops[i];
              }
            }

            // Do not force big jumps if user stops between far-apart sections.
            if (minDistance > 0.09) return progress;
            return nearest;
          },
          duration: { min: 0.16, max: 0.45 },
          delay: 0.03,
          ease: 'power1.out',
          directional: true,
          inertia: false,
        },
      });

      triggers.push(snapTrigger);
      ScrollTrigger.refresh();

      cleanupFns.push(() => {
        panelTweens.forEach((tween) => tween.kill());
        triggers.forEach((trigger) => trigger.kill());
        panels.forEach((panel) => gsap.set(panel, { clearProps: 'transform,opacity' }));
      });
    };

    const queueBuild = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(build);
    };

    build();

    const observer = new MutationObserver(queueBuild);
    observer.observe(container, { childList: true });

    const onLoad = () => queueBuild();
    window.addEventListener('load', onLoad);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('load', onLoad);
      cleanupAnimations();
    };
  }, [containerRef, options?.panelSelector]);
}
