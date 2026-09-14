'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeMode, PrizeItem, BackgroundTheme } from '@/types/wheel';
import { usePrizeStore } from '@/hooks/usePrizeStore';
import { useSpotlightStore } from '@/hooks/useSpotlightStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useConfetti } from '@/hooks/useConfetti';
import { useLuckyWheel } from '@/hooks/useLuckyWheel';
import { useBgm } from '@/hooks/useBgm';
import { Header } from '@/components/header/Header';
import { LuckyWheel } from '@/components/wheel/LuckyWheel';
import { VictoryModal } from '@/components/modals/VictoryModal';
import { HistoryDrawer } from '@/components/modals/HistoryDrawer';
import { SettingsDrawer } from '@/components/settings/SettingsDrawer';
import { StageCurtain } from '@/components/stage/StageCurtain';
import { VectorBackground } from '@/components/background/VectorBackground';

export default function LuckyWheelPage() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('tech_wheel_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'light';
  });

  const [curtainEnabled, setCurtainEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tech_wheel_curtain_enabled');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return true;
  });

  const [curtainKey, setCurtainKey] = useState<number>(1);

  const [bgTheme, setBgTheme] = useState<BackgroundTheme>(() => {
    if (typeof window !== 'undefined') {
      const savedBg = localStorage.getItem('tech_wheel_bg_theme') as BackgroundTheme;
      if (['default', 'forest', 'ocean', 'underwater'].includes(savedBg)) {
        return savedBg;
      }
    }
    return 'default';
  });

  const handleSelectBgTheme = useCallback((selectedTheme: BackgroundTheme) => {
    setBgTheme(selectedTheme);
    try {
      localStorage.setItem('tech_wheel_bg_theme', selectedTheme);
    } catch {
      // Ignore
    }
  }, []);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  const toggleCurtain = useCallback(() => {
    setCurtainEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('tech_wheel_curtain_enabled', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const replayCurtain = useCallback(() => {
    setIsSettingsOpen(false);
    setCurtainKey((k) => k + 1);
  }, []);

  // Sync dark class on document when theme state changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('tech_wheel_theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  // Data Store & Audio
  const {
    prizes,
    history,
    eliminateWonPrizes,
    toggleEliminateWonPrizes,
    removePrizeById,
    updatePrizes,
    resetToDefaults,
    addHistoryItem,
    clearHistory,
  } = usePrizeStore();

  const {
    spotlightConfig,
    updateSpotlightConfig,
    resetSpotlightConfig,
  } = useSpotlightStore();

  const {
    isMuted,
    toggleMute,
    playTick,
    playSpinLaunch,
    playWinFanfare,
    playClick,
    playGlassPop,
    playCurtainOpening,
  } = useSoundEffects();

  const { canvasRef, spawnConfetti } = useConfetti();

  // Winning handler
  const handleWin = useCallback(
    (wonPrize: PrizeItem) => {
      addHistoryItem(wonPrize);
      playWinFanfare();
      // Ensure any drawer currently open is closed when winning victory modal appears
      setIsSettingsOpen(false);
      setIsHistoryOpen(false);
      setIsVictoryOpen(true);
    },
    [addHistoryItem, playWinFanfare]
  );

  const wheelGroupRef = useRef<SVGGElement | null>(null);
  const needleRef = useRef<HTMLDivElement | null>(null);

  // Master Wheel Animation Hook
  const {
    spinState,
    currentRotation,
    needleDeflection,
    activePrize,
    spin,
    resetSpin,
  } = useLuckyWheel({
    prizes,
    wheelGroupRef,
    needleRef,
    onSpinStart: playSpinLaunch,
    onTick: playTick,
    onWin: handleWin,
    onSpawnConfetti: spawnConfetti,
  });

  const isSpinning = spinState === 'spinning';

  // Procedural Chill Background Music Engine
  const {
    bgmEnabled,
    bgmStyle,
    bgmVolume,
    autoDuck,
    isPlaying: isBgmPlaying,
    toggleBgm,
    setBgmStyle,
    setBgmVolume,
    setAutoDuck,
  } = useBgm(isMuted, isSpinning);

  const handleSpin = useCallback(() => {
    setIsSettingsOpen(false);
    setIsHistoryOpen(false);
    setIsVictoryOpen(false);
    spin();
  }, [spin]);

  const handleOpenSettings = useCallback(() => {
    playGlassPop();
    setIsVictoryOpen(false);
    setIsHistoryOpen(false);
    setIsSettingsOpen(true);
  }, [playGlassPop]);

  const handleOpenHistory = useCallback(() => {
    playGlassPop();
    setIsVictoryOpen(false);
    setIsSettingsOpen(false);
    setIsHistoryOpen(true);
  }, [playGlassPop]);

  const handleResetPrizes = useCallback(() => {
    playClick();
    resetToDefaults();
  }, [playClick, resetToDefaults]);

  const handleCloseVictoryModal = useCallback(() => {
    playGlassPop();
    setIsVictoryOpen(false);
    if (eliminateWonPrizes && activePrize) {
      removePrizeById(activePrize.id);
    }
    resetSpin();
  }, [eliminateWonPrizes, activePrize, removePrizeById, resetSpin, playGlassPop]);

  const handleSpinAgain = useCallback(() => {
    setIsVictoryOpen(false);
    if (eliminateWonPrizes && activePrize) {
      removePrizeById(activePrize.id);
    }
    resetSpin();
    setTimeout(() => {
      spin();
    }, 350);
  }, [eliminateWonPrizes, activePrize, removePrizeById, resetSpin, spin]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
      {/* Dynamic Vector Scene Background (Forest, Ocean, Underwater, Studio Default) */}
      <VectorBackground theme={bgTheme} isDark={theme === 'dark'} />

      {/* Grand Stage Curtain Opening Entrance */}
      <StageCurtain
        key={curtainKey}
        enabled={curtainEnabled}
        playCurtainSound={playCurtainOpening}
      />

      {/* Top Floating Glass Header */}
      <Header
        prizeCount={prizes.length}
        historyCount={history.length}
        isMuted={isMuted}
        theme={theme}
        onToggleMute={toggleMute}
        onToggleTheme={toggleTheme}
        onOpenSettings={handleOpenSettings}
        onOpenHistory={handleOpenHistory}
        bgmEnabled={bgmEnabled}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={toggleBgm}
      />

      {/* Main Wheel Arena */}
      <LuckyWheel
        prizes={prizes}
        rotation={currentRotation}
        spinState={spinState}
        needleDeflection={needleDeflection}
        activePrize={activePrize}
        canvasRef={canvasRef}
        wheelGroupRef={wheelGroupRef}
        needleRef={needleRef}
        spotlightConfig={spotlightConfig}
        onSpin={handleSpin}
        onResetPrizes={handleResetPrizes}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictoryOpen}
        prize={activePrize}
        eliminateWonPrizes={eliminateWonPrizes}
        remainingCount={prizes.length}
        onClose={handleCloseVictoryModal}
        onSpinAgain={handleSpinAgain}
      />

      {/* Spin History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => {
          playGlassPop();
          setIsHistoryOpen(false);
        }}
        onClearHistory={() => {
          playClick();
          clearHistory();
        }}
      />

      {/* Prize & Spotlight Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        prizes={prizes}
        spotlightConfig={spotlightConfig}
        eliminateWonPrizes={eliminateWonPrizes}
        onToggleEliminateWonPrizes={() => {
          playClick();
          toggleEliminateWonPrizes();
        }}
        onClose={() => {
          playGlassPop();
          setIsSettingsOpen(false);
        }}
        onSave={(updated) => {
          playGlassPop();
          updatePrizes(updated);
        }}
        onReset={() => {
          playClick();
          resetToDefaults();
        }}
        onUpdateSpotlightConfig={updateSpotlightConfig}
        onResetSpotlightConfig={resetSpotlightConfig}
        curtainEnabled={curtainEnabled}
        onToggleCurtain={toggleCurtain}
        onReplayCurtain={replayCurtain}
        bgTheme={bgTheme}
        onSelectBgTheme={handleSelectBgTheme}
        bgmEnabled={bgmEnabled}
        bgmStyle={bgmStyle}
        bgmVolume={bgmVolume}
        autoDuck={autoDuck}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={toggleBgm}
        onSelectBgmStyle={setBgmStyle}
        onChangeBgmVolume={setBgmVolume}
        onToggleAutoDuck={() => setAutoDuck(!autoDuck)}
      />
    </div>
  );
}
