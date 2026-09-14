'use client';

import React from 'react';
import {
  Laptop,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  History,
  Sun,
  Moon,
} from 'lucide-react';
import { ThemeMode } from '@/types/wheel';

interface HeaderProps {
  prizeCount: number;
  historyCount: number;
  isMuted: boolean;
  theme: ThemeMode;
  onToggleMute: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
}

export function Header({
  prizeCount,
  historyCount,
  isMuted,
  theme,
  onToggleMute,
  onToggleTheme,
  onOpenSettings,
  onOpenHistory,
}: HeaderProps) {
  return (
    <header className="fixed top-5 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 md:px-12 pointer-events-none">
      {/* Brand Pill */}
      <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full glass-card border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFA04D] flex items-center justify-center text-white shadow-md shadow-orange-500/25">
          <Laptop className="w-4 h-4" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-tight bg-gradient-to-r from-stone-900 via-orange-950 to-[#FF6B00] dark:from-white dark:via-orange-200 dark:to-[#FF6B00] bg-clip-text text-transparent">
          TechLuckyWheel
        </span>
      </div>

      {/* Header Action Controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* History Button */}
        <button
          type="button"
          onClick={onOpenHistory}
          aria-label="Xem lịch sử trúng quà"
          title="Lịch sử trúng quà"
          className="relative flex items-center justify-center w-9 h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <History className="w-4 h-4" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B00] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          className="flex items-center justify-center w-9 h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#FF6B00]" />
          )}
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Đổi giao diện Sáng / Tối"
          title="Đổi giao diện"
          className="flex items-center justify-center w-9 h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-violet-500" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Settings Pill Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#FF6B00] group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-xs font-bold hidden xs:inline">Tùy Chỉnh Quà</span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 text-[#FF6B00] border border-orange-200/70 dark:border-orange-800/60 text-[10px] font-extrabold">
            {prizeCount}
          </span>
        </button>
      </div>
    </header>
  );
}
