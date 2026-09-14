'use client';

import React from 'react';
import { SpotlightConfig, SpotlightColorMode, SpotlightStyle } from '@/types/wheel';
import { Sparkles, SunMedium, Lightbulb, Palette, Compass } from 'lucide-react';

interface SpotlightSettingsTabProps {
  config: SpotlightConfig;
  onChange: (updated: Partial<SpotlightConfig>) => void;
  onReset: () => void;
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
}: SpotlightSettingsTabProps) {
  return (
    <div className="flex flex-col gap-5 text-stone-800 dark:text-stone-100">
      {/* 1. Master On/Off Toggle */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              config.enabled
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs sm:text-sm font-bold">Bật 2 Đèn Sân Khấu</h5>
            <p className="text-[11px] text-stone-400">
              {config.enabled ? 'Đèn đang hoạt động rọi bánh xe' : 'Đã tắt hoàn toàn ánh sáng đèn'}
            </p>
          </div>
        </div>

        {/* iOS Style Toggle Switch */}
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
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              config.enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {config.enabled && (
        <>
          {/* 2. Style Selector: Rim Grazing vs Stage Sweep vs Center */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
              <Compass className="w-4 h-4 text-[#FF6B00]" />
              <span>Vùng & Kiểu Chiếu Sáng</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Option: Rim Grazing */}
              <button
                type="button"
                onClick={() => onChange({ style: 'rim' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  config.style === 'rim'
                    ? 'bg-orange-50/70 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700 ring-1 ring-orange-400/40'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                    Chạm Nhẹ Viền Ngoài (Khuyên dùng)
                  </span>
                  {config.style === 'rim' && (
                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full bg-[#FF6B00] text-white">
                      Đang chọn
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn chỉ lướt quanh viền ngoài, chạm nhẹ làm bừng sáng khung bánh xe và giữ các ô quà bên trong sáng trong, sắc nét.
                </p>
              </button>

              {/* Option: Full Stage Sweep */}
              <button
                type="button"
                onClick={() => onChange({ style: 'sweep' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  config.style === 'sweep'
                    ? 'bg-orange-50/70 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700 ring-1 ring-orange-400/40'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Quét Toàn Sân Khấu (Stage Sweep)
                  </span>
                  {config.style === 'sweep' && (
                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full bg-[#FF6B00] text-white">
                      Đang chọn
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn quét qua lại góc rộng đan chéo toàn bộ sân khấu và mặt đĩa.
                </p>
              </button>

              {/* Option: Center Focus */}
              <button
                type="button"
                onClick={() => onChange({ style: 'center' as SpotlightStyle })}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  config.style === 'center'
                    ? 'bg-orange-50/70 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700 ring-1 ring-orange-400/40'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Tập Trung Trung Tâm (Center Focus)
                  </span>
                  {config.style === 'center' && (
                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded-full bg-[#FF6B00] text-white">
                      Đang chọn
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  Đèn cố định hướng vào nút QUAY ở tâm bánh xe.
                </p>
              </button>
            </div>
          </div>

          {/* 3. Color Mode & RGB Mode */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
              <Palette className="w-4 h-4 text-[#FF6B00]" />
              <span>Chế Độ Màu Ánh Sáng</span>
            </div>

            {/* RGB Rainbow Mode Feature Card */}
            <button
              type="button"
              onClick={() => onChange({ colorMode: 'rgb' as SpotlightColorMode })}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer relative overflow-hidden ${
                config.colorMode === 'rgb'
                  ? 'border-violet-400 dark:border-violet-600 ring-2 ring-violet-500/40 shadow-sm'
                  : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-green-500/10 via-blue-500/10 to-pink-500/10 pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 flex items-center justify-center text-white shadow-xs animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    🌈 Chế độ Cầu Vồng RGB (RGB Spectrum)
                  </span>
                  <p className="text-[10px] text-stone-400">
                    Ánh đèn liên tục chuyển đổi dải màu quang phổ tuần hoàn
                  </p>
                </div>
              </div>
              {config.colorMode === 'rgb' && (
                <span className="relative z-10 text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-xs">
                  Kích hoạt
                </span>
              )}
            </button>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => onChange({ colorMode: preset.key })}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    config.colorMode === preset.key
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-400 dark:border-orange-600 ring-1 ring-orange-400/50'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-white/40"
                    style={{ backgroundColor: preset.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {preset.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Color Picker Row */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 mt-1">
              <div className="flex items-center gap-2">
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
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Mã màu tùy ý (Custom Hex)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ colorMode: 'custom' })}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  config.colorMode === 'custom'
                    ? 'bg-[#FF6B00] text-white border-transparent'
                    : 'bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600'
                }`}
              >
                {config.customColor.toUpperCase()}
              </button>
            </div>
          </div>

          {/* 4. Brightness Slider */}
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <SunMedium className="w-4 h-4 text-[#FF6B00]" />
                Độ Sáng / Cường Độ Đèn
              </span>
              <span className="font-extrabold text-[#FF6B00]">
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
              className="w-full accent-[#FF6B00] cursor-pointer"
            />
          </div>

          {/* 5. Natural Atmospheric Effects (Hiệu ứng tự nhiên & Hạt bụi 3D) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  config.showDust ?? true
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold">Hạt Bụi Thể Tích (Light Dust)</h5>
                <p className="text-[11px] text-stone-400">
                  Hạt bụi li ti lơ lửng phản xạ ánh sáng tạo chiều sâu 3D chân thực
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
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  (config.showDust ?? true) ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
