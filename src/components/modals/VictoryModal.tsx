'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { PrizeItem } from '@/types/wheel';
import { TECH_ICONS } from '@/constants/techIcons';
import { useLanguage } from '@/i18n/LanguageContext';

interface VictoryModalProps {
  isOpen: boolean;
  prize: PrizeItem | null;
  eliminateWonPrizes?: boolean;
  remainingCount?: number;
  onClose: () => void;
  onSpinAgain: () => void;
}

export function VictoryModal({
  isOpen,
  prize,
  eliminateWonPrizes = false,
  remainingCount,
  onClose,
  onSpinAgain,
}: VictoryModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen && prize) {
      // Fire celebratory confetti cannon
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B00', '#FFA04D', '#38BDF8', '#10B981', '#F59E0B'],
        });
      } catch {
        // Ignore in environments without canvas
      }
    }
  }, [isOpen, prize]);

  if (!isOpen || !prize) return null;

  const iconColor =
    prize.color.toLowerCase() === '#ffffff' ? '#1E293B' : prize.color;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-modal-title"
      className="fixed inset-0 z-60 flex items-center justify-center px-4 bg-stone-900/40 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
    >
      <div className="relative w-full max-w-sm p-7 rounded-3xl glass-card border border-white/95 dark:border-white/20 shadow-[0_32px_80px_-15px_rgba(255,107,0,0.35)] flex flex-col items-center text-center transform scale-100 ring-1 ring-white/90 dark:ring-white/10 transition-transform duration-300">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-orange-400/25 blur-3xl pointer-events-none" />

        {/* Prize Icon Badge */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6B00] via-amber-300 to-yellow-200 p-1 shadow-[0_10px_25px_rgba(255,107,0,0.3)] mb-3.5 flex items-center justify-center ring-2 ring-white">
          <div
            className="w-full h-full rounded-full bg-white flex items-center justify-center p-3 shadow-inner [&>svg]:w-9 [&>svg]:h-9 [&>svg]:stroke-[2.5]"
            style={{ color: iconColor }}
          >
            {TECH_ICONS[prize.icon] || TECH_ICONS.gift}
          </div>
        </div>

        {/* Header Tag */}
        <span className="text-[11px] uppercase tracking-widest text-[#FF6B00] font-black mb-1">
          {t.victory.title}
        </span>

        {/* Prize Title */}
        <h3
          id="victory-modal-title"
          className="text-2xl text-stone-900 dark:text-white font-extrabold mb-1.5 tracking-tight"
        >
          {prize.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-300 mb-4 font-medium">
          {t.victory.desc}
        </p>

        {/* Elimination badge if active */}
        {eliminateWonPrizes && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 mb-5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[11px] text-[#FF6B00] font-semibold animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>
              {typeof remainingCount === 'number' && remainingCount > 1
                ? t.victory.eliminatedMultiple.replace('{count}', String(remainingCount - 1))
                : t.victory.eliminatedSingle}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2.5 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-sm font-bold hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer"
          >
            {t.victory.claim}
          </button>
          <button
            type="button"
            onClick={onSpinAgain}
            className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#E65100] text-white text-sm font-bold shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all ring-1 ring-white/50 cursor-pointer"
          >
            {t.victory.spinAgain}
          </button>
        </div>
      </div>
    </div>
  );
}
