'use client';

import React from 'react';
import { SpinState } from '@/types/wheel';

interface AmbientGlowProps {
  spinState: SpinState;
}

export function AmbientGlow({ spinState }: AmbientGlowProps) {
  const isSpinning = spinState === 'spinning';

  return (
    <>
      {/* Background ambient lighting spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-orange-200/35 via-amber-100/30 to-sky-100/25 dark:from-purple-950/40 dark:via-indigo-900/30 dark:to-cyan-950/25 rounded-full blur-[140px]" />
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-gradient-to-br from-orange-300/30 to-rose-200/20 dark:from-violet-900/30 dark:to-fuchsia-900/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[480px] h-[480px] bg-gradient-to-tl from-amber-200/35 to-orange-100/30 dark:from-cyan-900/30 dark:to-blue-900/20 rounded-full blur-[130px]" />
      </div>

      {/* Radial Backlight behind wheel */}
      <div
        className={`absolute w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] rounded-full bg-gradient-to-tr from-orange-400/25 via-amber-200/25 to-sky-200/20 dark:from-violet-600/20 dark:via-purple-500/20 dark:to-cyan-400/15 blur-[120px] pointer-events-none -z-10 transition-transform duration-700 ${
          isSpinning ? 'scale-125' : 'scale-100'
        }`}
      />
    </>
  );
}
