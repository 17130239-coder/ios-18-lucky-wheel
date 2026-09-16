'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check, Lightbulb, Sparkles, Music, Plus, Minus, Layers } from 'lucide-react';
import { PrizeItem, SpotlightConfig, BackgroundTheme } from '@/types/wheel';
import { BgmStyle } from '@/utils/bgm';
import { createNewPrize } from '@/constants/defaultPrizes';
import { PrizeRowItem } from './PrizeRowItem';
import { SpotlightSettingsTab } from './SpotlightSettingsTab';
import { AudioSettingsTab } from './AudioSettingsTab';
import { useLanguage } from '@/i18n/LanguageContext';

interface SettingsDrawerProps {
  isOpen: boolean;
  prizes: PrizeItem[];
  spotlightConfig: SpotlightConfig;
  eliminateWonPrizes: boolean;
  onToggleEliminateWonPrizes: () => void;
  onClose: () => void;
  onSave: (updatedPrizes: PrizeItem[]) => void;
  onReset: () => void;
  onUpdateSpotlightConfig: (updated: Partial<SpotlightConfig>) => void;
  onResetSpotlightConfig: () => void;
  curtainEnabled?: boolean;
  onToggleCurtain?: () => void;
  onReplayCurtain?: () => void;
  bgTheme?: BackgroundTheme;
  onSelectBgTheme?: (theme: BackgroundTheme) => void;
  bgmEnabled?: boolean;
  bgmStyle?: BgmStyle;
  bgmVolume?: number;
  autoDuck?: boolean;
  isBgmPlaying?: boolean;
  onToggleBgm?: () => void;
  onSelectBgmStyle?: (style: BgmStyle) => void;
  onChangeBgmVolume?: (vol: number) => void;
  onToggleAutoDuck?: () => void;
}

type SettingsTab = 'spotlight' | 'audio' | 'prizes';

const MIN_PRIZES = 2;
const MAX_PRIZES = 16;
const PRESET_COUNTS = [4, 6, 8, 10, 12, 16];

function SettingsDrawerContent({
  prizes,
  spotlightConfig,
  eliminateWonPrizes,
  onToggleEliminateWonPrizes,
  onClose,
  onSave,
  onReset,
  onUpdateSpotlightConfig,
  onResetSpotlightConfig,
  curtainEnabled = true,
  onToggleCurtain,
  onReplayCurtain,
  bgTheme = 'default',
  onSelectBgTheme,
  bgmEnabled = false,
  bgmStyle = 'lofi',
  bgmVolume = 0.6,
  autoDuck = true,
  isBgmPlaying = false,
  onToggleBgm,
  onSelectBgmStyle,
  onChangeBgmVolume,
  onToggleAutoDuck,
}: Omit<SettingsDrawerProps, 'isOpen'>) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SettingsTab>('spotlight');
  const [draftPrizes, setDraftPrizes] = useState<PrizeItem[]>(() =>
    JSON.parse(JSON.stringify(prizes))
  );

  const activeTabIndex = activeTab === 'spotlight' ? 0 : activeTab === 'audio' ? 1 : 2;

  const handleRowChange = (index: number, updated: Partial<PrizeItem>) => {
    setDraftPrizes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
  };

  const handleSetPrizeCount = (targetCount: number) => {
    const clamped = Math.max(MIN_PRIZES, Math.min(MAX_PRIZES, targetCount));
    setDraftPrizes((prev) => {
      if (clamped === prev.length) return prev;
      if (clamped < prev.length) {
        return prev.slice(0, clamped);
      }
      const next = [...prev];
      for (let i = prev.length; i < clamped; i++) {
        next.push(createNewPrize(i));
      }
      return next;
    });
  };

  const handleAddPrize = () => {
    if (draftPrizes.length >= MAX_PRIZES) return;
    setDraftPrizes((prev) => [...prev, createNewPrize(prev.length)]);
  };

  const handleDeletePrize = (index: number) => {
    if (draftPrizes.length <= MIN_PRIZES) return;
    setDraftPrizes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRestoreDefaultDraft = () => {
    const cloned = [];
    for (let i = 0; i < 10; i++) {
      cloned.push(createNewPrize(i));
    }
    setDraftPrizes(cloned);
  };

  const handleSavePrizes = () => {
    onSave(draftPrizes);
    onClose();
  };

  const handleResetPrizes = () => {
    onReset();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={t.settings.drawerTitle}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/90 dark:bg-stone-900/90 backdrop-blur-2xl border-l border-stone-200/50 dark:border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 pb-3 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md border-b border-stone-200/40 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] transition-transform duration-200">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 transition-all duration-200">
                {activeTab === 'prizes'
                  ? t.settings.headerPrizesTitle
                  : activeTab === 'audio'
                  ? t.settings.headerAudioTitle
                  : t.settings.headerSpotlightTitle}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 transition-all duration-200">
                {activeTab === 'prizes'
                  ? t.settings.headerPrizesDesc
                  : activeTab === 'audio'
                  ? t.settings.headerAudioDesc
                  : t.settings.headerSpotlightDesc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-90 flex items-center justify-center text-stone-500 dark:text-stone-400 transition-all duration-150 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* iOS 3-Segment Navigation Bar with Fluid Sliding Pill Indicator */}
        <div className="px-4 sm:px-5 pt-3 pb-2.5 bg-white/50 dark:bg-stone-900/50 border-b border-stone-200/40 dark:border-white/5 shrink-0">
          <div className="relative flex p-1 bg-stone-100 dark:bg-stone-800/80 rounded-2xl border border-stone-200/50 dark:border-white/5 isolate">
            {/* Sliding Active Pill Indicator */}
            <div
              className="absolute top-1 bottom-1 left-1 rounded-xl bg-white dark:bg-stone-700 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none will-change-transform z-0"
              style={{
                width: 'calc((100% - 8px) / 3)',
                transform: `translate3d(${activeTabIndex * 100}%, 0, 0)`,
              }}
            />

            <button
              type="button"
              onClick={() => setActiveTab('spotlight')}
              className={`relative z-10 flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97] transform-gpu ${
                activeTab === 'spotlight'
                  ? 'text-stone-900 dark:text-white font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Lightbulb className={`w-3.5 h-3.5 text-[#FF6B00] transition-transform duration-200 ${activeTab === 'spotlight' ? 'scale-110' : 'scale-100'}`} />
              <span>{t.settings.tabSpotlight}</span>
              {spotlightConfig.enabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('audio')}
              className={`relative z-10 flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97] transform-gpu ${
                activeTab === 'audio'
                  ? 'text-stone-900 dark:text-white font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Music className={`w-3.5 h-3.5 text-[#FF6B00] transition-transform duration-200 ${activeTab === 'audio' ? 'scale-110' : 'scale-100'}`} />
              <span>{t.settings.tabAudio}</span>
              {bgmEnabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-xs shadow-orange-500/50" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prizes')}
              className={`relative z-10 flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97] transform-gpu ${
                activeTab === 'prizes'
                  ? 'text-stone-900 dark:text-white font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <span>{t.settings.tabPrizes} ({draftPrizes.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content with stable scrollbar gutter and silky entrance animation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 [scrollbar-gutter:stable]">
          <div key={activeTab} className="animate-tab-content-in will-change-transform">
            {activeTab === 'spotlight' ? (
              <SpotlightSettingsTab
                config={spotlightConfig}
                onChange={onUpdateSpotlightConfig}
                onReset={onResetSpotlightConfig}
                curtainEnabled={curtainEnabled}
                onToggleCurtain={onToggleCurtain}
                onReplayCurtain={onReplayCurtain}
                bgTheme={bgTheme}
                onSelectBgTheme={onSelectBgTheme}
              />
            ) : activeTab === 'audio' ? (
              <AudioSettingsTab
                bgmEnabled={bgmEnabled}
                bgmStyle={bgmStyle}
                bgmVolume={bgmVolume}
                autoDuck={autoDuck}
                isPlaying={isBgmPlaying}
                onToggleBgm={onToggleBgm ?? (() => {})}
                onSelectStyle={onSelectBgmStyle ?? (() => {})}
                onChangeVolume={onChangeBgmVolume ?? (() => {})}
                onToggleAutoDuck={onToggleAutoDuck ?? (() => {})}
              />
            ) : (
            <div className="flex flex-col gap-3">
              {/* Prize Quantity Setting Card */}
              <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                        {t.settings.prizes.quantityTitle}
                      </h5>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {t.settings.prizes.quantityDesc}
                      </p>
                    </div>
                  </div>

                  {/* Stepper: [-] [count] [+] */}
                  <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-stone-700/50 p-1 rounded-xl shrink-0">
                    <button
                      type="button"
                      disabled={draftPrizes.length <= MIN_PRIZES}
                      onClick={() => handleSetPrizeCount(draftPrizes.length - 1)}
                      title={t.settings.prizes.minPrizesReached}
                      aria-label={t.settings.prizes.minPrizesReached}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center text-xs font-extrabold text-[#FF6B00] tabular-nums">
                      {draftPrizes.length}
                    </span>

                    <button
                      type="button"
                      disabled={draftPrizes.length >= MAX_PRIZES}
                      onClick={() => handleSetPrizeCount(draftPrizes.length + 1)}
                      title={t.settings.prizes.maxPrizesReached}
                      aria-label={t.settings.prizes.maxPrizesReached}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Preset Chips: 4, 6, 8, 10, 12, 16 */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-stone-200/40 dark:border-white/5">
                  <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider shrink-0">
                    {t.settings.prizes.presetLabel}:
                  </span>
                  <div className="grid grid-cols-6 gap-1.5 flex-1">
                    {PRESET_COUNTS.map((num) => {
                      const isCurrent = draftPrizes.length === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleSetPrizeCount(num)}
                          className={`py-1 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer text-center ${
                            isCurrent
                              ? 'bg-[#FF6B00] text-white shadow-xs scale-[1.02]'
                              : 'bg-white/90 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-white/5 hover:bg-white dark:hover:bg-stone-700'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Auto-eliminate won prize toggle card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 ${
                      eliminateWonPrizes
                        ? 'bg-[#FF6B00] text-white shadow-sm shadow-orange-500/25'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                      {t.settings.prizes.eliminateTitle}
                    </h5>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {t.settings.prizes.eliminateDesc}
                    </p>
                  </div>
                </div>

                {/* iOS Switch - GPU accelerated */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={eliminateWonPrizes}
                  onClick={onToggleEliminateWonPrizes}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    eliminateWonPrizes ? 'bg-[#FF6B00]' : 'bg-stone-300 dark:bg-stone-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform-gpu will-change-transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out ${
                      eliminateWonPrizes ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Counter and quick reset row */}
              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
                  {t.settings.prizes.listHeading} ({draftPrizes.length})
                </span>
                {draftPrizes.length !== 10 && (
                  <button
                    type="button"
                    onClick={handleRestoreDefaultDraft}
                    className="text-xs font-semibold text-[#FF6B00] hover:underline cursor-pointer flex items-center gap-1 transition-colors duration-150"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.settings.prizes.restoreCount}</span>
                  </button>
                )}
              </div>

              {/* Prize list */}
              <div className="flex flex-col gap-2">
                {draftPrizes.map((item, index) => (
                  <PrizeRowItem
                    key={item.id || index}
                    item={item}
                    index={index}
                    onChange={handleRowChange}
                    canDelete={draftPrizes.length > MIN_PRIZES}
                    onDelete={handleDeletePrize}
                  />
                ))}
              </div>

              {/* Add Prize Button (if < MAX_PRIZES) */}
              {draftPrizes.length < MAX_PRIZES && (
                <button
                  type="button"
                  onClick={handleAddPrize}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-[#FF6B00]/40 hover:border-[#FF6B00] bg-orange-500/5 hover:bg-orange-500/10 text-[#FF6B00] text-xs font-bold transition-all duration-150 cursor-pointer active:scale-[0.99]"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.settings.prizes.addPrizeBtn}</span>
                </button>
              )}
            </div>
          )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border-t border-stone-200/40 dark:border-white/5 flex items-center gap-2.5 shrink-0">
          {activeTab === 'prizes' ? (
            <>
              <button
                type="button"
                onClick={handleResetPrizes}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/80 dark:hover:bg-stone-700/80 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.defaultBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleSavePrizes}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-bold shadow-sm shadow-orange-500/25 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.saveBtn}</span>
              </button>
            </>
          ) : activeTab === 'audio' ? (
            <>
              <button
                type="button"
                onClick={() => onChangeBgmVolume?.(0.35)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/80 dark:hover:bg-stone-700/80 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.defaultVolBtn}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-bold shadow-sm shadow-orange-500/25 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.doneBtn}</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onResetSpotlightConfig}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/80 dark:hover:bg-stone-700/80 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.resetLightsBtn}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-bold shadow-sm shadow-orange-500/25 active:scale-[0.98] transition-all duration-150 cursor-pointer transform-gpu"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.settings.prizes.doneBtn}</span>
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export function SettingsDrawer(props: SettingsDrawerProps) {
  if (!props.isOpen) return null;
  return <SettingsDrawerContent {...props} />;
}
