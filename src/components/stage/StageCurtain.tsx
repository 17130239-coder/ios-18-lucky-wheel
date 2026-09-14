'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Laptop, FastForward } from 'lucide-react';

interface StageCurtainProps {
  enabled?: boolean;
  onOpenComplete?: () => void;
  playCurtainSound?: () => void;
}

export function StageCurtain({
  enabled = true,
  onOpenComplete,
  playCurtainSound,
}: StageCurtainProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'gone'>('closed');

  const triggerOpen = useCallback(() => {
    if (phase === 'closed') {
      playCurtainSound?.();
      setPhase('opening');
    } else if (phase === 'opening') {
      // Fast forward immediately if user taps while opening
      setPhase('open');
      setTimeout(() => setPhase('gone'), 300);
      onOpenComplete?.();
    }
  }, [phase, playCurtainSound, onOpenComplete]);

  useEffect(() => {
    if (!enabled) return;

    // Auto-initiate the opening after an initial suspense beat
    const timer1 = setTimeout(() => {
      playCurtainSound?.();
      setPhase('opening');
    }, 400);

    // Natural sequence completion
    const timer2 = setTimeout(() => {
      setPhase('open');
      onOpenComplete?.();
    }, 2200);

    // Remove from DOM / completely transparent
    const timer3 = setTimeout(() => {
      setPhase('gone');
    }, 2600);

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
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
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
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-500 ${
        phase === 'open' ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'
      }`}
      title="Chạm vào bất kỳ đâu để mở rèm ngay lập tức"
    >
      {/* 1. Left Velvet Curtain Panel */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 flex transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transformOrigin: 'left center',
          transform: isOpeningOrOpen ? 'translateX(-100%) scaleX(0.2)' : 'translateX(0%) scaleX(1)',
          boxShadow: '15px 0 50px rgba(0,0,0,0.8)',
        }}
      >
        {renderPleats(8)}
        {/* Leading edge orange braided cord */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] border-l border-orange-200/70" />
      </div>

      {/* 2. Right Velvet Curtain Panel */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 flex transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transformOrigin: 'right center',
          transform: isOpeningOrOpen ? 'translateX(100%) scaleX(0.2)' : 'translateX(0%) scaleX(1)',
          boxShadow: '-15px 0 50px rgba(0,0,0,0.8)',
        }}
      >
        {renderPleats(8)}
        {/* Leading edge orange braided cord */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.6)] border-r border-orange-200/70" />
      </div>

      {/* 3. Scalloped Theater Valance Pelmet (Rèm yếm viền cam trên) */}
      <div
        className="absolute top-0 inset-x-0 h-20 sm:h-28 z-20 flex justify-around overflow-hidden transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none"
        style={{
          transform: isOpeningOrOpen ? 'translateY(-65%)' : 'translateY(0%)',
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

      {/* 4. Center Emblem with Website Logo (Orange Brand Theme) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 pointer-events-none ${
          isOpeningOrOpen ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Orange Medallion Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 bg-gradient-to-tr from-[#FF6B00] via-[#FFA04D] to-[#FF8533] shadow-[0_0_50px_rgba(255,107,0,0.7),0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center animate-pulse">
          {/* Inner velvet crest disc */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#580010] to-[#200006] border-2 border-[#FF6B00]/80 flex items-center justify-center shadow-inner relative overflow-hidden">
            {/* Ambient orange glow */}
            <div className="absolute inset-0 bg-radial from-[#FF6B00]/30 via-transparent to-transparent pointer-events-none" />
            {/* Website Logo: Laptop in TechLuckyWheel Orange Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFA04D] flex items-center justify-center text-white shadow-xl shadow-orange-600/40 ring-2 ring-white/80 transition-transform duration-300">
              <Laptop className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Pulsing Hint Badge */}
        <div className="mt-5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#FF6B00]/50 text-orange-300 text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-lg animate-bounce">
          <span>✨ Chạm để mở</span>
        </div>
      </div>

      {/* 5. Top-Right Skip Button */}
      <div className="absolute top-5 right-5 z-40">
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
}
