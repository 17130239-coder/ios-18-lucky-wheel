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
  const brightness = Math.max(0.2, Math.min(1, config.brightness || 0.65));

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
        className="w-[680px] h-[680px] xs:w-[800px] xs:h-[800px] sm:w-[1080px] sm:h-[1080px] md:w-[1200px] md:h-[1200px] pointer-events-none overflow-visible select-none shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft blur for beam edges */}
          <filter id="cfg-beam-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" />
          </filter>

          {/* Core beam blur */}
          <filter id="cfg-core-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>

          {/* Lamp lens glow */}
          <filter id="cfg-lens-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Focal spot blur on rim */}
          <filter id="cfg-spot-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>

          {/* Dynamic Spotlight Beam Gradient */}
          <linearGradient id="cfg-beam-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="10%" stopColor={primaryColor} stopOpacity="0.50" />
            <stop offset="35%" stopColor={secondaryColor} stopOpacity="0.25" />
            <stop offset="70%" stopColor={secondaryColor} stopOpacity="0.10" />
            <stop offset="95%" stopColor={secondaryColor} stopOpacity="0.02" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Focused Circular Grazing Spot */}
          <radialGradient id="cfg-focal-spot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="35%" stopColor={primaryColor} stopOpacity="0.32" />
            <stop offset="75%" stopColor={secondaryColor} stopOpacity="0.08" />
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
            LEFT SPOTLIGHT ASSEMBLY (Positioned at 160, 100)
            ========================================================================= */}
        <g transform="translate(160, 100)">
          {/* Static Ceiling Mounting Hardware */}
          <rect x="-2.5" y="-55" width="5" height="38" fill="#3D414A" rx="1.5" />
          <circle cx="0" cy="-17" r="6" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -16 -17 L -16 0 A 16 16 0 0 0 16 0 L 16 -17"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Narrow Focused Beam) */}
          <g className={leftAnimClass}>
            {/* 1. Narrow Focused Light Beam Cone */}
            {/* Outer Soft Haze */}
            <path
              d="M -7 20 L 7 20 L 52 500 L -52 500 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            {/* Inner Core Beam */}
            <path
              d="M -4 20 L 4 20 L 30 500 L -30 500 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* 2. Small Grazing Light Spot on Wheel Rim (At target y = 500) */}
            <ellipse
              cx="0"
              cy="500"
              rx="55"
              ry="26"
              fill="url(#cfg-focal-spot)"
              filter="url(#cfg-spot-blur)"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />

            {/* 3. Physical Lamp Projector Head */}
            <rect
              x="-14"
              y="-12"
              width="28"
              height="32"
              rx="4"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            {/* Cooling ridges */}
            <line x1="-11" y1="-7" x2="11" y2="-7" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="-3" x2="11" y2="-3" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="1" x2="11" y2="1" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Snout */}
            <polygon
              points="-15,20 15,20 12,25 -12,25"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="25"
              rx="12"
              ry="3.5"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1.2"
            />
            {/* High-intensity White Bulb Emitter */}
            <ellipse cx="0" cy="25" rx="7" ry="2" fill="#FFFFFF" filter="url(#cfg-lens-glow)" />
            {/* Lens flare aura */}
            <circle
              cx="0"
              cy="25"
              r="12"
              fill={primaryColor}
              opacity="0.5"
              filter="url(#cfg-lens-glow)"
            />
          </g>
        </g>

        {/* =========================================================================
            RIGHT SPOTLIGHT ASSEMBLY (Positioned at 840, 100)
            ========================================================================= */}
        <g transform="translate(840, 100)">
          {/* Static Ceiling Mounting Hardware */}
          <rect x="-2.5" y="-55" width="5" height="38" fill="#3D414A" rx="1.5" />
          <circle cx="0" cy="-17" r="6" fill="#25282F" stroke="#525763" strokeWidth="1.5" />
          <path
            d="M -16 -17 L -16 0 A 16 16 0 0 0 16 0 L 16 -17"
            fill="none"
            stroke="#4A4E57"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Swiveling Group (Lamp Head + Narrow Focused Beam) */}
          <g className={rightAnimClass}>
            {/* 1. Narrow Focused Light Beam Cone */}
            {/* Outer Soft Haze */}
            <path
              d="M -7 20 L 7 20 L 52 500 L -52 500 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-beam-blur)"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            {/* Inner Core Beam */}
            <path
              d="M -4 20 L 4 20 L 30 500 L -30 500 Z"
              fill="url(#cfg-beam-gradient)"
              filter="url(#cfg-core-blur)"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* 2. Small Grazing Light Spot on Wheel Rim (At target y = 500) */}
            <ellipse
              cx="0"
              cy="500"
              rx="55"
              ry="26"
              fill="url(#cfg-focal-spot)"
              filter="url(#cfg-spot-blur)"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />

            {/* 3. Physical Lamp Projector Head */}
            <rect
              x="-14"
              y="-12"
              width="28"
              height="32"
              rx="4"
              fill="url(#cfg-lamp-housing)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            {/* Cooling ridges */}
            <line x1="-11" y1="-7" x2="11" y2="-7" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="-3" x2="11" y2="-3" stroke="#181A1F" strokeWidth="1.5" />
            <line x1="-11" y1="1" x2="11" y2="1" stroke="#181A1F" strokeWidth="1.5" />

            {/* Beveled Snout */}
            <polygon
              points="-15,20 15,20 12,25 -12,25"
              fill="#181A1F"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
            />

            {/* Fresnel Lens Rim */}
            <ellipse
              cx="0"
              cy="25"
              rx="12"
              ry="3.5"
              fill="#FFFFFF"
              stroke={primaryColor}
              strokeWidth="1.2"
            />
            {/* High-intensity White Bulb Emitter */}
            <ellipse cx="0" cy="25" rx="7" ry="2" fill="#FFFFFF" filter="url(#cfg-lens-glow)" />
            {/* Lens flare aura */}
            <circle
              cx="0"
              cy="25"
              r="12"
              fill={primaryColor}
              opacity="0.5"
              filter="url(#cfg-lens-glow)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
