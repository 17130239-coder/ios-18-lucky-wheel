'use client';

import React from 'react';
import { SpinState, SpotlightConfig } from '@/types/wheel';

interface StageSpotlightsProps {
  spinState: SpinState;
  config: SpotlightConfig;
}

const PRESET_COLORS: Record<string, { primary: string; secondary: string }> = {
  amber: { primary: '#FFA04D', secondary: '#FF7A00' },
  violet: { primary: '#A855F7', secondary: '#7053FF' },
  cyan: { primary: '#38BDF8', secondary: '#00F2FE' },
  rose: { primary: '#FB7185', secondary: '#F43F5E' },
};

export function StageSpotlights({ spinState, config }: StageSpotlightsProps) {
  // If disabled by user in settings, do not render
  if (!config.enabled) return null;

  const isSpinning = spinState === 'spinning';
  const isWon = spinState === 'won';
  const showDust = config.showDust ?? true;

  // Determine active color stops
  let primaryColor = '#FFA04D';
  let secondaryColor = '#FF7A00';

  if (config.colorMode === 'custom' && config.customColor) {
    primaryColor = config.customColor;
    secondaryColor = config.customColor;
  } else if (config.colorMode === 'rgb') {
    primaryColor = '#FFA04D';
    secondaryColor = '#7053FF';
  } else if (PRESET_COLORS[config.colorMode]) {
    primaryColor = PRESET_COLORS[config.colorMode].primary;
    secondaryColor = PRESET_COLORS[config.colorMode].secondary;
  }

  // Determine active animation class
  let leftAnimClass = 'spotlight-left-rim';
  let rightAnimClass = 'spotlight-right-rim';

  if (isSpinning) {
    leftAnimClass = 'spotlight-left-spin';
    rightAnimClass = 'spotlight-right-spin';
  } else if (isWon) {
    leftAnimClass = 'spotlight-left-won';
    rightAnimClass = 'spotlight-right-won';
  } else {
    if (config.style === 'sweep') {
      leftAnimClass = 'spotlight-left-sweep';
      rightAnimClass = 'spotlight-right-sweep';
    } else if (config.style === 'center') {
      leftAnimClass = 'spotlight-left-center';
      rightAnimClass = 'spotlight-right-center';
    } else {
      leftAnimClass = 'spotlight-left-rim';
      rightAnimClass = 'spotlight-right-rim';
    }
  }

  const isRgbMode = config.colorMode === 'rgb';
  const brightness = Math.max(0.2, Math.min(1, config.brightness || 0.7));

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex items-center justify-center z-15 overflow-visible transition-opacity duration-300 ${
        isRgbMode ? 'spotlight-rgb-mode' : ''
      }`}
      style={{ opacity: brightness }}
    >
      {/* SVG Stage Spotlight Engine - Centered on Wheel at (500, 500) */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-[720px] h-[720px] xs:w-[840px] xs:h-[840px] sm:w-[1100px] sm:h-[1100px] md:w-[1260px] md:h-[1260px] pointer-events-none overflow-visible select-none shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 1. Ultra-soft Atmospheric Fog Blur */}
          <filter id="cfg-fog-blur" x="-50%" y="-20%" width="200%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>

          {/* 2. Volumetric Shaft Blur */}
          <filter id="cfg-beam-blur" x="-40%" y="-20%" width="180%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" />
          </filter>

          {/* 3. Internal Striation Ray Blur */}
          <filter id="cfg-ray-blur" x="-30%" y="-20%" width="160%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.0" />
          </filter>

          {/* 4. Core Laser Filament Blur */}
          <filter id="cfg-core-blur" x="-25%" y="-20%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
          </filter>

          {/* 5. Anamorphic Lens Flare Blur */}
          <filter id="cfg-flare-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="flareGlow" />
            <feMerge>
              <feMergeNode in="flareGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 6. Lamp Lens Glow */}
          <filter id="cfg-lens-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 7. Rim Grazing Soft Glow */}
          <filter id="cfg-rim-blur" x="-50%" y="-30%" width="200%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" />
          </filter>

          {/* 8. Stage Floor Cast Pool Blur */}
          <filter id="cfg-floor-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>

          {/* 9. Floating Dust Particles Blur */}
          <filter id="cfg-dust-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
          </filter>

          {/* GRADIENTS: Atmospheric Fog Envelope (Deep Reach to y = 960) */}
          <linearGradient id="cfg-fog-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="6%" stopColor={primaryColor} stopOpacity="0.45" />
            <stop offset="25%" stopColor={primaryColor} stopOpacity="0.22" />
            <stop offset="55%" stopColor={secondaryColor} stopOpacity="0.12" />
            <stop offset="85%" stopColor={secondaryColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>

          {/* GRADIENTS: Mid Volumetric Beam Cone */}
          <linearGradient id="cfg-beam-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="10%" stopColor={primaryColor} stopOpacity="0.65" />
            <stop offset="30%" stopColor={primaryColor} stopOpacity="0.40" />
            <stop offset="65%" stopColor={secondaryColor} stopOpacity="0.20" />
            <stop offset="88%" stopColor={secondaryColor} stopOpacity="0.09" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.01" />
          </linearGradient>

          {/* GRADIENTS: Intense Hot Core Filament */}
          <linearGradient id="cfg-core-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.55" />
            <stop offset="70%" stopColor={secondaryColor} stopOpacity="0.24" />
            <stop offset="95%" stopColor={secondaryColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>

          {/* GRADIENTS: Anamorphic Horizontal Flare */}
          <linearGradient id="cfg-anamorphic-flare" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0" />
            <stop offset="25%" stopColor={primaryColor} stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="75%" stopColor={primaryColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
          </linearGradient>

          {/* GRADIENTS: Tangential Rim Grazing Spot */}
          <radialGradient id="cfg-rim-graze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.28" />
            <stop offset="75%" stopColor={secondaryColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
          </radialGradient>

          {/* GRADIENTS: Stage Floor Cast Light Pool */}
          <radialGradient id="cfg-floor-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.60" />
            <stop offset="25%" stopColor={primaryColor} stopOpacity="0.38" />
            <stop offset="65%" stopColor={secondaryColor} stopOpacity="0.15" />
            <stop offset="88%" stopColor={secondaryColor} stopOpacity="0.03" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
          </radialGradient>

          {/* Lamp Housing Gradient */}
          <linearGradient id="cfg-lamp-housing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A4E57" />
            <stop offset="50%" stopColor="#2E3138" />
            <stop offset="100%" stopColor="#1B1D22" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            LEFT SPOTLIGHT ASSEMBLY (Positioned at 160, 90)
            ========================================================================= */}
        <g transform="translate(160, 90)">
          {/* Static Ceiling Mounting Hardware */}
          <rect x="-2.5" y="-55" width="5" height="40" fill="#3D414A" rx="1.5" />
          <circle cx="0" cy="-15" r="6.5" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -17 -15 L -17 2 A 17 17 0 0 0 17 2 L 17 -15"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Deep Volumetric Light Beam) */}
          <g className={leftAnimClass}>
            {/* 1. Deep Atmospheric Fog Envelope (Extends down to y = 960) */}
            <path
              d="M -14 25 L 14 25 L 96 960 L -96 960 Z"
              fill="url(#cfg-fog-gradient)"
              filter="url(#cfg-fog-blur)"
              opacity={isSpinning ? 0.95 : isWon ? 1.0 : 0.72}
            />

            {/* 2. Main Volumetric Ray Cone */}
            <path
              d="M -8 25 L 8 25 L 70 960 L -70 960 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? 0.98 : isWon ? 1.0 : 0.82}
            />

            {/* 3. Volumetric God-Ray Striations (Natural Internal Caustics) */}
            <path
              d="M -3 25 L 1 25 L 30 960 L 14 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-ray-blur)"
              opacity="0.38"
            />
            <path
              d="M 0 25 L 4 25 L -12 960 L -28 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-ray-blur)"
              opacity="0.32"
            />

            {/* 4. Intense Core Laser Filament */}
            <path
              d="M -3.5 25 L 3.5 25 L 24 960 L -24 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? 1.0 : isWon ? 1.0 : 0.88}
            />

            {/* 5. Rim Grazing Tangential Skim on Wheel Frame (At y = 490) */}
            <ellipse
              cx="0"
              cy="490"
              rx="38"
              ry="75"
              fill="url(#cfg-rim-graze)"
              filter="url(#cfg-rim-blur)"
              opacity={isSpinning ? 0.85 : isWon ? 0.95 : 0.60}
            />

            {/* 6. Stage Floor Cast Pool (At bottom floor y = 940) */}
            <g className="spotlight-floor-pool">
              <ellipse
                cx="0"
                cy="940"
                rx="92"
                ry="36"
                fill="url(#cfg-floor-pool)"
                filter="url(#cfg-floor-blur)"
                opacity={isSpinning ? 0.90 : isWon ? 1.0 : 0.70}
              />
            </g>

            {/* 7. Floating Stage Dust Motes (Hạt bụi ánh sáng thể tích lơ lửng) */}
            {showDust && (
              <g className="pointer-events-none">
                <circle cx="5" cy="140" r="1.8" fill="#FFFFFF" opacity="0.8" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="-10" cy="230" r="2.2" fill={primaryColor} opacity="0.75" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="14" cy="340" r="1.6" fill="#FFFFFF" opacity="0.85" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="-16" cy="460" r="2.6" fill={secondaryColor} opacity="0.7" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="20" cy="570" r="2.0" fill="#FFFFFF" opacity="0.8" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="-24" cy="680" r="2.8" fill={primaryColor} opacity="0.65" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="18" cy="790" r="2.4" fill="#FFFFFF" opacity="0.75" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="-28" cy="880" r="3.2" fill={secondaryColor} opacity="0.6" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
              </g>
            )}

            {/* 8. Anamorphic Cinema Lens Flare Streak (At snout y = 25) */}
            <g className="spotlight-anamorphic-flare">
              <path
                d="M -54 25 Q 0 23.5 54 25 Q 0 26.5 -54 25 Z"
                fill="url(#cfg-anamorphic-flare)"
                filter="url(#cfg-flare-blur)"
              />
            </g>

            {/* 9. Physical Stage Luminaire Projector Head */}
            <rect
              x="-15"
              y="-10"
              width="30"
              height="33"
              rx="4.5"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            {/* Cooling heat sink ridges */}
            <line x1="-12" y1="-5" x2="12" y2="-5" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-12" y1="-1" x2="12" y2="-1" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-12" y1="3" x2="12" y2="3" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Optical Snout */}
            <polygon
              points="-16,21 16,21 13,26 -13,26"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="26"
              rx="13"
              ry="3.8"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1.2"
            />
            {/* High-intensity White Arc Emitter */}
            <ellipse cx="0" cy="26" rx="8" ry="2.2" fill="#FFFFFF" filter="url(#cfg-lens-glow)" />
            {/* Corona Lens Glow */}
            <circle
              cx="0"
              cy="26"
              r="14"
              fill={primaryColor}
              opacity="0.55"
              filter="url(#cfg-lens-glow)"
            />
          </g>
        </g>

        {/* =========================================================================
            RIGHT SPOTLIGHT ASSEMBLY (Positioned at 840, 90)
            ========================================================================= */}
        <g transform="translate(840, 90)">
          {/* Static Ceiling Mounting Hardware */}
          <rect x="-2.5" y="-55" width="5" height="40" fill="#3D414A" rx="1.5" />
          <circle cx="0" cy="-15" r="6.5" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -17 -15 L -17 2 A 17 17 0 0 0 17 2 L 17 -15"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Deep Volumetric Light Beam) */}
          <g className={rightAnimClass}>
            {/* 1. Deep Atmospheric Fog Envelope (Extends down to y = 960) */}
            <path
              d="M -14 25 L 14 25 L 96 960 L -96 960 Z"
              fill="url(#cfg-fog-gradient)"
              filter="url(#cfg-fog-blur)"
              opacity={isSpinning ? 0.95 : isWon ? 1.0 : 0.72}
            />

            {/* 2. Main Volumetric Ray Cone */}
            <path
              d="M -8 25 L 8 25 L 70 960 L -70 960 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? 0.98 : isWon ? 1.0 : 0.82}
            />

            {/* 3. Volumetric God-Ray Striations (Natural Internal Caustics) */}
            <path
              d="M -3 25 L 1 25 L 30 960 L 14 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-ray-blur)"
              opacity="0.38"
            />
            <path
              d="M 0 25 L 4 25 L -12 960 L -28 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-ray-blur)"
              opacity="0.32"
            />

            {/* 4. Intense Core Laser Filament */}
            <path
              d="M -3.5 25 L 3.5 25 L 24 960 L -24 960 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? 1.0 : isWon ? 1.0 : 0.88}
            />

            {/* 5. Rim Grazing Tangential Skim on Wheel Frame (At y = 490) */}
            <ellipse
              cx="0"
              cy="490"
              rx="38"
              ry="75"
              fill="url(#cfg-rim-graze)"
              filter="url(#cfg-rim-blur)"
              opacity={isSpinning ? 0.85 : isWon ? 0.95 : 0.60}
            />

            {/* 6. Stage Floor Cast Pool (At bottom floor y = 940) */}
            <g className="spotlight-floor-pool">
              <ellipse
                cx="0"
                cy="940"
                rx="92"
                ry="36"
                fill="url(#cfg-floor-pool)"
                filter="url(#cfg-floor-blur)"
                opacity={isSpinning ? 0.90 : isWon ? 1.0 : 0.70}
              />
            </g>

            {/* 7. Floating Stage Dust Motes (Hạt bụi ánh sáng thể tích lơ lửng) */}
            {showDust && (
              <g className="pointer-events-none">
                <circle cx="-5" cy="150" r="1.8" fill="#FFFFFF" opacity="0.8" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="12" cy="240" r="2.2" fill={primaryColor} opacity="0.75" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="-15" cy="360" r="1.6" fill="#FFFFFF" opacity="0.85" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="17" cy="470" r="2.6" fill={secondaryColor} opacity="0.7" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="-19" cy="580" r="2.0" fill="#FFFFFF" opacity="0.8" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="25" cy="690" r="2.8" fill={primaryColor} opacity="0.65" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="-20" cy="800" r="2.4" fill="#FFFFFF" opacity="0.75" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="26" cy="890" r="3.2" fill={secondaryColor} opacity="0.6" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
              </g>
            )}

            {/* 8. Anamorphic Cinema Lens Flare Streak (At snout y = 25) */}
            <g className="spotlight-anamorphic-flare">
              <path
                d="M -54 25 Q 0 23.5 54 25 Q 0 26.5 -54 25 Z"
                fill="url(#cfg-anamorphic-flare)"
                filter="url(#cfg-flare-blur)"
              />
            </g>

            {/* 9. Physical Stage Luminaire Projector Head */}
            <rect
              x="-15"
              y="-10"
              width="30"
              height="33"
              rx="4.5"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            {/* Cooling heat sink ridges */}
            <line x1="-12" y1="-5" x2="12" y2="-5" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-12" y1="-1" x2="12" y2="-1" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-12" y1="3" x2="12" y2="3" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Optical Snout */}
            <polygon
              points="-16,21 16,21 13,26 -13,26"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="26"
              rx="13"
              ry="3.8"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1.2"
            />
            {/* High-intensity White Arc Emitter */}
            <ellipse cx="0" cy="26" rx="8" ry="2.2" fill="#FFFFFF" filter="url(#cfg-lens-glow)" />
            {/* Corona Lens Glow */}
            <circle
              cx="0"
              cy="26"
              r="14"
              fill={primaryColor}
              opacity="0.55"
              filter="url(#cfg-lens-glow)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
