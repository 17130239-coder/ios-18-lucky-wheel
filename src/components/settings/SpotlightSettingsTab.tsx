'use client';

import React from 'react';
import { SpotlightConfig, SpotlightColorMode, SpotlightStyle } from '@/types/wheel';
import { Sparkles, SunMedium, Lightbulb, Palette, Compass, Film, Play, Check } from 'lucide-react';

interface SpotlightSettingsTabProps {
  config: SpotlightConfig;
  onChange: (updated: Partial<SpotlightConfig>) => void;
  onReset: () => void;
  curtainEnabled?: boolean;
  onToggleCurtain?: () => void;
  onReplayCurtain?: () => void;
}

const COLOR_PRESETS: { key: SpotlightColorMode; label: string; color: string; desc: string }[] = [
  { key: 'amber', label: 'Vàng Hổ Phách', color: '#FFA04D', desc: 'Apple Warm Amber' },
  { key: 'violet', label: 'Tím Neon', color: '#8B5CF6', desc: 'Electric Violet' },
  { key: 'cyan', label: 'Xanh Băng', color: '#00F2FE', desc: 'Cryo Cyan' },
  { key: 'rose', label: 'Hồng Neon', color: '#F43F5E', desc: 'Cyber Rose' },
];

export function SpotlightSettingsTab({
  config,
  onChange,
  curtainEnabled = true,
  onToggleCurtain,
  onReplayCurtain,
}: SpotlightSettingsTabProps) {
  return (
    <div className="flex flex-col gap-4 text-stone-800 dark:text-stone-100">
      {/* 1. Master On/Off Toggle */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 ${
              config.enabled
                ? 'bg-[#FF6B00] text-white shadow-sm shadow-orange-500/25'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
              Bật 2 Đèn Sân Khấu
            </h5>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {config.enabled ? 'Đèn đang hoạt động rọi bánh xe' : 'Đã tắt hoàn toàn ánh sáng đèn'}
            </p>
          </div>
        </div>

        {/* iOS Style Toggle Switch - GPU accelerated */}
        <button
          type="button"
          role="switch"
          aria-checked={config.enabled}
          onClick={() => onChange({ enabled: !config.enabled })}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            config.enabled ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
              config.enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {config.enabled && (
        <>
          {/* 2. Style Selector: Rim Grazing vs Stage Sweep vs Center */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-0.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              <Compass className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Vùng & Kiểu Chiếu Sáng</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Option: Rim Grazing */}
              <button
                type="button"
                onClick={() => onChange({ style: 'rim' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                  config.style === 'rim'
                    ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/30 shadow-xs'
                    : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0" />
                    Chạm Nhẹ Viền Ngoài (Khuyên dùng)
                  </span>
                  {/* Stable fixed-size check indicator - NEVER causes height shifts */}
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {config.style === 'rim' ? (
                      <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn chỉ lướt quanh viền ngoài, chạm nhẹ làm bừng sáng khung bánh xe và giữ các ô quà bên trong sáng rõ.
                </p>
              </button>

              {/* Option: Full Stage Sweep */}
              <button
                type="button"
                onClick={() => onChange({ style: 'sweep' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                  config.style === 'sweep'
                    ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/30 shadow-xs'
                    : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    Quét Toàn Sân Khấu (Stage Sweep)
                  </span>
                  {/* Stable fixed-size check indicator */}
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {config.style === 'sweep' ? (
                      <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn quét qua lại góc rộng đan chéo toàn bộ sân khấu và mặt đĩa.
                </p>
              </button>

              {/* Option: Center Focus */}
              <button
                type="button"
                onClick={() => onChange({ style: 'center' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                  config.style === 'center'
                    ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/30 shadow-xs'
                    : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    Tập Trung Trung Tâm (Center Focus)
                  </span>
                  {/* Stable fixed-size check indicator */}
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {config.style === 'center' ? (
                      <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn cố định hướng vào nút QUAY ở tâm bánh xe.
                </p>
              </button>
            </div>
          </div>

          {/* 3. Color Mode & RGB Mode */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-0.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              <Palette className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Chế Độ Màu Ánh Sáng</span>
            </div>

            {/* RGB Rainbow Mode Feature Card */}
            <button
              type="button"
              onClick={() => onChange({ colorMode: 'rgb' as SpotlightColorMode })}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-colors duration-150 cursor-pointer relative overflow-hidden ${
                config.colorMode === 'rgb'
                  ? 'bg-violet-500/10 dark:bg-violet-500/15 border-violet-500/40 ring-1 ring-violet-500/30 shadow-xs'
                  : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    Chế độ Cầu Vồng RGB (Spectrum)
                  </span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    Ánh đèn chuyển dải màu quang phổ tuần hoàn êm dịu
                  </p>
                </div>
              </div>

              {/* Stable fixed-size check indicator */}
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative z-10 ml-2">
                {config.colorMode === 'rgb' ? (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-600" />
                )}
              </div>
            </button>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2 mt-0.5">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => onChange({ colorMode: preset.key })}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border transition-colors duration-150 cursor-pointer text-left ${
                    config.colorMode === preset.key
                      ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/50 ring-1 ring-[#FF6B00]/30 shadow-xs'
                      : 'bg-stone-100/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-white/5 hover:bg-stone-100/90 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-2xs border border-white/40 flex items-center justify-center text-white"
                      style={{ backgroundColor: preset.color }}
                    >
                      {config.colorMode === preset.key && (
                        <Check className="w-3 h-3 stroke-[3]" />
                      )}
                    </span>
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {preset.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Color Picker Row */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-100/60 dark:bg-stone-800/30 border border-stone-200/60 dark:border-white/5 mt-0.5">
              <div className="flex items-center gap-2.5">
                <label className="relative w-6 h-6 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-600 cursor-pointer shadow-2xs shrink-0">
                  <input
                    type="color"
                    value={config.customColor || '#FFA04D'}
                    onChange={(e) =>
                      onChange({
                        colorMode: 'custom',
                        customColor: e.target.value,
                      })
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span
                    className="block w-full h-full"
                    style={{ backgroundColor: config.customColor || '#FFA04D' }}
                  />
                </label>
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  Mã màu tùy ý (Custom Hex)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ colorMode: 'custom' })}
                className={`text-xs font-bold px-2.5 py-1 rounded-xl border transition-colors duration-150 cursor-pointer ${
                  config.colorMode === 'custom'
                    ? 'bg-[#FF6B00] text-white border-transparent shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                {config.customColor.toUpperCase()}
              </button>
            </div>
          </div>

          {/* 4. Brightness Slider */}
          <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5 text-[#FF6B00]" />
                Độ Sáng / Cường Độ Đèn
              </span>
              <span className="font-bold text-[#FF6B00] tabular-nums">
                {Math.round(config.brightness * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={config.brightness}
              onChange={(e) =>
                onChange({ brightness: parseFloat(e.target.value) })
              }
              className="w-full accent-[#FF6B00] cursor-pointer h-1.5 rounded-full bg-stone-200 dark:bg-stone-700"
            />
          </div>

          {/* 5. Natural Atmospheric Effects (Hạt bụi 3D) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 ${
                  config.showDust ?? true
                    ? 'bg-amber-500/15 text-amber-500 dark:bg-amber-500/20'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                  Hạt Bụi Thể Tích (Light Dust)
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Hạt bụi lơ lửng phản xạ ánh sáng tạo chiều sâu 3D chân thực
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={config.showDust ?? true}
              onClick={() => onChange({ showDust: !(config.showDust ?? true) })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                (config.showDust ?? true) ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                  (config.showDust ?? true) ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </>
      )}

      {/* 6. Grand Theater Curtain Setting Card (Dedicated section - Stable positioning) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 px-0.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
          <Film className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>Mở Rèm Sân Khấu Hoàng Gia</span>
        </div>

        <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 text-[#FF6B00] flex items-center justify-center shadow-xs shrink-0">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                  Hiệu Ứng Mở Rèm Khi Vào Trang
                </h5>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Mở màn rạp hát hoàng gia khi bắt đầu truy cập
                </p>
              </div>
            </div>

            {onToggleCurtain && (
              <button
                type="button"
                role="switch"
                aria-checked={curtainEnabled}
                onClick={onToggleCurtain}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  curtainEnabled ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                    curtainEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            )}
          </div>

          {/* Replay Button (Soothing Frosted Orange Glass) */}
          {onReplayCurtain && (
            <button
              type="button"
              onClick={onReplayCurtain}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/15 text-[#FF6B00] border border-orange-500/20 text-xs font-bold transition-colors duration-150 cursor-pointer active:opacity-85"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Xem Lại Hiệu Ứng Mở Rèm Sân Khấu 🎭</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

