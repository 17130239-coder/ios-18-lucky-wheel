'use client';

import { useState, useCallback } from 'react';
import { SpotlightConfig } from '@/types/wheel';

const STORAGE_KEY = 'tech_wheel_spotlight_cfg_v1';

export const DEFAULT_SPOTLIGHT_CONFIG: SpotlightConfig = {
  enabled: true,
  colorMode: 'amber',
  customColor: '#FFA04D',
  style: 'rim', // Default: Rim Grazing (chỉ chạm nhẹ viền ngoài xung quanh bánh xe)
  brightness: 0.70,
  showDust: true,
  beamReach: 'deep',
};

export function useSpotlightStore() {
  const [config, setConfig] = useState<SpotlightConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed.enabled === 'boolean') {
            return {
              ...DEFAULT_SPOTLIGHT_CONFIG,
              ...parsed,
              showDust: parsed.showDust ?? true,
              beamReach: parsed.beamReach ?? 'deep',
            };
          }
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_SPOTLIGHT_CONFIG;
  });

  const updateConfig = useCallback((newConfig: Partial<SpotlightConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_SPOTLIGHT_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SPOTLIGHT_CONFIG));
    } catch {
      // Ignore
    }
  }, []);

  return {
    spotlightConfig: config,
    updateSpotlightConfig: updateConfig,
    resetSpotlightConfig: resetConfig,
  };
}
