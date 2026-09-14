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
  // Softer master brightness curve for soothing, gentle ambient look
  const userBrightness = Math.max(0.15, Math.min(1, config.brightness || 0.55));
  const brightness = userBrightness * 0.75;

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
          {/* 1. Ultra-soft Atmospheric Fog Blur (Gentle, wide & dreamy dispersion) */}
          <filter id="cfg-fog-blur" x="-60%" y="-20%" width="220%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>

          {/* 2. Soft Volumetric Beam Blur */}
          <filter id="cfg-beam-blur" x="-50%" y="-20%" width="200%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9.0" />
          </filter>

          {/* 3. Soft Core Warmth Blur (No harsh laser edges) */}
          <filter id="cfg-core-blur" x="-40%" y="-20%" width="180%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" />
          </filter>

          {/* 4. Lamp Lens Glow */}
          <filter id="cfg-lens-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 5. Rim Grazing Soft Glow (Wide subtle aura) */}
          <filter id="cfg-rim-blur" x="-50%" y="-30%" width="200%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>

          {/* 6. Floating Dust Particles Blur */}
          <filter id="cfg-dust-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
          </filter>

          {/* GRADIENTS: Atmospheric Fog Envelope (Soft, Flared & Dissolves by y = 660) */}
          <linearGradient id="cfg-fog-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="12%" stopColor={primaryColor} stopOpacity="0.22" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.10" />
            <stop offset="68%" stopColor={secondaryColor} stopOpacity="0.04" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>

          {/* GRADIENTS: Mid Volumetric Beam Cone (Naturally flared) */}
          <linearGradient id="cfg-beam-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="15%" stopColor={primaryColor} stopOpacity="0.32" />
            <stop offset="40%" stopColor={primaryColor} stopOpacity="0.16" />
            <stop offset="70%" stopColor={secondaryColor} stopOpacity="0.06" />
            <stop offset="90%" stopColor={secondaryColor} stopOpacity="0.015" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>

          {/* GRADIENTS: Soft Velvety Inner Core */}
          <linearGradient id="cfg-core-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.40" />
            <stop offset="40%" stopColor={primaryColor} stopOpacity="0.20" />
            <stop offset="75%" stopColor={secondaryColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
          </linearGradient>

          {/* GRADIENTS: Tangential Rim Grazing Spot */}
          <radialGradient id="cfg-rim-graze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.36" />
            <stop offset="40%" stopColor={primaryColor} stopOpacity="0.16" />
            <stop offset="80%" stopColor={secondaryColor} stopOpacity="0.04" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
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
          <circle cx="0" cy="-15" r="6" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -17 -15 L -17 2 A 17 17 0 0 0 17 2 L 17 -15"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Soft Flared Light Beam) */}
          <g className={leftAnimClass}>
            {/* 1. Gentle Flared Atmospheric Fog Envelope (Tỏa rộng tự nhiên) */}
            <path
              d="M -11 25 Q -32 320 -115 660 L 115 660 Q 32 320 11 25 Z"
              fill="url(#cfg-fog-gradient)"
              filter="url(#cfg-fog-blur)"
              opacity={isSpinning ? 0.65 : isWon ? 0.75 : 0.40}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 2. Main Soft Flared Volumetric Ray Cone */}
            <path
              d="M -7 25 Q -24 320 -82 660 L 82 660 Q 24 320 7 25 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? 0.75 : isWon ? 0.85 : 0.50}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 3. Soft Velvety Core Glow */}
            <path
              d="M -3 25 Q -12 320 -42 660 L 42 660 Q 12 320 3 25 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? 0.65 : isWon ? 0.75 : 0.45}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 4. Rim Grazing Tangential Touch on Wheel Frame (At y = 440) */}
            <ellipse
              cx="0"
              cy="440"
              rx="38"
              ry="58"
              fill="url(#cfg-rim-graze)"
              filter="url(#cfg-rim-blur)"
              opacity={isSpinning ? 0.55 : isWon ? 0.70 : 0.35}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 5. Delicate Floating Stage Dust Motes across the Flared Cone */}
            {showDust && (
              <g className="pointer-events-none">
                <circle cx="5" cy="130" r="1.3" fill="#FFFFFF" opacity="0.6" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="-12" cy="220" r="1.6" fill={primaryColor} opacity="0.5" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="22" cy="320" r="1.2" fill="#FFFFFF" opacity="0.65" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="-28" cy="430" r="1.8" fill={secondaryColor} opacity="0.45" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="35" cy="530" r="1.5" fill="#FFFFFF" opacity="0.5" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
              </g>
            )}

            {/* 6. Soft Lens Aura Glow */}
            <circle
              cx="0"
              cy="26"
              r="16"
              fill={primaryColor}
              opacity="0.35"
              filter="url(#cfg-lens-glow)"
            />

            {/* 7. Physical Stage Luminaire Projector Head */}
            <rect
              x="-14"
              y="-10"
              width="28"
              height="32"
              rx="4"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            {/* Cooling heat sink ridges */}
            <line x1="-11" y1="-5" x2="11" y2="-5" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="-1" x2="11" y2="-1" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="3" x2="11" y2="3" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Optical Snout */}
            <polygon
              points="-15,21 15,21 12,26 -12,26"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="26"
              rx="12"
              ry="3.5"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1"
            />
            {/* Gentle Warm Emitter Bulb */}
            <ellipse cx="0" cy="26" rx="6" ry="1.8" fill="#FFFFFF" opacity="0.85" filter="url(#cfg-lens-glow)" />
          </g>
        </g>

        {/* =========================================================================
            RIGHT SPOTLIGHT ASSEMBLY (Positioned at 840, 90)
            ========================================================================= */}
        <g transform="translate(840, 90)">
          {/* Static Ceiling Mounting Hardware */}
          <rect x="-2.5" y="-55" width="5" height="40" fill="#3D414A" rx="1.5" />
          <circle cx="0" cy="-15" r="6" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -17 -15 L -17 2 A 17 17 0 0 0 17 2 L 17 -15"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Soft Flared Light Beam) */}
          <g className={rightAnimClass}>
            {/* 1. Gentle Flared Atmospheric Fog Envelope (Tỏa rộng tự nhiên) */}
            <path
              d="M -11 25 Q -32 320 -115 660 L 115 660 Q 32 320 11 25 Z"
              fill="url(#cfg-fog-gradient)"
              filter="url(#cfg-fog-blur)"
              opacity={isSpinning ? 0.65 : isWon ? 0.75 : 0.40}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 2. Main Soft Flared Volumetric Ray Cone */}
            <path
              d="M -7 25 Q -24 320 -82 660 L 82 660 Q 24 320 7 25 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? 0.75 : isWon ? 0.85 : 0.50}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 3. Soft Velvety Core Glow */}
            <path
              d="M -3 25 Q -12 320 -42 660 L 42 660 Q 12 320 3 25 Z"
              fill="url(#cfg-core-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? 0.65 : isWon ? 0.75 : 0.45}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 4. Rim Grazing Tangential Touch on Wheel Frame (At y = 440) */}
            <ellipse
              cx="0"
              cy="440"
              rx="38"
              ry="58"
              fill="url(#cfg-rim-graze)"
              filter="url(#cfg-rim-blur)"
              opacity={isSpinning ? 0.55 : isWon ? 0.70 : 0.35}
              className="transition-opacity duration-700 ease-out"
            />

            {/* 5. Delicate Floating Stage Dust Motes across the Flared Cone */}
            {showDust && (
              <g className="pointer-events-none">
                <circle cx="-5" cy="140" r="1.3" fill="#FFFFFF" opacity="0.6" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="12" cy="230" r="1.6" fill={primaryColor} opacity="0.5" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
                <circle cx="-22" cy="330" r="1.2" fill="#FFFFFF" opacity="0.65" className="spotlight-dust-c" filter="url(#cfg-dust-blur)" />
                <circle cx="28" cy="440" r="1.8" fill={secondaryColor} opacity="0.45" className="spotlight-dust-a" filter="url(#cfg-dust-blur)" />
                <circle cx="-35" cy="540" r="1.5" fill="#FFFFFF" opacity="0.5" className="spotlight-dust-b" filter="url(#cfg-dust-blur)" />
              </g>
            )}

            {/* 6. Soft Lens Aura Glow */}
            <circle
              cx="0"
              cy="26"
              r="16"
              fill={primaryColor}
              opacity="0.35"
              filter="url(#cfg-lens-glow)"
            />

            {/* 7. Physical Stage Luminaire Projector Head */}
            <rect
              x="-14"
              y="-10"
              width="28"
              height="32"
              rx="4"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
            {/* Cooling heat sink ridges */}
            <line x1="-11" y1="-5" x2="11" y2="-5" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="-1" x2="11" y2="-1" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="3" x2="11" y2="3" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Optical Snout */}
            <polygon
              points="-15,21 15,21 12,26 -12,26"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="26"
              rx="12"
              ry="3.5"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1"
            />
            {/* Gentle Warm Emitter Bulb */}
            <ellipse cx="0" cy="26" rx="6" ry="1.8" fill="#FFFFFF" opacity="0.85" filter="url(#cfg-lens-glow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
