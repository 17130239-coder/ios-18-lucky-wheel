'use client';

import { useState, useCallback } from 'react';
import { soundManager } from '@/utils/audio';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tech_wheel_muted');
      if (saved !== null) {
        const muted = saved === 'true';
        soundManager.setMuted(muted);
        return muted;
      }
    }
    return false;
  });

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundManager.setMuted(next);
      try {
        localStorage.setItem('tech_wheel_muted', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const playTick = useCallback((velocityRatio: number = 0.5) => {
    soundManager.playTick(velocityRatio);
  }, []);

  const playWinFanfare = useCallback(() => {
    soundManager.playWinFanfare();
  }, []);

  const playClick = useCallback(() => {
    soundManager.playClick();
  }, []);

  return {
    isMuted,
    toggleMute,
    playTick,
    playWinFanfare,
    playClick,
  };
}
