'use client';

import { useState, useCallback } from 'react';
import { PrizeItem, SpinHistoryItem } from '@/types/wheel';
import { DEFAULT_PRIZES } from '@/constants/defaultPrizes';

const STORAGE_KEY_PRIZES = 'tech_wheel_prizes_v4';
const STORAGE_KEY_HISTORY = 'tech_wheel_history_v1';

export function usePrizeStore() {
  const [prizes, setPrizes] = useState<PrizeItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedPrizes = localStorage.getItem(STORAGE_KEY_PRIZES);
        if (storedPrizes) {
          const parsed = JSON.parse(storedPrizes);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to defaults
      }
    }
    return DEFAULT_PRIZES;
  });

  const [history, setHistory] = useState<SpinHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (storedHistory) {
          const parsedHist = JSON.parse(storedHistory);
          if (Array.isArray(parsedHist)) {
            return parsedHist;
          }
        }
      } catch {
        // Fallback
      }
    }
    return [];
  });

  // Save updated prizes
  const updatePrizes = useCallback((newPrizes: PrizeItem[]) => {
    setPrizes(newPrizes);
    try {
      localStorage.setItem(STORAGE_KEY_PRIZES, JSON.stringify(newPrizes));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Reset to default 10 tech items
  const resetToDefaults = useCallback(() => {
    const clone = JSON.parse(JSON.stringify(DEFAULT_PRIZES));
    setPrizes(clone);
    try {
      localStorage.setItem(STORAGE_KEY_PRIZES, JSON.stringify(clone));
    } catch {
      // Ignore
    }
  }, []);

  // Add history item
  const addHistoryItem = useCallback((prize: PrizeItem) => {
    const newItem: SpinHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      prizeName: prize.name,
      prizeIcon: prize.icon,
      prizeColor: prize.color,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.slice(0, 49)];
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    prizes,
    history,
    updatePrizes,
    resetToDefaults,
    addHistoryItem,
    clearHistory,
  };
}
