'use client';

import { useState, useRef, useCallback } from 'react';
import { PrizeItem, SpinState } from '@/types/wheel';
import { iosSpringInertiaEase, getActiveSectorIndex } from '@/utils/geometry';

interface UseLuckyWheelOptions {
  prizes: PrizeItem[];
  wheelGroupRef?: React.RefObject<SVGGElement | null>;
  needleRef?: React.RefObject<HTMLDivElement | null>;
  onSpinStart?: () => void;
  onTick?: (velocityRatio: number) => void;
  onWin?: (prize: PrizeItem) => void;
  onSpawnConfetti?: (burst: boolean) => void;
}

export function useLuckyWheel({
  prizes,
  wheelGroupRef,
  needleRef,
  onSpinStart,
  onTick,
  onWin,
  onSpawnConfetti,
}: UseLuckyWheelOptions) {
  const [spinState, setSpinState] = useState<SpinState>('idle');
  const [currentRotation, setCurrentRotation] = useState(0);
  const [needleDeflection, setNeedleDeflection] = useState(0);
  const [activePrize, setActivePrize] = useState<PrizeItem | null>(null);

  const rotationRef = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const lastNotchedSectorRef = useRef(-1);
  const needleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const spin = useCallback(() => {
    if (spinState === 'spinning' || prizes.length === 0) return;

    setSpinState('spinning');
    setActivePrize(null);
    onSpinStart?.();

    const count = prizes.length;
    const sliceAngle = 360 / count;

    // Pick winning prize
    const winIndex = Math.floor(Math.random() * count);
    const targetSliceCenter = winIndex * sliceAngle + sliceAngle / 2;

    const fullSpins = (Math.floor(Math.random() * 3) + 7) * 360; // 7 to 9 full spins
    const currentMod = rotationRef.current % 360;
    const neededOffset = (360 - targetSliceCenter - currentMod + 360) % 360;
    const deltaRotation = fullSpins + neededOffset;

    const startRot = rotationRef.current;
    const duration = 5400; // 5.4 seconds for cinematic Apple spring inertia
    const startTime = performance.now();

    let lastTime = startTime;
    let lastRot = startRot;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Instantaneous angular velocity calculation
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      if (progress < 1) {
        const nextRotation = startRot + deltaRotation * iosSpringInertiaEase(progress);
        const deltaDeg = Math.abs(nextRotation - lastRot);
        lastRot = nextRotation;

        rotationRef.current = nextRotation;

        // HIGH-PERFORMANCE DIRECT DOM COMPOSITOR UPDATE (0 React re-renders)
        if (wheelGroupRef?.current) {
          wheelGroupRef.current.style.transform = `rotate(${nextRotation}deg)`;
        }

        const velocityDegPerSec = (deltaDeg / dt) * 1000;
        const velocityRatio = Math.min(1, velocityDegPerSec / 2400);

        // Detect sector crossings for needle deflection & variable pitch audio tick
        const currentActive = getActiveSectorIndex(nextRotation, count);
        if (currentActive !== lastNotchedSectorRef.current) {
          lastNotchedSectorRef.current = currentActive;

          // Needle deflection proportional to speed
          const deflection = velocityRatio > 0.5
            ? -9 - Math.random() * 3
            : -15 - Math.random() * 3;

          // Direct DOM needle deflection (0 React re-renders)
          if (needleRef?.current) {
            needleRef.current.style.transition = 'transform 25ms ease-out';
            needleRef.current.style.transform = `rotate(${deflection}deg)`;
          }

          if (needleTimerRef.current) clearTimeout(needleTimerRef.current);

          const returnDuration = velocityRatio > 0.5 ? 25 : 55;
          needleTimerRef.current = setTimeout(() => {
            if (needleRef?.current) {
              needleRef.current.style.transition = 'transform 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              needleRef.current.style.transform = 'rotate(0deg)';
            }
          }, returnDuration);

          onTick?.(velocityRatio);
        }

        // Terminal micro-rebound needle reaction
        if (progress > 0.89 && progress < 0.98) {
          if (needleRef?.current) {
            needleRef.current.style.transform = 'rotate(2.2deg)';
          }
        }

        // Light celebratory sparkle drift without saturating GPU
        if (progress < 0.45 && Math.random() < 0.06) {
          onSpawnConfetti?.(false);
        }

        animFrameId.current = requestAnimationFrame(animate);
      } else {
        // Spin complete: exact lock
        const finalRotation = startRot + deltaRotation;
        rotationRef.current = finalRotation;
        
        if (wheelGroupRef?.current) {
          wheelGroupRef.current.style.transform = `rotate(${finalRotation}deg)`;
        }
        if (needleRef?.current) {
          needleRef.current.style.transition = 'transform 150ms ease-out';
          needleRef.current.style.transform = 'rotate(0deg)';
        }

        setCurrentRotation(finalRotation);
        setNeedleDeflection(0);

        const wonPrize = prizes[winIndex];
        setActivePrize(wonPrize);
        setSpinState('won');

        // Victory celebration
        onSpawnConfetti?.(true);
        onWin?.(wonPrize);
      }
    };

    animFrameId.current = requestAnimationFrame(animate);
  }, [prizes, spinState, onSpinStart, onTick, onWin, onSpawnConfetti, wheelGroupRef, needleRef]);

  const resetSpin = useCallback(() => {
    setSpinState('idle');
    setActivePrize(null);
    setNeedleDeflection(0);
    if (needleRef?.current) {
      needleRef.current.style.transform = 'rotate(0deg)';
    }
  }, [needleRef]);

  return {
    spinState,
    currentRotation,
    needleDeflection,
    activePrize,
    spin,
    resetSpin,
  };
}
