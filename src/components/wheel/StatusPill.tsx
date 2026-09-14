'use client';

import React from 'react';
import { PrizeItem, SpinState } from '@/types/wheel';

interface StatusPillProps {
  spinState: SpinState;
  activePrize: PrizeItem | null;
  prizeCount?: number;
}

export const StatusPill = React.memo(function StatusPill({ spinState, activePrize, prizeCount = 10 }: StatusPillProps) {
  let dotClass = 'w-2.5 h-2.5 rounded-full bg-[#FF6B00]';
  let message = `Bấm "QUAY" ở tâm để săn ${prizeCount} phần quà công nghệ`;

  if (prizeCount === 0) {
    dotClass = 'w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse';
    message = 'Đã hết phần quà! Bấm "ĐẶT LẠI" ở tâm để khởi tạo lại';
  } else if (spinState === 'spinning') {
    dotClass = 'w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping';
    message = 'Đang quay... Chúc bạn rinh siêu phẩm công nghệ!';
  } else if (spinState === 'won' && activePrize) {
    dotClass = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
    message = `Chúc mừng bạn đã trúng: ${activePrize.name}!`;
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full glass-card border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all max-w-[90vw] whitespace-nowrap">
      <span className={`${dotClass} shrink-0`} />
      <span className="text-[11px] xs:text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 truncate">
        {message}
      </span>
    </div>
  );
});
