'use client';

import React from 'react';
import { BgmStyle } from '@/utils/bgm';
import { Music, Volume2, Coffee, Disc3, Check, Play, Pause, Waves, Gamepad2, Palmtree } from 'lucide-react';

interface AudioSettingsTabProps {
  bgmEnabled: boolean;
  bgmStyle: BgmStyle;
  bgmVolume: number;
  autoDuck: boolean;
  isPlaying: boolean;
  onToggleBgm: () => void;
  onSelectStyle: (style: BgmStyle) => void;
  onChangeVolume: (vol: number) => void;
  onToggleAutoDuck: () => void;
}

const BGM_STYLES: {
  key: BgmStyle;
  name: string;
  desc: string;
  bpm: number;
  icon: typeof Coffee;
  color: string;
}[] = [
  {
    key: 'lofi',
    name: 'Lo-Fi Coffee Shop',
    desc: 'Piano Rhodes ấm, trống boom-bap, sub-bass & sáo jazz êm ru',
    bpm: 76,
    icon: Coffee,
    color: '#FF6B00',
  },
  {
    key: 'ambient',
    name: 'Retro 8-Bit Pixel Arcade',
    desc: 'Nhạc game Nintendo 8-bit rộn ràng, arpeggio lấp lánh & bass NES vui nhộn',
    bpm: 108,
    icon: Gamepad2,
    color: '#8B5CF6',
  },
  {
    key: 'lounge',
    name: 'Tropical Island Beach',
    desc: 'Mộc cầm Marimba rộn rã, trống bongo gõ nhịp & đàn ukulele đón nắng hè',
    bpm: 96,
    icon: Palmtree,
    color: '#0EA5E9',
  },
];

export function AudioSettingsTab({
  bgmEnabled,
  bgmStyle,
  bgmVolume,
  autoDuck,
  isPlaying,
  onToggleBgm,
  onSelectStyle,
  onChangeVolume,
  onToggleAutoDuck,
}: AudioSettingsTabProps) {
  const currentMood = BGM_STYLES.find((s) => s.key === bgmStyle) || BGM_STYLES[0];

  return (
    <div className="flex flex-col gap-4 text-stone-800 dark:text-stone-100">
      {/* 1. Master Chill Music Toggle */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 ${
              bgmEnabled
                ? 'bg-[#FF6B00] text-white shadow-sm shadow-orange-500/25'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
            }`}
          >
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
              Nhạc Nền Chill (Background Music)
            </h5>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {bgmEnabled ? 'Nhạc nền đang hoạt động thư thái' : 'Đã tắt nhạc nền thư giãn'}
            </p>
          </div>
        </div>

        {/* iOS Switch - GPU accelerated */}
        <button
          type="button"
          role="switch"
          aria-checked={bgmEnabled}
          onClick={onToggleBgm}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            bgmEnabled ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
              bgmEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {bgmEnabled && (
        <>
          {/* 2. Now Playing Live Visualizer Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-[#FF6B00]/25 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shadow-xs shrink-0">
                <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {currentMood.name}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#FF6B00]/15 text-[#FF6B00]">
                    {currentMood.bpm} BPM
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  {isPlaying ? 'Đang phát âm thanh thư giãn...' : 'Tạm dừng (Chạm màn hình để phát)'}
                </p>
              </div>
            </div>

            {/* Live Equalizer Waves */}
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              <div className="flex items-end gap-1 h-5 px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-lg">
                <span
                  className={`w-1 bg-[#FF6B00] rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
                  }`}
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className={`w-1 bg-[#FF6B00] rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-3 animate-pulse' : 'h-2 opacity-40'
                  }`}
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className={`w-1 bg-[#FF6B00] rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-5 animate-pulse' : 'h-1 opacity-40'
                  }`}
                  style={{ animationDelay: '300ms' }}
                />
                <span
                  className={`w-1 bg-[#FF6B00] rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-3.5 animate-pulse' : 'h-2 opacity-40'
                  }`}
                  style={{ animationDelay: '75ms' }}
                />
              </div>

              <button
                type="button"
                onClick={onToggleBgm}
                aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
                className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs hover:bg-[#FF7A1A] transition-colors duration-150 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
            </div>
          </div>

          {/* 3. Chill Mood Selector (Zero-Jitter fixed indicators) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-0.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              <Waves className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Giai Điệu & Phong Cách Chill</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {BGM_STYLES.map((style) => {
                const isSelected = bgmStyle === style.key;
                const IconComponent = style.icon;
                return (
                  <button
                    key={style.key}
                    type="button"
                    onClick={() => onSelectStyle(style.key)}
                    className={`flex flex-col text-left p-3 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/30 shadow-xs'
                        : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: style.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {style.name}
                        </span>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold">
                          ({style.bpm} BPM)
                        </span>
                      </div>

                      {/* Stable fixed-size check indicator - Zero Layout Shift */}
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed pl-9.5">
                      {style.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Volume Slider */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                Âm Lượng Nhạc Nền (BGM Volume)
              </span>
              <span className="font-bold text-[#FF6B00] tabular-nums">
                {Math.round(bgmVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={bgmVolume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="w-full accent-[#FF6B00] cursor-pointer h-1.5 rounded-full bg-stone-200 dark:bg-stone-700"
            />
          </div>

          {/* 5. Auto-Ducking Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 ${
                  autoDuck
                    ? 'bg-amber-500/15 text-amber-500 dark:bg-amber-500/20'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                }`}
              >
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                  Tự Động Giảm Nhạc Khi Quay (Auto-Ducking)
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Hạ âm lượng nhạc 65% khi vòng quay chuyển động để nghe rõ tiếng gõ kim
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={autoDuck}
              onClick={onToggleAutoDuck}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autoDuck ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                  autoDuck ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
