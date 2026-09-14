'use client';

import React from 'react';
import { PrizeItem, SpinState, SpotlightConfig } from '@/types/wheel';
import { WheelSvg } from './WheelSvg';
import { PointerNeedle } from './PointerNeedle';
import { CenterHub } from './CenterHub';
import { AmbientGlow } from './AmbientGlow';
import { StageSpotlights } from './StageSpotlights';
import { StatusPill } from './StatusPill';
import { ConfettiCanvas } from '../canvas/ConfettiCanvas';

interface LuckyWheelProps {
  prizes: PrizeItem[];
  rotation: number;
  spinState: SpinState;
  needleDeflection: number;
  activePrize: PrizeItem | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  spotlightConfig: SpotlightConfig;
  onSpin: () => void;
  onResetPrizes?: () => void;
}

export function LuckyWheel({
  prizes,
  rotation,
  spinState,
  needleDeflection,
  activePrize,
  canvasRef,
  spotlightConfig,
  onSpin,
  onResetPrizes,
}: LuckyWheelProps) {
  return (
    <main className="relative z-10 flex items-center justify-center w-full h-full">
      <div className="relative flex items-center justify-center">
        {/* Dual Stage Spotlights precisely aligned and focused on the Wheel */}
        <StageSpotlights spinState={spinState} config={spotlightConfig} />

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
          <CenterHub
            spinState={spinState}
            prizeCount={prizes.length}
            onSpin={onSpin}
            onResetPrizes={onResetPrizes}
          />
        </div>

        {/* Dynamic Status Indicator anchored below the wheel without altering its center point */}
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 pointer-events-auto whitespace-nowrap">
          <StatusPill
            spinState={spinState}
            activePrize={activePrize}
            prizeCount={prizes.length}
          />
        </div>
      </div>
    </main>
  );
}
