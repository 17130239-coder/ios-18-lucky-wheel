'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check, Lightbulb, Sparkles } from 'lucide-react';
import { PrizeItem, SpotlightConfig } from '@/types/wheel';
import { PrizeRowItem } from './PrizeRowItem';
import { SpotlightSettingsTab } from './SpotlightSettingsTab';

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
}

type SettingsTab = 'prizes' | 'spotlight';

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
  curtainEnabled,
  onToggleCurtain,
  onReplayCurtain,
}: Omit<SettingsDrawerProps, 'isOpen'>) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('spotlight');
  const [draftPrizes, setDraftPrizes] = useState<PrizeItem[]>(() =>
    JSON.parse(JSON.stringify(prizes))
  );

  const handleRowChange = (index: number, updated: Partial<PrizeItem>) => {
    setDraftPrizes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
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
        aria-label="Cài đặt hệ thống vòng quay"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/90 dark:bg-stone-900/90 backdrop-blur-2xl border-l border-stone-200/50 dark:border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 pb-3 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md border-b border-stone-200/40 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {activeTab === 'prizes' ? 'Tùy Chỉnh Phần Quà' : 'Cài Đặt Đèn Sân Khấu'}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {activeTab === 'prizes'
                  ? 'Chỉnh sửa tên danh mục, icon & màu sắc'
                  : 'Bật/tắt, góc chiếu viền bánh xe & màu RGB'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng cài đặt"
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-400 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* iOS Segmented Navigation Bar */}
        <div className="px-4 sm:px-5 pt-3 pb-2.5 bg-white/50 dark:bg-stone-900/50 border-b border-stone-200/40 dark:border-white/5 shrink-0">
          <div className="flex p-1 bg-stone-100 dark:bg-stone-800/80 rounded-2xl border border-stone-200/50 dark:border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('spotlight')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'spotlight'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Đèn Sân Khấu</span>
              {spotlightConfig.enabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prizes')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'prizes'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span>🎁 Phần Quà ({draftPrizes.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content with stable scrollbar gutter */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 [scrollbar-gutter:stable]">
          {activeTab === 'spotlight' ? (
            <SpotlightSettingsTab
              config={spotlightConfig}
              onChange={onUpdateSpotlightConfig}
              onReset={onResetSpotlightConfig}
              curtainEnabled={curtainEnabled}
              onToggleCurtain={onToggleCurtain}
              onReplayCurtain={onReplayCurtain}
            />
          ) : (
            <div className="flex flex-col gap-3">
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
                      Bỏ quà sau khi trúng
                    </h5>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Tự động gỡ sản phẩm vừa trúng khỏi các lượt quay sau
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
                  Danh sách quà ({draftPrizes.length})
                </span>
                {draftPrizes.length < 10 && (
                  <button
                    type="button"
                    onClick={handleResetPrizes}
                    className="text-xs font-semibold text-[#FF6B00] hover:underline cursor-pointer flex items-center gap-1 transition-colors duration-150"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Khôi phục đủ 10 quà</span>
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
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border-t border-stone-200/40 dark:border-white/5 flex items-center gap-2.5 shrink-0">
          {activeTab === 'prizes' ? (
            <>
              <button
                type="button"
                onClick={handleResetPrizes}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/80 dark:hover:bg-stone-700/80 active:opacity-85 transition-colors duration-150 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mặc Định</span>
              </button>
              <button
                type="button"
                onClick={handleSavePrizes}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-bold shadow-sm shadow-orange-500/25 active:opacity-85 transition-colors duration-150 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu & Áp Dụng</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onResetSpotlightConfig}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/60 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200/80 dark:hover:bg-stone-700/80 active:opacity-85 transition-colors duration-150 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt Lại Đèn</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF7A1A] text-white text-xs font-bold shadow-sm shadow-orange-500/25 active:opacity-85 transition-colors duration-150 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Hoàn Tất</span>
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
