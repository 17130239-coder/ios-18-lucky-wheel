'use client';

import React, { useState } from 'react';
import { PrizeItem } from '@/types/wheel';
import { TECH_ICONS, ICON_METADATA } from '@/constants/techIcons';
import { IconPickerModal } from './IconPickerModal';
import { Sparkles, Trash2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface PrizeRowItemProps {
  item: PrizeItem;
  index: number;
  onChange: (index: number, updated: Partial<PrizeItem>) => void;
  onDelete?: (index: number) => void;
  canDelete?: boolean;
}

export function PrizeRowItem({ item, index, onChange, onDelete, canDelete }: PrizeRowItemProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { t } = useLanguage();

  const iconMeta = ICON_METADATA.find((m) => m.key === item.icon);
  const iconLabel = iconMeta?.label || item.icon;

  const iconColor =
    item.color.toLowerCase() === '#ffffff' ? '#1E293B' : '#FFFFFF';

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-white/5 shadow-xs transition-colors hover:bg-stone-100/90 dark:hover:bg-stone-800/60">
      {/* Visual Icon Button (Click to open visual picker) */}
      <button
        type="button"
        onClick={() => setIsPickerOpen(true)}
        className="relative group shrink-0 w-11 h-11 rounded-xl flex items-center justify-center p-2 shadow-xs cursor-pointer transition-[opacity,filter] duration-150 hover:brightness-105 active:opacity-85 border border-black/5 dark:border-white/10"
        style={{ backgroundColor: item.color, color: iconColor }}
        title={`${t.settings.prizes.changeIconTooltip} (${iconLabel})`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {TECH_ICONS[item.icon] || TECH_ICONS.gift}
        </div>
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF6B00] text-white rounded-full flex items-center justify-center shadow-xs opacity-90 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-2.5 h-2.5" />
        </span>
      </button>

      {/* Two-line text inputs */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={item.line1}
            placeholder={t.settings.prizes.line1Placeholder}
            onChange={(e) => {
              const line1 = e.target.value;
              onChange(index, {
                line1,
                name: `${line1} ${item.line2}`.trim(),
              });
            }}
            className="w-1/2 bg-white/90 dark:bg-stone-900/90 border border-stone-200/70 dark:border-stone-700/60 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1.5 focus:ring-[#FF6B00]/70 focus:border-[#FF6B00] transition-colors duration-150"
          />
          <input
            type="text"
            value={item.line2}
            placeholder={t.settings.prizes.line2Placeholder}
            onChange={(e) => {
              const line2 = e.target.value;
              onChange(index, {
                line2,
                name: `${item.line1} ${line2}`.trim(),
              });
            }}
            className="w-1/2 bg-white/90 dark:bg-stone-900/90 border border-stone-200/70 dark:border-stone-700/60 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1.5 focus:ring-[#FF6B00]/70 focus:border-[#FF6B00] transition-colors duration-150"
          />
        </div>
        <div className="flex items-center gap-1.5 px-0.5">
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="text-[10px] text-stone-500 dark:text-stone-400 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] transition-colors duration-150 truncate flex items-center gap-1 cursor-pointer"
          >
            <span>Icon:</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300 underline underline-offset-2">
              {iconLabel}
            </span>
          </button>
        </div>
      </div>

      {/* Right Column: Index Badge, Delete Action and Sector Color Picker */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500">
            #{index + 1}
          </span>
          {canDelete && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(index)}
              title={t.settings.prizes.deletePrizeTooltip}
              aria-label={t.settings.prizes.deletePrizeTooltip}
              className="w-4 h-4 rounded flex items-center justify-center text-stone-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:text-rose-400 dark:hover:bg-rose-500/15 transition-all duration-150 cursor-pointer active:scale-90"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
        <label
          className="relative w-7 h-7 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-600 shadow-2xs cursor-pointer transition-opacity duration-150 hover:opacity-90 active:opacity-80"
          title={t.settings.prizes.changeColorTooltip}
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
