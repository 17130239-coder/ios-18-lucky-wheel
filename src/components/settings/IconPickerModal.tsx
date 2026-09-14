'use client';

import React, { useState, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';
import { PrizeIconKey } from '@/types/wheel';
import { ICON_METADATA, TECH_ICONS, IconMeta } from '@/constants/techIcons';

interface IconPickerModalProps {
  isOpen: boolean;
  currentIcon: PrizeIconKey;
  prizeName?: string;
  onSelect: (icon: PrizeIconKey) => void;
  onClose: () => void;
}

type CategoryFilter = 'all' | 'tech' | 'reward' | 'lifestyle';

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'tech', label: '⚡ Công nghệ' },
  { key: 'reward', label: '🏆 Giải thưởng' },
  { key: 'lifestyle', label: '🚗 Đời sống' },
];

export function IconPickerModal({
  isOpen,
  currentIcon,
  prizeName,
  onSelect,
  onClose,
}: IconPickerModalProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const filteredIcons = useMemo(() => {
    return ICON_METADATA.filter((item: IconMeta) => {
      // Category check
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      // Search check
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesKey = item.key.toLowerCase().includes(query);
        const matchesLabel = item.label.toLowerCase().includes(query);
        return matchesKey || matchesLabel;
      }
      return true;
    });
  }, [search, category]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="icon-picker-title"
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white/95 dark:bg-stone-900/95 backdrop-blur-2xl border border-stone-200/60 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-5 border-b border-stone-200/40 dark:border-white/5 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md">
          <div>
            <h3
              id="icon-picker-title"
              className="text-base font-bold text-stone-900 dark:text-stone-100"
            >
              Chọn Biểu Tượng Trực Quan
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-xs sm:max-w-sm">
              {prizeName ? `Biểu tượng cho: ${prizeName}` : 'Chọn biểu tượng hiển thị trên nan quạt'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng chọn biểu tượng"
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-400 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 pb-3 flex flex-col gap-3 border-b border-stone-200/40 dark:border-white/5">
          {/* Search bar */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm icon (vd: laptop, cúp, xe, tiền, tai nghe...)"
              className="w-full bg-stone-100 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs pl-10 pr-9 py-2.5 rounded-xl border border-stone-200/50 dark:border-stone-700/50 focus:outline-none focus:ring-1.5 focus:ring-[#FF6B00]/70 focus:border-[#FF6B00] placeholder:text-stone-400 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                  category === cat.key
                    ? 'bg-[#FF6B00] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[250px]">
          {filteredIcons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-stone-400">
              <Search className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-xs font-semibold">Không tìm thấy biểu tượng phù hợp</p>
              <p className="text-xs mt-1 text-stone-400">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2.5">
              {filteredIcons.map((item) => {
                const isSelected = currentIcon === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      onSelect(item.key);
                      onClose();
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-orange-500/10 dark:bg-orange-500/15 border-[#FF6B00]/60 ring-1 ring-[#FF6B00]/40 shadow-xs'
                        : 'bg-stone-100/70 dark:bg-stone-800/40 border-stone-200/60 dark:border-white/5 hover:bg-white dark:hover:bg-stone-800 hover:border-[#FF6B00]/30'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'text-[#FF6B00] bg-white dark:bg-stone-900 shadow-xs'
                          : 'text-stone-700 dark:text-stone-200 bg-white/90 dark:bg-stone-900/80 shadow-2xs'
                      }`}
                    >
                      {TECH_ICONS[item.key] || TECH_ICONS.gift}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-2 text-center truncate max-w-full px-1 ${
                        isSelected
                          ? 'text-[#FF6B00] font-bold'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 px-5 border-t border-stone-200/40 dark:border-white/5 bg-white/50 dark:bg-stone-900/50 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Tổng cộng: {filteredIcons.length} biểu tượng
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
