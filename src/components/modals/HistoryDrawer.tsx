'use client';

import React from 'react';
import { History, Trash2, X } from 'lucide-react';
import { SpinHistoryItem } from '@/types/wheel';
import { TECH_ICONS } from '@/constants/techIcons';
import { useLanguage } from '@/i18n/LanguageContext';

interface HistoryDrawerProps {
  isOpen: boolean;
  history: SpinHistoryItem[];
  onClose: () => void;
  onClearHistory: () => void;
}

export function HistoryDrawer({
  isOpen,
  history,
  onClose,
  onClearHistory,
}: HistoryDrawerProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-label="Lịch sử trúng thưởng"
        className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white/95 dark:bg-stone-900/95 backdrop-blur-3xl border-r border-white/90 dark:border-white/10 shadow-[25px_0_60px_rgba(255,107,0,0.12)] flex flex-col transition-transform duration-300 ease-out"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 bg-stone-50/90 dark:bg-stone-800/90 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-800 flex items-center justify-center text-[#FF6B00]">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base text-stone-900 dark:text-white font-bold">
                {t.history.title}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.history.subtitle.replace('{count}', String(history.length))}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2.5">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-stone-400 dark:text-stone-500">
              <History className="w-10 h-10 mb-2 stroke-[1.5] opacity-50" />
              <p className="text-sm font-medium">{t.history.emptyTitle}</p>
              <p className="text-xs">{t.history.emptyDesc}</p>
            </div>
          ) : (
            history.map((item) => {
              const dateStr = new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 shadow-xs"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 p-2 shadow-xs text-white"
                    style={{ backgroundColor: item.prizeColor }}
                  >
                    {TECH_ICONS[item.prizeIcon] || TECH_ICONS.gift}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {item.prizeName}
                    </p>
                    <p className="text-[11px] text-stone-400 dark:text-stone-400">
                      {dateStr}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {history.length > 0 && (
          <div className="p-4 bg-stone-50/90 dark:bg-stone-800/90 border-t border-stone-100 dark:border-stone-800 flex justify-end">
            <button
              type="button"
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.history.clear}</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
