'use client';

import React from 'react';
import { PrizeItem, PrizeIconKey } from '@/types/wheel';
import { TECH_ICONS, AVAILABLE_ICONS } from '@/constants/techIcons';

interface PrizeRowItemProps {
  item: PrizeItem;
  index: number;
  onChange: (index: number, updated: Partial<PrizeItem>) => void;
}

export function PrizeRowItem({ item, index, onChange }: PrizeRowItemProps) {
  const iconColor =
    item.color.toLowerCase() === '#ffffff' ? '#1E293B' : '#FFFFFF';

  return (
    <div className="flex flex-col gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 shadow-xs">
      <div className="flex items-center gap-2.5">
        {/* Color / Icon Badge (Click to cycle icon or choose color) */}
        <div className="relative group shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center p-1.5 shadow-xs cursor-pointer transition-transform group-hover:scale-105"
            style={{ backgroundColor: item.color, color: iconColor }}
            title="Nhấp để đổi biểu tượng"
            onClick={() => {
              const currentIdx = AVAILABLE_ICONS.indexOf(item.icon);
              const nextIcon =
                AVAILABLE_ICONS[(currentIdx + 1) % AVAILABLE_ICONS.length];
              onChange(index, { icon: nextIcon });
            }}
          >
            {TECH_ICONS[item.icon] || TECH_ICONS.gift}
          </div>
        </div>

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

        {/* Color picker input */}
        <label className="relative shrink-0 w-7 h-7 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-600 cursor-pointer shadow-xs">
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

      {/* Select Icon Dropdown */}
      <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
        <span>Ô #{index + 1}: {item.name}</span>
        <select
          value={item.icon}
          onChange={(e) =>
            onChange(index, { icon: e.target.value as PrizeIconKey })
          }
          className="bg-transparent text-stone-600 dark:text-stone-300 text-[11px] font-medium border-0 focus:ring-0 cursor-pointer"
        >
          {AVAILABLE_ICONS.map((iconKey) => (
            <option key={iconKey} value={iconKey} className="dark:bg-stone-800">
              Icon: {iconKey}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
