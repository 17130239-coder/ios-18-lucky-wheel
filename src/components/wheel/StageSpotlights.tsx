'use client';

import React from 'react';
import { SpinState } from '@/types/wheel';

interface StageSpotlightsProps {
  spinState: SpinState;
}

export function StageSpotlights({ spinState }: StageSpotlightsProps) {
  const isSpinning = spinState === 'spinning';
  const isWon = spinState === 'won';

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15 overflow-visible">
      {/* SVG Stage Spotlight Projection Engine (Centered on the Wheel at 500, 500) */}
      <svg
        viewBox="0 0 1000 1000"
        className="w-[680px] h-[680px] xs:w-[800px] xs:h-[800px] sm:w-[1080px] sm:h-[1080px] md:w-[1200px] md:h-[1200px] pointer-events-none overflow-visible select-none shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ================= BLURS & OPTICAL FILTERS ================= */}
          {/* Soft blur for outer atmospheric haze */}
          <filter id="spot-feather-wide" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>

          {/* Medium blur for inner volumetric light cone */}
          <filter id="spot-feather-core" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
          </filter>

          {/* Sharp glow for lamp lenses */}
          <filter id="lens-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ================= LIGHT MODE GRADIENTS ================= */}
          {/* Left Lamp Beam Gradient (Light mode: Warm Golden Amber) */}
          <linearGradient
            id="left-beam-grad-light"
            x1="160"
            y1="100"
            x2="500"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="12%" stopColor="#FFAA44" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#FF8800" stopOpacity="0.30" />
            <stop offset="68%" stopColor="#FF6B00" stopOpacity="0.14" />
            <stop offset="92%" stopColor="#FFA04D" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFA04D" stopOpacity="0" />
          </linearGradient>

          {/* Right Lamp Beam Gradient (Light mode: Luminous Solar Amber) */}
          <linearGradient
            id="right-beam-grad-light"
            x1="840"
            y1="100"
            x2="500"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="12%" stopColor="#FFBA55" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#FF9010" stopOpacity="0.30" />
            <stop offset="68%" stopColor="#FF6B00" stopOpacity="0.14" />
            <stop offset="92%" stopColor="#FFA04D" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFA04D" stopOpacity="0" />
          </linearGradient>

          {/* ================= DARK MODE GRADIENTS ================= */}
          {/* Left Lamp Beam Gradient (Dark mode: Electric Violet into Cyan) */}
          <linearGradient
            id="left-beam-grad-dark"
            x1="160"
            y1="100"
            x2="500"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="14%" stopColor="#C8BFFF" stopOpacity="0.65" />
            <stop offset="38%" stopColor="#7053FF" stopOpacity="0.35" />
            <stop offset="72%" stopColor="#00F2FE" stopOpacity="0.15" />
            <stop offset="95%" stopColor="#00F2FE" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </linearGradient>

          {/* Right Lamp Beam Gradient (Dark mode: Cryo Cyan into Electric Violet) */}
          <linearGradient
            id="right-beam-grad-dark"
            x1="840"
            y1="100"
            x2="500"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="14%" stopColor="#D4FCFF" stopOpacity="0.65" />
            <stop offset="38%" stopColor="#00F2FE" stopOpacity="0.35" />
            <stop offset="72%" stopColor="#7053FF" stopOpacity="0.15" />
            <stop offset="95%" stopColor="#7053FF" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#7053FF" stopOpacity="0" />
          </linearGradient>

          {/* Wheel Surface Illuminated Hotspot Pool */}
          <radialGradient id="wheel-focal-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#FFA459" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#FF6B00" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="wheel-focal-pool-dark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#7053FF" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#00F2FE" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
          </radialGradient>

          {/* Metal Housing Gradients for Lamp Bodies */}
          <linearGradient id="lamp-body-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A4E57" />
            <stop offset="50%" stopColor="#2D3037" />
            <stop offset="100%" stopColor="#1A1C20" />
          </linearGradient>

          <linearGradient id="lamp-body-right" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A4E57" />
            <stop offset="50%" stopColor="#2D3037" />
            <stop offset="100%" stopColor="#1A1C20" />
          </linearGradient>

          <linearGradient id="lamp-bracket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#686D76" />
            <stop offset="100%" stopColor="#373A40" />
          </linearGradient>
        </defs>

        {/* =========================================================================
            LAYER 1: VOLUMETRIC LIGHT BEAMS (TANGENT TO WHEEL AT CX=500, CY=500, R=260)
            ========================================================================= */}
        {/* Breathing / Pulsing Volumetric Container */}
        <g
          className={`transition-all duration-700 ${
            isSpinning
              ? 'opacity-100 scale-[1.03]'
              : isWon
              ? 'opacity-100 scale-[1.05]'
              : 'opacity-85'
          }`}
          style={{ transformOrigin: '500px 500px' }}
        >
          {/* --- LEFT LIGHT BEAM (Shining from 160, 100 onto Wheel) --- */}
          {/* Outer Atmospheric Haze Cone */}
          <path
            d="M 160 100 L 980 370 L 290 950 Z"
            fill="url(#left-beam-grad-light)"
            className="dark:hidden"
            filter="url(#spot-feather-wide)"
            opacity={isSpinning ? '0.75' : isWon ? '0.90' : '0.55'}
          />
          <path
            d="M 160 100 L 980 370 L 290 950 Z"
            fill="url(#left-beam-grad-dark)"
            className="hidden dark:block"
            filter="url(#spot-feather-wide)"
            opacity={isSpinning ? '0.70' : isWon ? '0.85' : '0.50'}
          />

          {/* Inner Precise Luminous Core Cone */}
          <path
            d="M 154 94 L 166 106 L 950 395 L 320 925 Z"
            fill="url(#left-beam-grad-light)"
            className="dark:hidden"
            filter="url(#spot-feather-core)"
            opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
          />
          <path
            d="M 154 94 L 166 106 L 950 395 L 320 925 Z"
            fill="url(#left-beam-grad-dark)"
            className="hidden dark:block"
            filter="url(#spot-feather-core)"
            opacity={isSpinning ? '0.85' : isWon ? '0.95' : '0.65'}
          />

          {/* --- RIGHT LIGHT BEAM (Shining from 840, 100 onto Wheel) --- */}
          {/* Outer Atmospheric Haze Cone */}
          <path
            d="M 840 100 L 710 950 L 20 370 Z"
            fill="url(#right-beam-grad-light)"
            className="dark:hidden"
            filter="url(#spot-feather-wide)"
            opacity={isSpinning ? '0.75' : isWon ? '0.90' : '0.55'}
          />
          <path
            d="M 840 100 L 710 950 L 20 370 Z"
            fill="url(#right-beam-grad-dark)"
            className="hidden dark:block"
            filter="url(#spot-feather-wide)"
            opacity={isSpinning ? '0.70' : isWon ? '0.85' : '0.50'}
          />

          {/* Inner Precise Luminous Core Cone */}
          <path
            d="M 846 94 L 834 106 L 680 925 L 50 395 Z"
            fill="url(#right-beam-grad-light)"
            className="dark:hidden"
            filter="url(#spot-feather-core)"
            opacity={isSpinning ? '0.90' : isWon ? '1.0' : '0.70'}
          />
          <path
            d="M 846 94 L 834 106 L 680 925 L 50 395 Z"
            fill="url(#right-beam-grad-dark)"
            className="hidden dark:block"
            filter="url(#spot-feather-core)"
            opacity={isSpinning ? '0.85' : isWon ? '0.95' : '0.65'}
          />
        </g>

        {/* =========================================================================
            LAYER 2: FOCAL ILLUMINATION OVERLAY DIRECTLY ON THE WHEEL CIRCLE
            ========================================================================= */}
        {/* Soft luminous wash directly bathing the wheel */}
        <circle
          cx="500"
          cy="500"
          r="265"
          fill="url(#wheel-focal-pool)"
          className="dark:hidden pointer-events-none transition-opacity duration-500"
          opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.60'}
        />
        <circle
          cx="500"
          cy="500"
          r="265"
          fill="url(#wheel-focal-pool-dark)"
          className="hidden dark:block pointer-events-none transition-opacity duration-500"
          opacity={isSpinning ? '0.85' : isWon ? '1.0' : '0.60'}
        />

        {/* Specular rim glints where the 2 spotlights graze the top edges of the wheel */}
        {/* Left beam grazing highlight on upper-left rim */}
        <path
          d="M 320 320 A 260 260 0 0 1 450 242"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity={isSpinning ? '0.85' : isWon ? '0.95' : '0.60'}
          filter="url(#lens-glow)"
          className="transition-opacity duration-300"
        />
        {/* Right beam grazing highlight on upper-right rim */}
        <path
          d="M 550 242 A 260 260 0 0 1 680 320"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity={isSpinning ? '0.85' : isWon ? '0.95' : '0.60'}
          filter="url(#lens-glow)"
          className="transition-opacity duration-300"
        />

        {/* =========================================================================
            LAYER 3: PHYSICAL PROJECTOR LAMP FIXTURES (LEFT & RIGHT)
            ========================================================================= */}
        {/* ---------- LEFT PROJECTOR LAMP (Centered at 160, 100, Angled 49.6deg) ---------- */}
        <g transform="translate(160, 100) rotate(49.6)">
          {/* Ceiling Drop Rod & Swivel Mount */}
          <rect x="-3" y="-60" width="6" height="40" fill="url(#lamp-bracket)" rx="2" />
          <circle cx="0" cy="-20" r="7" fill="#2D3037" stroke="#686D76" strokeWidth="2" />

          {/* U-Yoke Mounting Fork */}
          <path
            d="M -18 -20 L -18 0 A 18 18 0 0 0 18 0 L 18 -20"
            fill="none"
            stroke="url(#lamp-bracket)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Lamp Cylinder Barrel (Apple Studio Anodized Titanium) */}
          <rect
            x="-16"
            y="-14"
            width="32"
            height="36"
            rx="5"
            fill="url(#lamp-body-left)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
          />

          {/* Rear Heatsink Fins */}
          <line x1="-13" y1="-10" x2="13" y2="-10" stroke="#1A1C20" strokeWidth="2" />
          <line x1="-13" y1="-6" x2="13" y2="-6" stroke="#1A1C20" strokeWidth="2" />
          <line x1="-13" y1="-2" x2="13" y2="-2" stroke="#1A1C20" strokeWidth="2" />

          {/* Front Beveled Lens Snout */}
          <polygon
            points="-18,22 18,22 15,28 -15,28"
            fill="#1E2024"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />

          {/* Optical Glass Fresnel Lens Rim */}
          <ellipse
            cx="0"
            cy="27"
            rx="15"
            ry="4"
            fill="#FFFFFF"
            stroke="#FFA04D"
            strokeWidth="1.5"
            className="dark:stroke-[#00F2FE]"
          />

          {/* Intense Center White-Hot Emitter */}
          <ellipse cx="0" cy="27" rx="9" ry="2.5" fill="#FFFFFF" filter="url(#lens-glow)" />

          {/* Lens Flare Aura */}
          <circle
            cx="0"
            cy="27"
            r="16"
            fill="#FFB03A"
            className="dark:fill-[#7053FF]"
            opacity="0.5"
            filter="url(#lens-glow)"
          />
        </g>

        {/* ---------- RIGHT PROJECTOR LAMP (Centered at 840, 100, Angled -49.6deg) ---------- */}
        <g transform="translate(840, 100) rotate(-49.6)">
          {/* Ceiling Drop Rod & Swivel Mount */}
          <rect x="-3" y="-60" width="6" height="40" fill="url(#lamp-bracket)" rx="2" />
          <circle cx="0" cy="-20" r="7" fill="#2D3037" stroke="#686D76" strokeWidth="2" />

          {/* U-Yoke Mounting Fork */}
          <path
            d="M -18 -20 L -18 0 A 18 18 0 0 0 18 0 L 18 -20"
            fill="none"
            stroke="url(#lamp-bracket)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Lamp Cylinder Barrel */}
          <rect
            x="-16"
            y="-14"
            width="32"
            height="36"
            rx="5"
            fill="url(#lamp-body-right)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
          />

          {/* Rear Heatsink Fins */}
          <line x1="-13" y1="-10" x2="13" y2="-10" stroke="#1A1C20" strokeWidth="2" />
          <line x1="-13" y1="-6" x2="13" y2="-6" stroke="#1A1C20" strokeWidth="2" />
          <line x1="-13" y1="-2" x2="13" y2="-2" stroke="#1A1C20" strokeWidth="2" />

          {/* Front Beveled Lens Snout */}
          <polygon
            points="-18,22 18,22 15,28 -15,28"
            fill="#1E2024"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />

          {/* Optical Glass Fresnel Lens Rim */}
          <ellipse
            cx="0"
            cy="27"
            rx="15"
            ry="4"
            fill="#FFFFFF"
            stroke="#FFA04D"
            strokeWidth="1.5"
            className="dark:stroke-[#00F2FE]"
          />

          {/* Intense Center White-Hot Emitter */}
          <ellipse cx="0" cy="27" rx="9" ry="2.5" fill="#FFFFFF" filter="url(#lens-glow)" />

          {/* Lens Flare Aura */}
          <circle
            cx="0"
            cy="27"
            r="16"
            fill="#FFB03A"
            className="dark:fill-[#00F2FE]"
            opacity="0.5"
            filter="url(#lens-glow)"
          />
        </g>
      </svg>
    </div>
  );
}
