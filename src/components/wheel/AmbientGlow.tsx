'use client';

import React from 'react';
import { SpinState } from '@/types/wheel';

interface AmbientGlowProps {
  spinState: SpinState;
}

export const AmbientGlow = React.memo(function AmbientGlow({ spinState }: AmbientGlowProps) {
  const isSpinning = spinState === 'spinning';

  return (
    <>
      {/* Background ambient lighting spheres - 100% GPU Procedural Radial Gradients (0ms blur cost) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Center ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none opacity-80 dark:opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(255,160,77,0.18) 0%, rgba(254,215,170,0.08) 45%, transparent 70%)',
          }}
        />
        <div
          className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none opacity-85"
          style={{
            background:
              'radial-gradient(circle, rgba(147,51,234,0.18) 0%, rgba(79,70,229,0.08) 45%, transparent 70%)',
          }}
        />

        {/* Top-left subtle warm glow */}
        <div
          className="absolute -top-16 -left-16 w-[380px] h-[380px] rounded-full pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 70%)',
          }}
        />

        {/* Bottom-right subtle accent glow */}
        <div
          className="absolute -bottom-16 -right-16 w-[420px] h-[420px] rounded-full pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Radial Backlight directly behind wheel frame with smooth CSS scale transition */}
      <div
        className={`absolute w-[520px] h-[520px] sm:w-[640px] sm:h-[640px] rounded-full pointer-events-none -z-10 transition-transform duration-700 will-change-transform ${
          isSpinning ? 'scale-120' : 'scale-100'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,107,0,0.22) 0%, rgba(255,160,77,0.10) 40%, transparent 70%)',
        }}
      />
    </>
  );
});
