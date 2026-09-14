'use client';

import React from 'react';
import { SpinState } from '@/types/wheel';

interface StageSpotlightsProps {
  spinState: SpinState;
}

export function StageSpotlights({ spinState }: StageSpotlightsProps) {
  const isSpinning = spinState === 'spinning';
  const isWon = spinState === 'won';

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {/* ================= LEFT SPOTLIGHT ================= */}
      <div
        className={`absolute top-0 left-2 sm:left-8 md:left-16 lg:left-24 transition-all duration-700 ${
          isSpinning ? 'scale-105' : isWon ? 'scale-110' : 'scale-100'
        }`}
      >
        {/* Lamp Fixture Hardware */}
        <div className="relative flex flex-col items-center z-20">
          {/* Ceiling Mount / Rigging Bracket */}
          <div className="w-6 h-3 sm:w-8 sm:h-4 bg-gradient-to-b from-stone-400 to-stone-600 dark:from-stone-700 dark:to-stone-900 rounded-b shadow-md border-t border-white/40" />
          <div className="w-1.5 h-4 sm:w-2 sm:h-6 bg-stone-500 dark:bg-stone-700 shadow-inner" />

          {/* Swiveling Lamp Projector Housing */}
          <div
            className={`relative flex items-center justify-center transition-transform duration-700 origin-top ${
              isSpinning
                ? 'animate-[spotlight-swivel-left_2.5s_ease-in-out_infinite]'
                : isWon
                ? 'rotate-[32deg]'
                : 'rotate-[28deg]'
            }`}
          >
            {/* Lamp Cylinder Barrel */}
            <div className="relative w-12 h-16 sm:w-16 sm:h-22 rounded-b-2xl bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 dark:from-stone-900 dark:via-stone-800 dark:to-black shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-stone-600/50 p-1 flex flex-col items-center justify-end overflow-hidden">
              {/* Cooling ribs / heat sink ridges */}
              <div className="absolute top-2 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />
              <div className="absolute top-4 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />
              <div className="absolute top-6 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />

              {/* Lens rim */}
              <div className="w-full h-4 sm:h-5 rounded-full bg-gradient-to-r from-amber-200 via-white to-amber-300 dark:from-cyan-200 dark:via-white dark:to-violet-300 shadow-[0_0_20px_#FFA04D] flex items-center justify-center border border-white">
                {/* Intense Central Bulb Filament */}
                <div className="w-5 h-2 sm:w-7 sm:h-2.5 rounded-full bg-white shadow-[0_0_15px_#FFFFFF] animate-pulse" />
              </div>
            </div>

            {/* Glowing Lens Flare Halo */}
            <div className="absolute -bottom-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-amber-400/40 dark:bg-violet-400/40 blur-md pointer-events-none" />

            {/* Volumetric Light Beam Cone (Shooting diagonally toward center wheel) */}
            <div
              className={`absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[280px] sm:w-[460px] md:w-[620px] lg:w-[780px] h-[550px] sm:h-[750px] md:h-[950px] pointer-events-none origin-top transition-opacity duration-500 ${
                isSpinning
                  ? 'opacity-85 dark:opacity-75'
                  : isWon
                  ? 'opacity-95 dark:opacity-90'
                  : 'opacity-55 dark:opacity-45'
              }`}
              style={{
                clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 170, 60, 0.45) 15%, rgba(255, 130, 0, 0.22) 45%, rgba(255, 107, 0, 0.06) 80%, transparent 100%)',
              }}
            />
            {/* Dark Mode Overlay Beam (Electric Violet / Cryo Cyan tone) */}
            <div
              className={`dark:block hidden absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[280px] sm:w-[460px] md:w-[620px] lg:w-[780px] h-[550px] sm:h-[750px] md:h-[950px] pointer-events-none origin-top transition-opacity duration-500 ${
                isSpinning ? 'opacity-85' : isWon ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(112, 83, 255, 0.5) 18%, rgba(0, 242, 254, 0.25) 50%, rgba(112, 83, 255, 0.05) 85%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= RIGHT SPOTLIGHT ================= */}
      <div
        className={`absolute top-0 right-2 sm:right-8 md:right-16 lg:right-24 transition-all duration-700 ${
          isSpinning ? 'scale-105' : isWon ? 'scale-110' : 'scale-100'
        }`}
      >
        {/* Lamp Fixture Hardware */}
        <div className="relative flex flex-col items-center z-20">
          {/* Ceiling Mount / Rigging Bracket */}
          <div className="w-6 h-3 sm:w-8 sm:h-4 bg-gradient-to-b from-stone-400 to-stone-600 dark:from-stone-700 dark:to-stone-900 rounded-b shadow-md border-t border-white/40" />
          <div className="w-1.5 h-4 sm:w-2 sm:h-6 bg-stone-500 dark:bg-stone-700 shadow-inner" />

          {/* Swiveling Lamp Projector Housing */}
          <div
            className={`relative flex items-center justify-center transition-transform duration-700 origin-top ${
              isSpinning
                ? 'animate-[spotlight-swivel-right_2.5s_ease-in-out_infinite]'
                : isWon
                ? 'rotate-[-32deg]'
                : 'rotate-[-28deg]'
            }`}
          >
            {/* Lamp Cylinder Barrel */}
            <div className="relative w-12 h-16 sm:w-16 sm:h-22 rounded-b-2xl bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 dark:from-stone-900 dark:via-stone-800 dark:to-black shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-stone-600/50 p-1 flex flex-col items-center justify-end overflow-hidden">
              {/* Cooling ribs */}
              <div className="absolute top-2 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />
              <div className="absolute top-4 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />
              <div className="absolute top-6 inset-x-2 h-0.5 bg-stone-600/60 rounded-full" />

              {/* Lens rim */}
              <div className="w-full h-4 sm:h-5 rounded-full bg-gradient-to-r from-amber-300 via-white to-amber-200 dark:from-violet-300 dark:via-white dark:to-cyan-200 shadow-[0_0_20px_#FFA04D] flex items-center justify-center border border-white">
                {/* Intense Central Bulb Filament */}
                <div className="w-5 h-2 sm:w-7 sm:h-2.5 rounded-full bg-white shadow-[0_0_15px_#FFFFFF] animate-pulse" />
              </div>
            </div>

            {/* Glowing Lens Flare Halo */}
            <div className="absolute -bottom-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-amber-400/40 dark:bg-cyan-400/40 blur-md pointer-events-none" />

            {/* Volumetric Light Beam Cone (Shooting diagonally toward center wheel) */}
            <div
              className={`absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[280px] sm:w-[460px] md:w-[620px] lg:w-[780px] h-[550px] sm:h-[750px] md:h-[950px] pointer-events-none origin-top transition-opacity duration-500 ${
                isSpinning
                  ? 'opacity-85 dark:opacity-75'
                  : isWon
                  ? 'opacity-95 dark:opacity-90'
                  : 'opacity-55 dark:opacity-45'
              }`}
              style={{
                clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 170, 60, 0.45) 15%, rgba(255, 130, 0, 0.22) 45%, rgba(255, 107, 0, 0.06) 80%, transparent 100%)',
              }}
            />
            {/* Dark Mode Overlay Beam */}
            <div
              className={`dark:block hidden absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[280px] sm:w-[460px] md:w-[620px] lg:w-[780px] h-[550px] sm:h-[750px] md:h-[950px] pointer-events-none origin-top transition-opacity duration-500 ${
                isSpinning ? 'opacity-85' : isWon ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                clipPath: 'polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 242, 254, 0.5) 18%, rgba(112, 83, 255, 0.25) 50%, rgba(0, 242, 254, 0.05) 85%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= CENTER STAGE ILLUMINATION POOL ================= */}
      {/* Dynamic stage floor focal spot where both beams converge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        {/* Warm Stage Floor Pool */}
        <div
          className={`w-[450px] h-[450px] sm:w-[680px] sm:h-[680px] md:w-[760px] md:h-[760px] rounded-full transition-all duration-700 ${
            isSpinning
              ? 'scale-110 opacity-70 bg-radial from-amber-300/35 via-orange-300/20 to-transparent blur-3xl'
              : isWon
              ? 'scale-125 opacity-90 bg-radial from-amber-300/50 via-orange-400/30 to-transparent blur-2xl animate-pulse'
              : 'scale-100 opacity-45 bg-radial from-amber-200/25 via-orange-200/15 to-transparent blur-3xl'
          } dark:from-cyan-400/25 dark:via-purple-600/20 dark:to-transparent`}
        />
      </div>
    </div>
  );
}
