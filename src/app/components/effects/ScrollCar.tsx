import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';
import {
  playBrakeSound,
  playCrashSound,
  playEngineStartSound,
  playHornSound,
  playPopSound,
  unlockCarAudio,
} from '../../utils/carSound';

type DriveEvent = 'cruise' | 'stop_honk' | 'hard_brake' | 'crash';
const MAX_CAR_RUN_MS = 5200;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

const pickDriveEvent = (): DriveEvent => {
  const roll = Math.random();
  if (roll < 0.22) return 'stop_honk';
  if (roll < 0.41) return 'hard_brake';
  if (roll < 0.57) return 'crash';
  return 'cruise';
};

const pickCrashTarget = () => {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>('.tilt-card, .holo-card, .prism-card, .reveal-item')
  );

  const visible = candidates.filter((node) => {
    const rect = node.getBoundingClientRect();
    return rect.width > 28 && rect.height > 28 && rect.bottom > 40 && rect.top < window.innerHeight - 40;
  });

  if (!visible.length) return null;

  const lowerHalf = visible.filter((node) => {
    const rect = node.getBoundingClientRect();
    return rect.top + rect.height * 0.5 > window.innerHeight * 0.56;
  });

  const pool = lowerHalf.length && Math.random() < 0.92 ? lowerHalf : visible;
  return pool[Math.floor(Math.random() * pool.length)];
};

const pickLane = () => {
  const vh = window.innerHeight;
  return clamp(vh * 0.84, 86, vh - 84);
};

export function ScrollCar() {
  const carRef = useRef<HTMLDivElement>(null);
  const honkRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const car = carRef.current;
    const honk = honkRef.current;
    const pop = popRef.current;
    if (!car || !honk || !pop) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wheels = Array.from(car.querySelectorAll<HTMLElement>('.scroll-car-wheel'));
    const taillight = car.querySelector<HTMLElement>('.scroll-car-taillight');
    const headlight = car.querySelector<HTMLElement>('.scroll-car-headlight');
    const beam = car.querySelector<HTMLElement>('.scroll-car-beam');
    const smokes = Array.from(car.querySelectorAll<HTMLElement>('.scroll-car-smoke'));

    let lastY = window.scrollY;
    let isRunning = false;
    let isStuckPhase = false;
    let activeDirection: 1 | -1 = 1;
    let cooldownUntil = 0;
    let activeTimeline: gsap.core.Timeline | null = null;
    let scrollAccumulator = 0;
    let nextTriggerDistance = randomRange(620, 1800);
    let hasUnlockRequest = false;
    let runGuardId: number | null = null;

    const clearRunGuard = () => {
      if (runGuardId === null) return;
      window.clearTimeout(runGuardId);
      runGuardId = null;
    };

    const setStuckPhase = (next: boolean) => {
      isStuckPhase = next;
      car.classList.toggle('scroll-car-stuck', next);
    };

    const shakeTarget = (target: HTMLElement, direction: number) => {
      gsap.fromTo(
        target,
        {
          x: 0,
          y: 0,
          rotateZ: 0,
          filter: 'none',
        },
        {
          x: direction * 10,
          y: -4,
          rotateZ: direction * 1.2,
          filter: 'saturate(1.12) brightness(1.06)',
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          clearProps: 'x,y,rotateZ,filter',
          overwrite: true,
        }
      );
    };

    const flashBrakeLight = () => {
      if (!taillight) return;
      gsap.fromTo(
        taillight,
        { boxShadow: '0 0 10px rgba(248, 113, 113, 0.54)', scale: 1 },
        {
          boxShadow: '0 0 18px rgba(254, 202, 202, 0.95)',
          scale: 1.28,
          transformOrigin: '50% 50%',
          duration: 0.12,
          repeat: 3,
          yoyo: true,
          ease: 'power1.inOut',
          overwrite: true,
        }
      );
    };

    const pulseHeadlight = (bursts = 2, intensity = 1) => {
      if (headlight) {
        gsap.fromTo(
          headlight,
          {
            boxShadow: '0 0 12px rgba(254, 249, 195, 0.65)',
            scale: 1,
          },
          {
            boxShadow: `0 0 ${16 + intensity * 8}px rgba(254, 249, 195, 0.95)`,
            scale: 1 + 0.08 * intensity,
            duration: 0.1,
            repeat: bursts,
            yoyo: true,
            ease: 'power1.inOut',
            overwrite: true,
            transformOrigin: '50% 50%',
          }
        );
      }

      if (beam) {
        gsap.fromTo(
          beam,
          {
            autoAlpha: 0,
            scaleX: 0.18,
          },
          {
            autoAlpha: 0.8,
            scaleX: 1,
            duration: 0.1,
            repeat: bursts,
            yoyo: true,
            ease: 'power1.out',
            overwrite: true,
            transformOrigin: '0% 50%',
          }
        );
      }
    };

    const showHonk = (direction: number, text: string, repeats = 1) => {
      const carX = Number(gsap.getProperty(car, 'x'));
      const carY = Number(gsap.getProperty(car, 'y'));

      honk.textContent = text;
      gsap.killTweensOf(honk);
      gsap.set(honk, {
        x: carX + direction * 76,
        y: carY - 42,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.54,
      });

      const tl = gsap.timeline();

      for (let i = 0; i < repeats; i += 1) {
        const offset = i * 0.24;
        tl.to(honk, { autoAlpha: 1, scale: 1, y: `-=${16}`, duration: 0.11, ease: 'back.out(2.4)' }, offset).to(
          honk,
          { autoAlpha: 0, scale: 1.08, y: `-=${10}`, duration: 0.17, ease: 'power1.out' },
          offset + 0.11
        );
      }
    };

    const showImpactPop = (x: number, y: number) => {
      playPopSound();

      gsap.killTweensOf(pop);
      gsap.set(pop, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.48,
        rotation: randomRange(-18, 18),
      });

      gsap
        .timeline()
        .to(pop, { autoAlpha: 1, scale: 1.06, duration: 0.12, ease: 'back.out(2.8)' })
        .to(pop, { autoAlpha: 0, scale: 1.45, y: '-=14', duration: 0.2, ease: 'power1.out' });
    };

    const playHorn = (direction: number, text = 'HONK!', repeats = 2) => {
      playHornSound(repeats);
      showHonk(direction, text, repeats);
      pulseHeadlight(Math.max(1, repeats), 1.2);
      gsap.to(car, {
        y: '-=5',
        duration: 0.08,
        repeat: repeats * 2 - 1,
        yoyo: true,
        ease: 'sine.inOut',
        overwrite: true,
      });
    };

    const addEngineStart = (timeline: gsap.core.Timeline, direction: number) => {
      const signed = direction === 1 ? 1 : -1;
      playEngineStartSound();

      timeline
        .to(car, { x: `+=${signed * 6}`, duration: 0.06, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0.02)
        .to(wheels, { rotation: `+=${signed * 98}`, duration: 0.34, ease: 'power1.out' }, 0.03)
        .fromTo(
          smokes,
          { autoAlpha: 0, scale: 0.42, x: 0, y: 0 },
          {
            autoAlpha: 0.74,
            scale: 1.26,
            x: signed === 1 ? -26 : 26,
            y: -24,
            stagger: 0.05,
            duration: 0.34,
            ease: 'power1.out',
          },
          0.04
        )
        .to(smokes, { autoAlpha: 0, scale: 1.54, duration: 0.2, stagger: 0.04, ease: 'power1.out' }, 0.24)
        .add(() => {
          pulseHeadlight(1, 1.1);
          showHonk(direction, 'VROOM', 1);
        }, 0.01);
    };

    const onDriveComplete = () => {
      clearRunGuard();
      setStuckPhase(false);
      isRunning = false;
      activeTimeline = null;
    };

    const scheduleRunGuard = (timeoutMs = MAX_CAR_RUN_MS) => {
      clearRunGuard();

      runGuardId = window.setTimeout(() => {
        if (!isRunning) return;
        if (activeTimeline) activeTimeline.kill();

        gsap.to(car, {
          autoAlpha: 0,
          duration: 0.2,
          overwrite: true,
          onComplete: onDriveComplete,
        });
      }, timeoutMs);
    };

    const manualRestartFromClick = () => {
      if (!isRunning || !isStuckPhase) return;

      setStuckPhase(false);
      if (activeTimeline) activeTimeline.kill();
      clearRunGuard();

      void unlockCarAudio();
      playEngineStartSound();
      playHornSound(1);

      const currentX = Number(gsap.getProperty(car, 'x'));
      const endX = activeDirection === 1 ? window.innerWidth + 280 : -280;

      gsap.killTweensOf([car, honk, pop, beam, headlight, taillight, ...smokes, ...wheels]);
      gsap.set([honk, pop, beam, ...smokes], { autoAlpha: 0 });

      const boostTimeline = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        onComplete: onDriveComplete,
      });
      activeTimeline = boostTimeline;
      scheduleRunGuard(3800);

      addEngineStart(boostTimeline, activeDirection);

      boostTimeline
        .to(car, { x: currentX + activeDirection * 92, duration: 0.58, ease: 'power1.out' }, 0.2)
        .to(wheels, { rotation: `+=${activeDirection * 220}`, duration: 0.58, ease: 'none' }, 0.2)
        .to(car, { rotationZ: activeDirection * 2.6, duration: 0.08, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 0.24)
        .to(car, { x: endX, duration: 1.15, ease: 'power3.in' }, '>-0.02')
        .to(wheels, { rotation: `+=${activeDirection * 1250}`, duration: 1.15, ease: 'none' }, '<')
        .to(car, { autoAlpha: 0, duration: 0.2 }, '>-0.18');
    };

    const maybeDrive = () => {
      if (isRunning) return;

      const now = performance.now();
      if (now < cooldownUntil) return;

      // Keep the effect occasional so it feels like a random surprise.
      if (Math.random() < 0.66) return;

      const event = pickDriveEvent();
      const direction: 1 = 1;
      const signed: 1 = 1;
      activeDirection = signed;

      const startX = -280;
      const endX = window.innerWidth + 280;
      const scale = randomRange(0.74, 1.08);
      const duration = randomRange(2.3, 3.4);
      const tilt = 6;

      let crashTarget: HTMLElement | null = null;
      let lane = pickLane();
      let crashX = clamp(window.innerWidth * randomRange(0.3, 0.72), 100, window.innerWidth - 100);

      if (event === 'crash') {
        crashTarget = pickCrashTarget();
        if (crashTarget) {
          const rect = crashTarget.getBoundingClientRect();
          crashX = clamp(rect.left + rect.width * randomRange(0.36, 0.68), 96, window.innerWidth - 96);
        }
      }

      isRunning = true;
      cooldownUntil = now + randomRange(4600, 9800);
      setStuckPhase(false);

      gsap.killTweensOf([car, honk, pop, beam, headlight, taillight, ...smokes, ...wheels]);
      if (activeTimeline) activeTimeline.kill();

      gsap.set(car, {
        x: startX,
        y: lane,
        autoAlpha: 0,
        scale,
        rotationY: direction === 1 ? 0 : 180,
        rotationZ: 0,
        force3D: true,
      });
      gsap.set([honk, pop, beam, ...smokes], { autoAlpha: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        onComplete: onDriveComplete,
      });
      activeTimeline = timeline;

      scheduleRunGuard();

      const engineLead = 0.36;

      timeline.to(car, { autoAlpha: 0.98, duration: 0.14 }, 0);
      addEngineStart(timeline, direction);

      if (event === 'stop_honk') {
        const stopX = startX + (endX - startX) * randomRange(0.34, 0.58);
        const enterDuration = Math.min(1.05, duration * 0.34);
        const exitDuration = Math.min(1.55, duration * 0.48);
        const pauseDuration = 0.72;
        const restartDuration = 0.34;

        timeline
          .to(car, { x: stopX, duration: enterDuration, ease: 'power2.out' }, engineLead)
          .to(wheels, { rotation: `+=${signed * 640}`, duration: enterDuration, ease: 'none' }, engineLead)
          .to(car, { rotationZ: tilt * 0.6, duration: 0.14, repeat: 3, yoyo: true, ease: 'sine.inOut' }, engineLead + 0.08)
          .add(() => playHorn(direction, 'HONK!', 3), engineLead + enterDuration - 0.03)
          .add(() => setStuckPhase(true), `>`)
          .to(car, { x: stopX + signed * 1.2, duration: pauseDuration, ease: 'none' })
          .to(wheels, { rotation: `+=${signed * 28}`, duration: pauseDuration, ease: 'none' }, '<')
          .add(() => pulseHeadlight(6, 1.4), '<+0.02')
          .add(() => playHorn(direction, 'BEEEEP', 2), '<+0.14')
          .add(() => {
            setStuckPhase(false);
            playEngineStartSound();
            showHonk(direction, 'VROOM', 1);
            pulseHeadlight(3, 1.25);
          }, '>-0.02')
          .to(car, { x: `+=${signed * 9}`, duration: restartDuration, ease: 'power1.inOut' })
          .to(wheels, { rotation: `+=${signed * 92}`, duration: restartDuration, ease: 'none' }, '<')
          .to(car, { x: endX, duration: exitDuration, ease: 'power2.in' })
          .to(wheels, { rotation: `+=${signed * 980}`, duration: exitDuration, ease: 'none' }, '<');
      } else if (event === 'hard_brake') {
        const brakeX = startX + (endX - startX) * randomRange(0.4, 0.62);
        const enterDuration = Math.min(0.95, duration * 0.28);
        const exitDuration = Math.min(1.8, duration * 0.56);

        timeline
          .to(car, { x: brakeX, duration: enterDuration, ease: 'power3.out' }, engineLead)
          .to(wheels, { rotation: `+=${signed * 720}`, duration: enterDuration, ease: 'none' }, engineLead)
          .add(() => {
            flashBrakeLight();
            playBrakeSound();
          }, engineLead + enterDuration * 0.8)
          .to(car, { x: `-=${signed * 14}`, duration: 0.12, ease: 'power2.out' })
          .to(car, { x: `+=${signed * 7}`, duration: 0.1, ease: 'power2.in' })
          .to(car, { x: `+=${signed * 4}`, duration: 0.08, repeat: 2, yoyo: true, ease: 'power1.inOut' })
          .to(car, { rotationZ: tilt * 1.2, duration: 0.06, repeat: 2, yoyo: true, ease: 'power1.inOut' }, '<')
          .add(() => playHorn(direction, '...beep?', 1), '>-0.02')
          .add(() => setStuckPhase(true), '>-0.01')
          .to(car, { x: brakeX + signed * 10, duration: 0.36, ease: 'none' }, '+=0.02')
          .to(wheels, { rotation: `+=${signed * 34}`, duration: 0.36, ease: 'none' }, '<')
          .add(() => {
            setStuckPhase(false);
            playEngineStartSound();
            showHonk(direction, 'VROOM', 1);
            pulseHeadlight(3, 1.18);
          }, '<+0.04')
          .to(car, { x: brakeX + signed * 30, duration: 0.3, ease: 'power1.inOut' })
          .to(wheels, { rotation: `+=${signed * 110}`, duration: 0.3, ease: 'none' }, '<')
          .to(car, { x: endX, duration: exitDuration, ease: 'power2.in' })
          .to(wheels, { rotation: `+=${signed * 1060}`, duration: exitDuration, ease: 'none' }, '<')
          .to(car, { rotationZ: tilt * 0.7, duration: 0.15, repeat: 3, yoyo: true, ease: 'sine.inOut' }, '<');
      } else if (event === 'crash' && crashTarget) {
        const crashDuration = clamp(Math.abs(crashX - startX) / 470, 0.9, duration * 0.6);
        const exitDuration = Math.max(1.05, duration * 0.78);

        timeline
          .to(car, { x: crashX - signed * 22, duration: crashDuration, ease: 'power2.in' }, engineLead)
          .to(wheels, { rotation: `+=${signed * 920}`, duration: crashDuration, ease: 'none' }, engineLead)
          .add(() => {
            playCrashSound();
            showImpactPop(crashX, lane - 18);
          }, engineLead + crashDuration - 0.01)
          .add(() => shakeTarget(crashTarget as HTMLElement, signed), engineLead + crashDuration - 0.01)
          .add(() => playHorn(direction, 'POP!', 1), engineLead + crashDuration + 0.01)
          .to(car, { x: `-=${signed * 48}`, duration: 0.16, ease: 'power2.out' })
          .to(car, { x: `+=${signed * 16}`, duration: 0.12, ease: 'power2.in' })
          .to(car, { rotationZ: tilt * -1.7, duration: 0.08, repeat: 3, yoyo: true, ease: 'power1.inOut' }, '<')
          .to(wheels, { rotation: `+=${signed * 220}`, duration: 0.5, ease: 'none' }, '<')
          .to(car, { x: `+=${72}`, duration: 0.36, ease: 'power1.out' }, '+=0.02')
          .to(wheels, { rotation: `+=${220}`, duration: 0.36, ease: 'none' }, '<')
          .to(car, { x: endX, duration: exitDuration, ease: 'power2.in' })
          .to(wheels, { rotation: `+=${1240}`, duration: exitDuration, ease: 'none' }, '<')
          .set(car, { autoAlpha: 0 });
      } else {
        timeline
          .to(car, { x: endX, duration }, engineLead)
          .to(car, { rotationZ: tilt, duration: 0.2, repeat: 7, yoyo: true, ease: 'sine.inOut' }, engineLead)
          .to(wheels, { rotation: `+=${signed * 1760}`, duration, ease: 'none' }, engineLead)
          .add(() => pulseHeadlight(1, 0.9), engineLead + duration * 0.45);
      }

      if (event !== 'crash') {
        timeline.to(car, { autoAlpha: 0, duration: 0.24 }, '>-0.25');
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY);
      lastY = currentY;

      if (delta < 10) return;

      if (!hasUnlockRequest) {
        hasUnlockRequest = true;
        void unlockCarAudio();
      }

      scrollAccumulator += delta;
      if (scrollAccumulator < nextTriggerDistance) return;

      scrollAccumulator = 0;
      nextTriggerDistance = randomRange(560, 1700);
      maybeDrive();
    };

    const onResize = () => {
      if (isRunning) return;
      gsap.set(car, { x: -320, y: clamp(window.innerHeight * 0.84, 86, window.innerHeight - 84), autoAlpha: 0 });
      gsap.set([honk, pop], { autoAlpha: 0 });
    };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    car.addEventListener('click', manualRestartFromClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      car.removeEventListener('click', manualRestartFromClick);
      clearRunGuard();

      if (activeTimeline) activeTimeline.kill();
      gsap.killTweensOf([car, honk, pop, beam, headlight, taillight, ...smokes, ...wheels]);
    };
  }, []);

  return (
    <div className="scroll-car-layer" aria-hidden="true">
      <div ref={honkRef} className="scroll-car-honk">
        HONK!
      </div>
      <div ref={popRef} className="scroll-car-pop">
        POP!
      </div>

      <div ref={carRef} className="scroll-car">
        <div className="scroll-car-shadow" />
        <div className="scroll-car-body">
          <div className="scroll-car-roof" />
          <div className="scroll-car-doorline" />
          <div className="scroll-car-window scroll-car-window-front" />
          <div className="scroll-car-window scroll-car-window-back" />
          <div className="scroll-car-grill" />
          <div className="scroll-car-bumper" />
          <div className="scroll-car-beam" />
          <div className="scroll-car-exhaust">
            <span className="scroll-car-smoke" />
            <span className="scroll-car-smoke" />
            <span className="scroll-car-smoke" />
          </div>
          <div className="scroll-car-headlight" />
          <div className="scroll-car-taillight" />
        </div>
        <div className="scroll-car-wheel scroll-car-wheel-back">
          <span />
        </div>
        <div className="scroll-car-wheel scroll-car-wheel-front">
          <span />
        </div>
      </div>
    </div>
  );
}
