'use client';

import { useState, useEffect, useCallback } from 'react';
import { chillBgm, BgmStyle } from '@/utils/bgm';

const STORAGE_BGM_ENABLED = 'tech_wheel_bgm_enabled_v2';
const STORAGE_BGM_STYLE = 'tech_wheel_bgm_style_v2';
const STORAGE_BGM_VOL = 'tech_wheel_bgm_vol_v2';

export function useBgm(isMasterMuted: boolean = false, isSpinning: boolean = false) {
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_BGM_ENABLED);
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return false;
  });

  const [bgmStyle, setBgmStyleState] = useState<BgmStyle>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_BGM_STYLE) as BgmStyle;
      if (saved === 'lofi' || saved === 'ambient' || saved === 'lounge') {
        return saved;
      }
    }
    return 'lofi';
  });

  const [bgmVolume, setBgmVolumeState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_BGM_VOL);
      if (saved !== null) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 0.05 && val <= 1.0) {
          return val;
        }
      }
    }
    return 0.35;
  });

  const [autoDuck, setAutoDuckState] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Sync mute with master mute
  useEffect(() => {
    chillBgm.setMuted(isMasterMuted);
  }, [isMasterMuted]);

  // Sync auto-ducking during wheel spin
  useEffect(() => {
    if (autoDuck) {
      chillBgm.duck(isSpinning);
    }
  }, [isSpinning, autoDuck]);

  // Initial config sync
  useEffect(() => {
    chillBgm.setStyle(bgmStyle);
    chillBgm.setVolume(bgmVolume);
  }, [bgmStyle, bgmVolume]);

  // Start or stop BGM based on bgmEnabled and isMasterMuted
  const startMusic = useCallback(() => {
    chillBgm.start(bgmStyle);
    setIsPlaying(true);
  }, [bgmStyle]);

  const stopMusic = useCallback(() => {
    chillBgm.stop();
    setIsPlaying(false);
  }, []);

  const toggleBgm = useCallback(() => {
    setBgmEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_BGM_ENABLED, String(next));
      } catch {
        // Ignore
      }
      if (next) {
        startMusic();
      } else {
        stopMusic();
      }
      return next;
    });
  }, [startMusic, stopMusic]);

  const setBgmStyle = useCallback((style: BgmStyle) => {
    setBgmStyleState(style);
    chillBgm.setStyle(style);
    try {
      localStorage.setItem(STORAGE_BGM_STYLE, style);
    } catch {
      // Ignore
    }
  }, []);

  const setBgmVolume = useCallback((vol: number) => {
    setBgmVolumeState(vol);
    chillBgm.setVolume(vol);
    try {
      localStorage.setItem(STORAGE_BGM_VOL, String(vol));
    } catch {
      // Ignore
    }
  }, []);

  const setAutoDuck = useCallback((enabled: boolean) => {
    setAutoDuckState(enabled);
  }, []);

  // Handle first user gesture to unlock audio if enabled
  useEffect(() => {
    if (!bgmEnabled) return;

    const handleFirstGesture = () => {
      if (bgmEnabled && !isPlaying) {
        startMusic();
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [bgmEnabled, isPlaying, startMusic]);

  return {
    bgmEnabled,
    bgmStyle,
    bgmVolume,
    autoDuck,
    isPlaying,
    toggleBgm,
    setBgmStyle,
    setBgmVolume,
    setAutoDuck,
    startMusic,
    stopMusic,
  };
}
