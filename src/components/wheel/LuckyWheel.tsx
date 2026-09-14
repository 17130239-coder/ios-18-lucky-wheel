'use client';

import React from 'react';
import { PrizeItem, SpinState } from '@/types/wheel';
import { WheelSvg } from './WheelSvg';
import { PointerNeedle } from './PointerNeedle';
import { CenterHub } from './CenterHub';
import { AmbientGlow } from './AmbientGlow';
import { StatusPill } from './StatusPill';
import { ConfettiCanvas } from '../canvas/ConfettiCanvas';

interface LuckyWheelProps {
  prizes: PrizeItem[];
  rotation: number;
  spinState: SpinState;
  needleDeflection: number;
  activePrize: PrizeItem | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onSpin: () => void;
}

export function LuckyWheel({
  prizes,
  rotation,
  spinState,
  needleDeflection,
  activePrize,
  canvasRef,
  onSpin,
}: LuckyWheelProps) {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
      <div className="relative flex flex-col items-center justify-center">
        {/* Warm Ambient Glow Backlight */}
        <AmbientGlow spinState={spinState} />

        {/* Outer Chassis Frame */}
        <div className="relative w-[340px] h-[340px] xs:w-[400px] xs:h-[400px] sm:w-[540px] sm:h-[540px] md:w-[600px] md:h-[600px] p-2.5 sm:p-3 rounded-full glass-card border-2 border-white/95 dark:border-white/20 wheel-shadow ring-1 ring-white/90 dark:ring-white/10 flex items-center justify-center">
          {/* Needle Pointer at 12 O'Clock with dynamic deflection */}
          <PointerNeedle deflectionAngle={needleDeflection} />

          {/* Rotating Turntable SVG Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-stone-900 shadow-[inset_0_0_35px_rgba(0,0,0,0.06)]">
            <WheelSvg prizes={prizes} rotation={rotation} />
            <ConfettiCanvas canvasRef={canvasRef} />
          </div>

          {/* Center Hub Spin Button */}
          <CenterHub spinState={spinState} onSpin={onSpin} />
        </div>

        {/* Dynamic Status Indicator */}
        <StatusPill spinState={spinState} activePrize={activePrize} />
      </div>
    </main>
  );
}
