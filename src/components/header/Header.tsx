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
  Music,
  Languages,
} from 'lucide-react';
import { ThemeMode } from '@/types/wheel';
import { useLanguage } from '@/i18n/LanguageContext';

interface HeaderProps {
  prizeCount: number;
  historyCount: number;
  isMuted: boolean;
  theme: ThemeMode;
  onToggleMute: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  bgmEnabled?: boolean;
  isBgmPlaying?: boolean;
  onToggleBgm?: () => void;
}

export const Header = React.memo(function Header({
  prizeCount,
  historyCount,
  isMuted,
  theme,
  onToggleMute,
  onToggleTheme,
  onOpenSettings,
  onOpenHistory,
  bgmEnabled = false,
  isBgmPlaying = false,
  onToggleBgm,
}: HeaderProps) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="fixed top-2.5 sm:top-5 inset-x-0 z-40 flex items-center justify-between px-3 sm:px-8 md:px-12 pt-[env(safe-area-inset-top,0px)] pointer-events-none">
      {/* Brand Pill */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all shrink-0">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFA04D] flex items-center justify-center text-white shadow-md shadow-orange-500/25 shrink-0">
          <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-tight bg-gradient-to-r from-stone-900 via-orange-950 to-[#FF6B00] dark:from-white dark:via-orange-200 dark:to-[#FF6B00] bg-clip-text text-transparent hidden sm:inline">
          {t.common.brand}
        </span>
        <span className="font-bold text-xs tracking-tight bg-gradient-to-r from-stone-900 to-[#FF6B00] dark:from-white dark:to-[#FF6B00] bg-clip-text text-transparent inline sm:hidden">
          {t.common.brandShort}
        </span>
      </div>

      {/* Header Action Controls */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* History Button */}
        <button
          type="button"
          onClick={onOpenHistory}
          aria-label={t.header.historyTooltip}
          title={t.header.historyTooltip}
          className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FF6B00] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center shadow-xs">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Audio Mute/Unmute */}
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? t.header.unmute : t.header.mute}
          title={isMuted ? t.header.unmute : t.header.mute}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-colors duration-150 active:scale-95 cursor-pointer shrink-0"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00]" />
          )}
        </button>

        {/* Chill Background Music Quick Toggle */}
        {onToggleBgm && (
          <button
            type="button"
            onClick={onToggleBgm}
            aria-label={bgmEnabled ? t.header.bgmOn : t.header.bgmOff}
            title={bgmEnabled ? t.header.bgmOn : t.header.bgmOff}
            className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card border transition-colors duration-150 active:scale-95 cursor-pointer shrink-0 ${
              bgmEnabled
                ? 'text-[#FF6B00] border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/30 shadow-[0_8px_20px_rgba(255,107,0,0.12)] bg-orange-500/10'
                : 'hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border-white/90 dark:border-white/10 ring-1 ring-white/60 dark:ring-white/5'
            }`}
          >
            <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${bgmEnabled && isBgmPlaying ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }} />
            {bgmEnabled && isBgmPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#FF6B00]" />
              </span>
            )}
          </button>
        )}

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? t.header.themeDark : t.header.themeLight}
          title={theme === 'light' ? t.header.themeDark : t.header.themeLight}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          {theme === 'light' ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-500" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          )}
        </button>

        {/* Language Quick Switcher */}
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.header.langTooltip}
          title={t.header.langTooltip}
          className="flex items-center justify-center gap-1 h-8 sm:h-9 px-2 sm:px-2.5 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-white/90 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          <Languages className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-[#FF6B00]">
            {locale}
          </span>
        </button>

        {/* Settings Pill Trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label={t.header.settingsTooltip}
          title={t.header.settingsTooltip}
          className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card hover:bg-white dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border border-white/90 dark:border-white/10 shadow-[0_8px_30px_rgba(255,107,0,0.08)] ring-1 ring-white/60 dark:ring-white/5 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00] group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-xs font-bold hidden sm:inline">{t.header.settingsLabel}</span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 text-[#FF6B00] border border-orange-200/70 dark:border-orange-800/60 text-[9px] sm:text-[10px] font-extrabold">
            {prizeCount}
          </span>
        </button>
      </div>
    </header>
  );
});
