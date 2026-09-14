'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ThemeMode, PrizeItem } from '@/types/wheel';
import { usePrizeStore } from '@/hooks/usePrizeStore';
import { useSpotlightStore } from '@/hooks/useSpotlightStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useConfetti } from '@/hooks/useConfetti';
import { useLuckyWheel } from '@/hooks/useLuckyWheel';
import { Header } from '@/components/header/Header';
import { LuckyWheel } from '@/components/wheel/LuckyWheel';
import { VictoryModal } from '@/components/modals/VictoryModal';
import { HistoryDrawer } from '@/components/modals/HistoryDrawer';
import { SettingsDrawer } from '@/components/settings/SettingsDrawer';

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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

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
  } = useSoundEffects();

  const { canvasRef, spawnConfetti } = useConfetti();

  // Winning handler
  const handleWin = useCallback(
    (wonPrize: PrizeItem) => {
      addHistoryItem(wonPrize);
      playWinFanfare();
      setIsVictoryOpen(true);
    },
    [addHistoryItem, playWinFanfare]
  );

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
    onSpinStart: playSpinLaunch,
    onTick: playTick,
    onWin: handleWin,
    onSpawnConfetti: spawnConfetti,
  });

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
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Top Floating Glass Header */}
      <Header
        prizeCount={prizes.length}
        historyCount={history.length}
        isMuted={isMuted}
        theme={theme}
        onToggleMute={toggleMute}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => {
          playGlassPop();
          setIsSettingsOpen(true);
        }}
        onOpenHistory={() => {
          playGlassPop();
          setIsHistoryOpen(true);
        }}
      />

      {/* Main Wheel Arena */}
      <LuckyWheel
        prizes={prizes}
        rotation={currentRotation}
        spinState={spinState}
        needleDeflection={needleDeflection}
        activePrize={activePrize}
        canvasRef={canvasRef}
        spotlightConfig={spotlightConfig}
        onSpin={spin}
        onResetPrizes={() => {
          playClick();
          resetToDefaults();
        }}
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
      />
    </div>
  );
}
