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
  wheelGroupRef?: React.RefObject<SVGGElement | null>;
  needleRef?: React.RefObject<HTMLDivElement | null>;
  spotlightConfig: SpotlightConfig;
  onSpin: () => void;
  onResetPrizes?: () => void;
}

export const LuckyWheel = React.memo(function LuckyWheel({
  prizes,
  rotation,
  spinState,
  needleDeflection,
  activePrize,
  canvasRef,
  wheelGroupRef,
  needleRef,
  spotlightConfig,
  onSpin,
  onResetPrizes,
}: LuckyWheelProps) {
  return (
    <main className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative flex items-center justify-center pointer-events-auto">
        {/* Dual Stage Spotlights precisely aligned and focused on the Wheel */}
        <StageSpotlights spinState={spinState} config={spotlightConfig} />

        {/* Warm Ambient Glow Backlight */}
        <AmbientGlow spinState={spinState} />

        {/* Outer Chassis Frame */}
        <div className="relative w-[320px] h-[320px] xs:w-[370px] xs:h-[370px] sm:w-[520px] sm:h-[520px] md:w-[580px] md:h-[580px] max-w-[88vw] max-h-[88vw] p-2 sm:p-3 rounded-full glass-card border-2 border-white/95 dark:border-white/20 wheel-shadow ring-1 ring-white/90 dark:ring-white/10 flex items-center justify-center">
          {/* Needle Pointer at 12 O'Clock with dynamic deflection */}
          <PointerNeedle deflectionAngle={needleDeflection} needleRef={needleRef} />

          {/* Rotating Turntable SVG Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-stone-900 shadow-[inset_0_0_35px_rgba(0,0,0,0.06)]">
            <WheelSvg prizes={prizes} rotation={rotation} wheelGroupRef={wheelGroupRef} />
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
        <div className="absolute top-[calc(100%+8px)] sm:top-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <StatusPill
            spinState={spinState}
            activePrize={activePrize}
            prizeCount={prizes.length}
          />
        </div>
      </div>
    </main>
  );
});
