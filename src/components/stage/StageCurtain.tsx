'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Laptop, FastForward } from 'lucide-react';

interface StageCurtainProps {
  enabled?: boolean;
  onOpenComplete?: () => void;
  playCurtainSound?: () => void;
}

export const StageCurtain = React.memo(function StageCurtain({
  enabled = true,
  playCurtainSound,
  onOpenComplete,
}: StageCurtainProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'open' | 'gone'>('idle');

  const triggerOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('opening');
    playCurtainSound?.();

    const t1 = setTimeout(() => {
      setPhase('open');
      onOpenComplete?.();
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase('gone');
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, playCurtainSound, onOpenComplete]);

  // Initial grand reveal animation on page load
  useEffect(() => {
    if (!enabled) return;

    // After 800ms teaser stillness, begin grand parting
    const timer1 = setTimeout(() => {
      setPhase('opening');
      playCurtainSound?.();
    }, 800);

    // Transition completes at 2600ms (800ms delay + 1800ms transition)
    const timer2 = setTimeout(() => {
      setPhase('open');
      onOpenComplete?.();
    }, 2600);

    // Unmount from DOM completely after fade out
    const timer3 = setTimeout(() => {
      setPhase('gone');
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [enabled, playCurtainSound, onOpenComplete]);

  if (phase === 'gone' || !enabled) return null;

  const isOpeningOrOpen = phase === 'opening' || phase === 'open';

  // Renders vertical velvet pleat folds for high-end 3D fabric look
  const renderPleats = (count: number = 8) => {
    return Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex-1 h-full relative overflow-hidden"
        style={{
          background:
            i % 2 === 0
              ? 'linear-gradient(90deg, rgba(74,0,15,0.9) 0%, rgba(139,0,0,0.95) 45%, rgba(180,20,30,1) 50%, rgba(100,0,15,0.95) 85%, rgba(50,0,10,0.9) 100%)'
              : 'linear-gradient(90deg, rgba(50,0,10,0.95) 0%, rgba(120,0,20,1) 50%, rgba(70,0,15,0.95) 100%)',
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
        }}
      >
        {/* Velvety surface sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
        {/* Orange fringe trim at hem */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-orange-600 via-orange-400 to-amber-500 shadow-md border-t border-orange-300/80" />
      </div>
    ));
  };

  return (
    <div
      onClick={triggerOpen}
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-500 will-change-transform ${
        phase === 'open' ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'
      }`}
      title="Chạm vào bất kỳ đâu để mở rèm ngay lập tức"
    >
      {/* 1. Left Velvet Curtain Panel - Hardware Accelerated */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 flex transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
        style={{
          transformOrigin: 'left center',
          transform: isOpeningOrOpen ? 'translate3d(-100%, 0, 0) scaleX(0.2)' : 'translate3d(0%, 0, 0) scaleX(1)',
          boxShadow: '15px 0 35px rgba(0,0,0,0.7)',
        }}
      >
        {renderPleats(8)}
        {/* Leading edge orange braided cord */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] border-l border-orange-200/70" />
      </div>

      {/* 2. Right Velvet Curtain Panel - Hardware Accelerated */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 flex transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
        style={{
          transformOrigin: 'right center',
          transform: isOpeningOrOpen ? 'translate3d(100%, 0, 0) scaleX(0.2)' : 'translate3d(0%, 0, 0) scaleX(1)',
          boxShadow: '-15px 0 35px rgba(0,0,0,0.7)',
        }}
      >
        {renderPleats(8)}
        {/* Leading edge orange braided cord */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] border-r border-orange-200/70" />
      </div>

      {/* 3. Scalloped Theater Valance Pelmet (Rèm yếm viền cam trên) - Hardware Accelerated */}
      <div
        className="absolute top-0 inset-x-0 h-16 sm:h-28 z-20 flex justify-around overflow-hidden transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none will-change-transform"
        style={{
          transform: isOpeningOrOpen ? 'translate3d(0, -65%, 0)' : 'translate3d(0, 0%, 0)',
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 -mx-2 h-full rounded-b-[45%] bg-gradient-to-b from-[#38000A] via-[#8B0000] to-[#580010] border-b-4 border-orange-500 shadow-[0_12px_25px_rgba(0,0,0,0.7)] relative"
          >
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 rounded-b-[45%]" />
            {/* Hanging orange tassel at scallop notch */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-5 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-[0_2px_8px_rgba(249,115,22,0.6)]" />
          </div>
        ))}
      </div>

      {/* 4. Center Spin Button Emblem & Fusion Animation */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          triggerOpen();
        }}
      >
        {/* Shockwave Radial Energy Rings upon Opening */}
        <div
          className={`absolute -inset-6 rounded-full border-2 border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.8)] pointer-events-none transition-all duration-1000 ease-out ${
            isOpeningOrOpen ? 'scale-[2.4] opacity-0' : 'scale-90 opacity-0'
          }`}
        />
        <div
          className={`absolute -inset-12 rounded-full border border-amber-300/80 shadow-[0_0_35px_rgba(255,170,85,0.6)] pointer-events-none transition-all duration-1200 delay-100 ease-out ${
            isOpeningOrOpen ? 'scale-[3.2] opacity-0' : 'scale-75 opacity-0'
          }`}
        />

        {/* Converging Light Streaks ("Hiệu ứng ánh sáng nhập lại vào tâm") */}
        <div
          className={`absolute right-full top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-transparent via-orange-400 to-white shadow-[0_0_15px_#FF6B00] pointer-events-none transition-all duration-1000 ease-out ${
            isOpeningOrOpen ? 'w-0 opacity-0' : 'w-20 sm:w-40 opacity-90'
          }`}
        />
        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-l from-transparent via-orange-400 to-white shadow-[0_0_15px_#FF6B00] pointer-events-none transition-all duration-1000 ease-out ${
            isOpeningOrOpen ? 'w-0 opacity-0' : 'w-20 sm:w-40 opacity-90'
          }`}
        />

        {/* Master Spin Button (Exact 1:1 match with CenterHub) */}
        <div
          className={`group relative w-full h-full rounded-full p-2 glass-card shadow-[0_15px_35px_rgba(255,107,0,0.6),inset_0_2px_6px_rgba(255,255,255,0.9)] ring-4 ring-white cursor-pointer select-none transition-all duration-500 hover:scale-105 active:scale-95 ${
            isOpeningOrOpen ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          style={{
            transitionProperty: 'opacity, transform, filter',
            transitionDuration: isOpeningOrOpen ? '600ms, 800ms, 800ms' : '300ms',
            transitionDelay: isOpeningOrOpen ? '1000ms, 0ms, 0ms' : '0ms',
          }}
          title="Bấm để mở màn sân khấu & quay thưởng"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] via-[#FF8826] to-[#FFAA55] opacity-95 group-hover:opacity-100 animate-pulse" />

          {/* Inner 3D Glass Layer */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#FF8C33] via-[#FF6B00] to-[#E65100] flex flex-col items-center justify-center shadow-[inset_0_3px_5px_rgba(255,255,255,0.7),inset_0_-3px_8px_rgba(180,50,0,0.4)] text-white overflow-hidden">
            {/* Top Specular Reflection Arc */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />

            {/* Laptop Brand Logo Icon */}
            <Laptop className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow mb-0.5 group-hover:rotate-12 transition-transform duration-500" />

            {/* Typography */}
            <span className="text-base sm:text-lg font-black tracking-wider uppercase drop-shadow leading-none">
              QUAY
            </span>
            <span className="text-[10px] sm:text-[11px] text-orange-100 font-bold tracking-widest uppercase mt-0.5 opacity-95">
              CÔNG NGHỆ
            </span>
          </div>
        </div>

        {/* Pulsing Hint Badge positioned absolutely below button */}
        <div
          className={`absolute top-[calc(100%+14px)] sm:top-[calc(100%+20px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#FF6B00]/60 text-orange-300 text-[11px] sm:text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-xl transition-all duration-500 pointer-events-none ${
            isOpeningOrOpen ? 'opacity-0 scale-75 -translate-y-2' : 'opacity-100 scale-100 translate-y-0 animate-bounce'
          }`}
        >
          <span>✨ Bấm để mở màn & quay</span>
        </div>
      </div>

      {/* 5. Top-Right Skip Button */}
      <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPhase('open');
            setTimeout(() => setPhase('gone'), 250);
            onOpenComplete?.();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <FastForward className="w-3.5 h-3.5 text-orange-400" />
          <span>Bỏ qua</span>
        </button>
      </div>
    </div>
  );
});
