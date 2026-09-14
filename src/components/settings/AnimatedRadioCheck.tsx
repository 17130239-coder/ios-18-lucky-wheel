'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface AnimatedRadioCheckProps {
  isSelected: boolean;
  className?: string;
}

export function AnimatedRadioCheck({
  isSelected,
  className = '',
}: AnimatedRadioCheckProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ease-out transform-gpu pointer-events-none ${
        isSelected
          ? 'bg-[#FF6B00] border-transparent shadow-xs shadow-orange-500/30 scale-100'
          : 'border-2 border-stone-300 dark:border-stone-600 bg-transparent scale-95'
      } ${className}`}
    >
      <Check
        className={`w-3 h-3 stroke-[3] text-white transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform-gpu ${
          isSelected
            ? 'scale-100 opacity-100 rotate-0'
            : 'scale-0 opacity-0 -rotate-45'
        }`}
      />
    </div>
  );
}
