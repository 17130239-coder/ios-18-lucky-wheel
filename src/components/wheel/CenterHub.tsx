'use client';

import React from 'react';
import { Zap, RotateCcw } from 'lucide-react';
import { SpinState } from '@/types/wheel';

interface CenterHubProps {
  spinState: SpinState;
  prizeCount?: number;
  onSpin: () => void;
  onResetPrizes?: () => void;
}

export function CenterHub({ spinState, prizeCount = 10, onSpin, onResetPrizes }: CenterHubProps) {
  const isSpinning = spinState === 'spinning';
  const isEmpty = prizeCount === 0;

  const handleClick = () => {
    if (isSpinning) return;
    if (isEmpty) {
      onResetPrizes?.();
    } else {
      onSpin();
    }
  };

  return (
    <div className="absolute z-30 flex items-center justify-center pointer-events-auto">
      <button
        type="button"
        onClick={handleClick}
        aria-label={isEmpty ? 'Khôi phục danh sách quà' : 'Quay vòng quay may mắn'}
        className={`group relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-2 glass-card shadow-[0_15px_35px_rgba(255,107,0,0.4),inset_0_2px_6px_rgba(255,255,255,0.9)] transition-all duration-200 focus:outline-none ring-4 ring-white cursor-pointer ${
          isSpinning
            ? 'scale-95'
            : 'hover:scale-105 active:scale-95'
        }`}
      >
        {/* Pulsing Aura */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] via-[#FF8826] to-[#FFAA55] transition-opacity ${
            isSpinning ? 'opacity-100 animate-spin duration-1000' : 'opacity-90 group-hover:opacity-100 animate-pulse'
          }`}
        />

        {/* Inner 3D Glass Layer */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#FF8C33] via-[#FF6B00] to-[#E65100] flex flex-col items-center justify-center shadow-[inset_0_3px_5px_rgba(255,255,255,0.7),inset_0_-3px_8px_rgba(180,50,0,0.4)] text-white overflow-hidden">
          {/* Top Specular Reflection Arc */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />

          {/* Icon */}
          {isEmpty ? (
            <RotateCcw
              className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow mb-0.5 group-hover:rotate-180 transition-transform duration-500"
            />
          ) : (
            <Zap
              className={`w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow mb-0.5 transition-transform duration-500 ${
                isSpinning ? 'animate-bounce' : 'group-hover:rotate-12'
              }`}
              fill="currentColor"
            />
          )}

          {/* Typography */}
          <span className="text-base sm:text-lg font-black tracking-wider uppercase drop-shadow leading-none">
            {isSpinning ? 'ĐANG QUAY' : isEmpty ? 'ĐẶT LẠI' : 'QUAY'}
          </span>
          <span className="text-[10px] sm:text-[11px] text-orange-100 font-bold tracking-widest uppercase mt-0.5 opacity-95">
            {isEmpty ? '10 PHẦN QUÀ' : 'CÔNG NGHỆ'}
          </span>
        </div>
      </button>
    </div>
  );
}
