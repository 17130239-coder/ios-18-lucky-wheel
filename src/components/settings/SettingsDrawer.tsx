'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Check } from 'lucide-react';
import { PrizeItem } from '@/types/wheel';
import { PrizeRowItem } from './PrizeRowItem';

interface SettingsDrawerProps {
  isOpen: boolean;
  prizes: PrizeItem[];
  onClose: () => void;
  onSave: (updatedPrizes: PrizeItem[]) => void;
  onReset: () => void;
}

function SettingsDrawerContent({
  prizes,
  onClose,
  onSave,
  onReset,
}: Omit<SettingsDrawerProps, 'isOpen'>) {
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

  const handleSave = () => {
    onSave(draftPrizes);
    onClose();
  };

  const handleReset = () => {
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
        aria-label="Tùy chỉnh phần quà"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 dark:bg-stone-900/95 backdrop-blur-3xl border-l border-white/90 dark:border-white/10 shadow-[-25px_0_60px_rgba(255,107,0,0.12)] flex flex-col transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-stone-50/90 dark:bg-stone-800/90 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-800 flex items-center justify-center text-[#FF6B00]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base text-stone-900 dark:text-white font-bold">
                Tùy Chỉnh 10 Phần Quà
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Chỉnh sửa tên danh mục, icon & màu sắc
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng tùy chỉnh"
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prize list items */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2.5">
          {draftPrizes.map((item, index) => (
            <PrizeRowItem
              key={item.id || index}
              item={item}
              index={index}
              onChange={handleRowChange}
            />
          ))}
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-stone-50/90 dark:bg-stone-800/90 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc Định</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#E65100] text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all ring-1 ring-white/50 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Lưu & Áp Dụng</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function SettingsDrawer(props: SettingsDrawerProps) {
  if (!props.isOpen) return null;
  return <SettingsDrawerContent {...props} />;
}
