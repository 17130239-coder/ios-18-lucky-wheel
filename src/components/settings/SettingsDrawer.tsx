'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check, Lightbulb } from 'lucide-react';
import { PrizeItem, SpotlightConfig } from '@/types/wheel';
import { PrizeRowItem } from './PrizeRowItem';
import { SpotlightSettingsTab } from './SpotlightSettingsTab';

interface SettingsDrawerProps {
  isOpen: boolean;
  prizes: PrizeItem[];
  spotlightConfig: SpotlightConfig;
  onClose: () => void;
  onSave: (updatedPrizes: PrizeItem[]) => void;
  onReset: () => void;
  onUpdateSpotlightConfig: (updated: Partial<SpotlightConfig>) => void;
  onResetSpotlightConfig: () => void;
}

type SettingsTab = 'prizes' | 'spotlight';

function SettingsDrawerContent({
  prizes,
  spotlightConfig,
  onClose,
  onSave,
  onReset,
  onUpdateSpotlightConfig,
  onResetSpotlightConfig,
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
        className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Cài đặt hệ thống vòng quay"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 dark:bg-stone-900/95 backdrop-blur-3xl border-l border-white/90 dark:border-white/10 shadow-[-25px_0_60px_rgba(255,107,0,0.12)] flex flex-col transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3 bg-stone-50/90 dark:bg-stone-800/90 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-800 flex items-center justify-center text-[#FF6B00]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base text-stone-900 dark:text-white font-bold">
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
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* iOS Segmented Navigation Bar */}
        <div className="px-5 pt-3 pb-2 bg-stone-50/90 dark:bg-stone-800/90 border-b border-stone-100 dark:border-stone-800">
          <div className="flex p-1 bg-stone-200/70 dark:bg-stone-900/60 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('spotlight')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'spotlight'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Đèn Sân Khấu</span>
              {spotlightConfig.enabled && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prizes')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'prizes'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span>🎁 Phần Quà ({draftPrizes.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'spotlight' ? (
            <SpotlightSettingsTab
              config={spotlightConfig}
              onChange={onUpdateSpotlightConfig}
              onReset={onResetSpotlightConfig}
            />
          ) : (
            <div className="flex flex-col gap-2.5">
              {draftPrizes.map((item, index) => (
                <PrizeRowItem
                  key={item.id || index}
                  item={item}
                  index={index}
                  onChange={handleRowChange}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-stone-50/90 dark:bg-stone-800/90 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2.5">
          {activeTab === 'prizes' ? (
            <>
              <button
                type="button"
                onClick={handleResetPrizes}
                className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mặc Định</span>
              </button>
              <button
                type="button"
                onClick={handleSavePrizes}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#E65100] text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all ring-1 ring-white/50 cursor-pointer"
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
                className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt Lại Đèn</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#E65100] text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all ring-1 ring-white/50 cursor-pointer"
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
