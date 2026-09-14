'use client';

import React from 'react';
import { SpinState } from '@/types/wheel';

interface StageSpotlightsProps {
  spinState: SpinState;
}

export function StageSpotlights({ spinState }: StageSpotlightsProps) {
  const isSpinning = spinState === 'spinning';
  const isWon = spinState === 'won';

  // Animation class based on spinState
  const leftAnimClass = isSpinning
    ? 'spotlight-left-spin'
    : isWon
    ? 'spotlight-left-won'
    : 'spotlight-left-idle';

  const rightAnimClass = isSpinning
    ? 'spotlight-right-spin'
    : isWon
    ? 'spotlight-right-won'
    : 'spotlight-right-idle';

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15 overflow-visible">
      {/* SVG Stage Spotlight Engine - Centered on Wheel at (500, 500) */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-[680px] h-[680px] xs:w-[800px] xs:h-[800px] sm:w-[1080px] sm:h-[1080px] md:w-[1200px] md:h-[1200px] pointer-events-none overflow-visible select-none shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft blur for beam edges */}
          <filter id="narrow-beam-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          {/* Core beam blur */}
          <filter id="core-beam-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>

          {/* Lamp lens glow */}
          <filter id="lamp-lens-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Focal spot blur on wheel */}
          <filter id="spot-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>

          {/* ================= LIGHT MODE GRADIENTS ================= */}
          {/* Narrow Spotlight Beam Gradient (Light mode: Warm Golden Amber) */}
          <linearGradient id="narrow-beam-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="10%" stopColor="#FFAA44" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#FF7A00" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#FF6B00" stopOpacity="0.10" />
            <stop offset="95%" stopColor="#FF6B00" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>

          {/* Focused Circular Spot on Wheel Surface (Light Mode) */}
          <radialGradient id="focal-spot-light" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#FFA459" stopOpacity="0.30" />
            <stop offset="75%" stopColor="#FF6B00" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>

          {/* ================= DARK MODE GRADIENTS ================= */}
          {/* Narrow Spotlight Beam Gradient (Dark mode: Electric Violet / Cyan) */}
          <linearGradient id="narrow-beam-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="12%" stopColor="#D4FCFF" stopOpacity="0.55" />
            <stop offset="38%" stopColor="#7053FF" stopOpacity="0.26" />
            <stop offset="72%" stopColor="#00F2FE" stopOpacity="0.10" />
            <stop offset="95%" stopColor="#00F2FE" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </linearGradient>

          {/* Focused Circular Spot on Wheel Surface (Dark Mode) */}
          <radialGradient id="focal-spot-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="40%" stopColor="#7053FF" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#00F2FE" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </radialGradient>

          {/* Lamp Hardware Gradients */}
          <linearGradient id="lamp-housing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A4E57" />
            <stop offset="50%" stopColor="#2E3138" />
            <stop offset="100%" stopColor="#1B1D22" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            LEFT SPOTLIGHT ASSEMBLY (Positioned at 160, 100, Sweeps Back-and-Forth)
            ========================================================================= */}
        <g transform="translate(160, 100)">
          {/* Static Mounting Rod & Bracket from Ceiling */}
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
            {/* Outer Soft Haze (Light Mode) */}
            <path
              d="M -7 20 L 7 20 L 60 530 L -60 530 Z"
              fill="url(#narrow-beam-light)"
              filter="url(#narrow-beam-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            {/* Inner Core Beam (Light Mode) */}
            <path
              d="M -4 20 L 4 20 L 35 530 L -35 530 Z"
              fill="url(#narrow-beam-light)"
              filter="url(#core-beam-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* Dark Mode Beams */}
            <path
              d="M -7 20 L 7 20 L 60 530 L -60 530 Z"
              fill="url(#narrow-beam-dark)"
              filter="url(#narrow-beam-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            <path
              d="M -4 20 L 4 20 L 35 530 L -35 530 Z"
              fill="url(#narrow-beam-dark)"
              filter="url(#core-beam-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* 2. Small Focused Light Spot on the Wheel (At target y = 530) */}
            <ellipse
              cx="0"
              cy="530"
              rx="62"
              ry="30"
              fill="url(#focal-spot-light)"
              filter="url(#spot-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />
            <ellipse
              cx="0"
              cy="530"
              rx="62"
              ry="30"
              fill="url(#focal-spot-dark)"
              filter="url(#spot-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />

            {/* 3. Physical Lamp Projector Head */}
            {/* Lamp Cylinder */}
            <rect
              x="-14"
              y="-12"
              width="28"
              height="32"
              rx="4"
              fill="url(#lamp-housing)"
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
              stroke="#FFA04D"
              strokeWidth="1.2"
              className="dark:stroke-[#00F2FE]"
            />
            {/* High-intensity White Bulb Emitter */}
            <ellipse cx="0" cy="25" rx="7" ry="2" fill="#FFFFFF" filter="url(#lamp-lens-glow)" />
            {/* Lens flare aura */}
            <circle
              cx="0"
              cy="25"
              r="12"
              fill="#FFA04D"
              className="dark:fill-[#7053FF]"
              opacity="0.45"
              filter="url(#lamp-lens-glow)"
            />
          </g>
        </g>

        {/* =========================================================================
            RIGHT SPOTLIGHT ASSEMBLY (Positioned at 840, 100, Sweeps Back-and-Forth)
            ========================================================================= */}
        <g transform="translate(840, 100)">
          {/* Static Mounting Rod & Bracket from Ceiling */}
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
            {/* Outer Soft Haze (Light Mode) */}
            <path
              d="M -7 20 L 7 20 L 60 530 L -60 530 Z"
              fill="url(#narrow-beam-light)"
              filter="url(#narrow-beam-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            {/* Inner Core Beam (Light Mode) */}
            <path
              d="M -4 20 L 4 20 L 35 530 L -35 530 Z"
              fill="url(#narrow-beam-light)"
              filter="url(#core-beam-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* Dark Mode Beams */}
            <path
              d="M -7 20 L 7 20 L 60 530 L -60 530 Z"
              fill="url(#narrow-beam-dark)"
              filter="url(#narrow-beam-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.65'}
            />
            <path
              d="M -4 20 L 4 20 L 35 530 L -35 530 Z"
              fill="url(#narrow-beam-dark)"
              filter="url(#core-beam-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.95' : isWon ? '1.0' : '0.75'}
            />

            {/* 2. Small Focused Light Spot on the Wheel (At target y = 530) */}
            <ellipse
              cx="0"
              cy="530"
              rx="62"
              ry="30"
              fill="url(#focal-spot-light)"
              filter="url(#spot-blur)"
              className="dark:hidden"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />
            <ellipse
              cx="0"
              cy="530"
              rx="62"
              ry="30"
              fill="url(#focal-spot-dark)"
              filter="url(#spot-blur)"
              className="hidden dark:block"
              opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
            />

            {/* 3. Physical Lamp Projector Head */}
            {/* Lamp Cylinder */}
            <rect
              x="-14"
              y="-12"
              width="28"
              height="32"
              rx="4"
              fill="url(#lamp-housing)"
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
              stroke="#FFA04D"
              strokeWidth="1.2"
              className="dark:stroke-[#00F2FE]"
            />
            {/* High-intensity White Bulb Emitter */}
            <ellipse cx="0" cy="25" rx="7" ry="2" fill="#FFFFFF" filter="url(#lamp-lens-glow)" />
            {/* Lens flare aura */}
            <circle
              cx="0"
              cy="25"
              r="12"
              fill="#FFA04D"
              className="dark:fill-[#00F2FE]"
              opacity="0.45"
              filter="url(#lamp-lens-glow)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
