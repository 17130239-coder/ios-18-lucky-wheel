'use client';

import React, { useState } from 'react';
import { PrizeItem } from '@/types/wheel';
import { TECH_ICONS, ICON_METADATA } from '@/constants/techIcons';
import { IconPickerModal } from './IconPickerModal';
import { Sparkles } from 'lucide-react';

interface PrizeRowItemProps {
  item: PrizeItem;
  index: number;
  onChange: (index: number, updated: Partial<PrizeItem>) => void;
}

export function PrizeRowItem({ item, index, onChange }: PrizeRowItemProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const iconMeta = ICON_METADATA.find((m) => m.key === item.icon);
  const iconLabel = iconMeta?.label || item.icon;

  const iconColor =
    item.color.toLowerCase() === '#ffffff' ? '#1E293B' : '#FFFFFF';

  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 shadow-xs">
      {/* Top Row: Icon Badge, Name Inputs, Sector Background Color Picker */}
      <div className="flex items-center gap-2.5">
        {/* Visual Icon Badge (Click to open visual picker) */}
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="relative group shrink-0 w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: item.color, color: iconColor }}
          title="Bấm để xem và chọn icon trực quan"
        >
          {TECH_ICONS[item.icon] || TECH_ICONS.gift}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF6B00] text-white rounded-full flex items-center justify-center shadow-xs">
            <Sparkles className="w-2.5 h-2.5" />
          </span>
        </button>

        {/* Line 1 & Line 2 Inputs */}
        <div className="flex-1 flex gap-1.5 min-w-0">
          <input
            type="text"
            value={item.line1}
            placeholder="Dòng 1"
            onChange={(e) => {
              const line1 = e.target.value;
              onChange(index, {
                line1,
                name: `${line1} ${item.line2}`.trim(),
              });
            }}
            className="w-1/2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-2.5 py-1.5 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#FF6B00]"
          />
          <input
            type="text"
            value={item.line2}
            placeholder="Dòng 2"
            onChange={(e) => {
              const line2 = e.target.value;
              onChange(index, {
                line2,
                name: `${item.line1} ${line2}`.trim(),
              });
            }}
            className="w-1/2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-2.5 py-1.5 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-none focus:border-[#FF6B00]"
          />
        </div>

        {/* Sector Background Color picker input */}
        <label
          className="relative shrink-0 w-8 h-8 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-600 cursor-pointer shadow-xs"
          title="Chọn màu nền nan quạt"
        >
          <input
            type="color"
            value={item.color}
            onChange={(e) => onChange(index, { color: e.target.value })}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-full"
            style={{ backgroundColor: item.color }}
          />
        </label>
      </div>

      {/* Bottom Row: Visual Icon Selector Pill */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-[11px] font-semibold hover:border-[#FF6B00] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 text-[#FF6B00] flex items-center justify-center">
              {TECH_ICONS[item.icon] || TECH_ICONS.gift}
            </span>
            <span className="font-bold truncate">{iconLabel}</span>
          </div>
          <span className="text-[10px] text-[#FF6B00] font-bold underline">
            Đổi icon trực quan
          </span>
        </button>
      </div>

      {/* Visual Icon Picker Modal */}
      <IconPickerModal
        isOpen={isPickerOpen}
        currentIcon={item.icon}
        prizeName={item.name}
        onSelect={(icon) => onChange(index, { icon })}
        onClose={() => setIsPickerOpen(false)}
      />
    </div>
  );
}
