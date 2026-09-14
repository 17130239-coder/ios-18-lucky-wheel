'use client';

import React from 'react';
import { PrizeItem, SpinState } from '@/types/wheel';

interface StatusPillProps {
  spinState: SpinState;
  activePrize: PrizeItem | null;
}

export function StatusPill({ spinState, activePrize }: StatusPillProps) {
  let dotClass = 'w-2.5 h-2.5 rounded-full bg-[#FF6B00]';
  let message = 'Bấm "QUAY" ở tâm để săn 10 phần quà công nghệ khủng';

  if (spinState === 'spinning') {
    dotClass = 'w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping';
    message = 'Đang quay... Chúc bạn rinh siêu phẩm công nghệ!';
  } else if (spinState === 'won' && activePrize) {
    dotClass = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
    message = `Chúc mừng bạn đã trúng: ${activePrize.name}!`;
  }

  return (
    <div className="mt-5 flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all">
      <span className={dotClass} />
      <span className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200">
        {message}
      </span>
    </div>
  );
}
