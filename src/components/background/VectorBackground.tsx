'use client';

import React from 'react';
import { BackgroundTheme } from '@/types/wheel';

interface VectorBackgroundProps {
  theme: BackgroundTheme;
  isDark: boolean;
}

export const VectorBackground: React.FC<VectorBackgroundProps> = ({ theme, isDark }) => {
  if (theme === 'default') {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700"
      aria-hidden="true"
    >
      {theme === 'forest' && <ForestTheme isDark={isDark} />}
      {theme === 'ocean' && <OceanTheme isDark={isDark} />}
      {theme === 'underwater' && <UnderwaterTheme isDark={isDark} />}
    </div>
  );
};

/* ==========================================================================
   1. FOREST & MOUNTAINS THEME (Núi Rừng & Rừng Thông Hùng Vĩ)
   ========================================================================== */
const ForestTheme: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Dynamic Sky Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-[#050d14] via-[#0b1f2d] to-[#122e3e]'
            : 'bg-gradient-to-b from-[#bde0fe] via-[#d0ebff] to-[#fef08a]/60'
        }`}
      />

      {/* Celestial body (Sun / Moon) */}
      <div
        className={`absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-2xl transition-opacity duration-700 ${
          isDark ? 'bg-indigo-300/15' : 'bg-amber-300/40'
        }`}
      />
      <div
        className={`absolute top-20 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full transition-colors duration-700 ${
          isDark ? 'bg-indigo-100/30 shadow-[0_0_50px_rgba(199,210,254,0.3)]' : 'bg-amber-100/80 shadow-[0_0_60px_rgba(251,191,36,0.5)]'
        }`}
      />

      {/* Distant Peaks Layer */}
      <svg
        className="absolute bottom-0 w-full h-[65%] object-cover opacity-80"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 450L180 280L340 380L540 210L720 330L920 180L1120 320L1300 240L1440 310V600H0Z"
          fill={isDark ? '#0c2232' : '#8ecae6'}
          fillOpacity={isDark ? 0.7 : 0.8}
        />
        {/* Mountain Highlights & Ridges */}
        <path
          d="M540 210L610 320L540 360L460 310Z"
          fill={isDark ? '#193f5a' : '#bde0fe'}
          fillOpacity={0.4}
        />
        <path
          d="M920 180L1000 300L930 330L850 290Z"
          fill={isDark ? '#1c4562' : '#bde0fe'}
          fillOpacity={0.4}
        />
      </svg>

      {/* Atmospheric Mist Layer */}
      <div className="absolute bottom-[20%] left-0 right-0 h-40 animate-mist-drift pointer-events-none">
        <svg
          className="w-[120%] h-full opacity-40"
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 100C300 40 600 160 900 100C1200 40 1500 140 1600 100V200H0Z"
            fill={isDark ? '#153a52' : '#ffffff'}
          />
        </svg>
      </div>

      {/* Mid Mountain Ridges */}
      <svg
        className="absolute bottom-0 w-full h-[48%] object-cover"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 380L140 260L320 340L490 220L670 320L840 200L1020 310L1210 210L1360 290L1440 260V500H0Z"
          fill={isDark ? '#071824' : '#2a6f97'}
          fillOpacity={isDark ? 0.85 : 0.75}
        />
      </svg>

      {/* Forefront Layer: Majestic Pine Forest Silhouettes */}
      <svg
        className="absolute bottom-0 w-full h-[32%] object-cover"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="forestGroundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#030c12' : '#012a4a'} stopOpacity="0.95" />
            <stop offset="100%" stopColor={isDark ? '#010508' : '#01192d'} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Dense pine trees pattern across bottom */}
        {/* Left cluster */}
        <polygon points="20,180 40,80 60,180" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="50,200 75,90 100,200" fill={isDark ? '#030d14' : '#012a4a'} />
        <polygon points="85,190 115,70 145,190" fill={isDark ? '#04111a' : '#013a63'} />
        <polygon points="130,220 160,110 190,220" fill={isDark ? '#02090e' : '#012a4a'} />
        <polygon points="175,200 205,85 235,200" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="220,230 250,120 280,230" fill={isDark ? '#030d14' : '#012a4a'} />

        {/* Center-left cluster */}
        <polygon points="320,240 350,140 380,240" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="370,220 405,100 440,220" fill={isDark ? '#030d14' : '#012a4a'} />
        <polygon points="430,250 460,150 490,250" fill={isDark ? '#041018' : '#013a63'} />

        {/* Center-right cluster */}
        <polygon points="950,250 985,130 1020,250" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="1010,230 1045,95 1080,230" fill={isDark ? '#030d14' : '#012a4a'} />
        <polygon points="1070,245 1105,135 1140,245" fill={isDark ? '#041018' : '#013a63'} />

        {/* Right cluster */}
        <polygon points="1180,210 1215,80 1250,210" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="1235,225 1270,105 1305,225" fill={isDark ? '#030d14' : '#012a4a'} />
        <polygon points="1290,195 1325,75 1360,195" fill={isDark ? '#041018' : '#013a63'} />
        <polygon points="1350,220 1385,90 1420,220" fill={isDark ? '#02090e' : '#012a4a'} />

        {/* Ground base */}
        <path
          d="M0 210C180 195 380 230 580 215C780 200 980 225 1180 210C1320 200 1400 215 1440 220V320H0Z"
          fill="url(#forestGroundGrad)"
        />
      </svg>
    </div>
  );
};

/* ==========================================================================
   2. OCEAN & COASTLINE THEME (Biển Cả & Những Con Sóng Bạt Ngàn)
   ========================================================================== */
const OceanTheme: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Sky & Horizon Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-[#020b14] via-[#051a2e] to-[#0a2e4c]'
            : 'bg-gradient-to-b from-[#ffe8d6] via-[#fed9b7] to-[#7dd3fc]'
        }`}
      />

      {/* Sun / Moon disk at ocean horizon */}
      <div
        className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 ${
          isDark ? 'bg-cyan-400/10' : 'bg-amber-400/40'
        }`}
      />
      <div
        className={`absolute top-[32%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full transition-colors duration-700 ${
          isDark
            ? 'bg-cyan-100/40 shadow-[0_0_60px_rgba(103,232,249,0.35)]'
            : 'bg-amber-200/90 shadow-[0_0_70px_rgba(245,158,11,0.6)]'
        }`}
      />

      {/* Distant Islands / Horizon Line */}
      <svg
        className="absolute top-[40%] w-full h-24 opacity-60"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 60C120 50 220 40 340 55C480 70 560 45 680 50C820 55 940 35 1100 52C1260 68 1380 48 1440 55V100H0Z"
          fill={isDark ? '#07243b' : '#0284c7'}
          fillOpacity={isDark ? 0.6 : 0.4}
        />
      </svg>

      {/* Horizon Water Sheen */}
      <div
        className={`absolute top-[44%] left-0 right-0 h-1 bg-gradient-to-r from-transparent ${
          isDark ? 'via-cyan-300/30' : 'via-amber-200/80'
        } to-transparent blur-[1px]`}
      />

      {/* Deep Ocean Back Wave (Layer 1) */}
      <div className="absolute bottom-0 w-full h-[52%] animate-wave-slow">
        <svg
          className="w-[105%] h-full -ml-[2%]"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 160C240 120 480 200 720 150C960 100 1200 180 1440 140V400H0Z"
            fill={isDark ? '#052238' : '#0369a1'}
            fillOpacity={isDark ? 0.75 : 0.65}
          />
        </svg>
      </div>

      {/* Mid Ocean Swell (Layer 2) */}
      <div className="absolute bottom-0 w-full h-[42%] animate-wave-fast">
        <svg
          className="w-[105%] h-full -ml-[2%]"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 130C280 180 520 90 800 140C1080 190 1320 110 1440 130V350H0Z"
            fill={isDark ? '#031728' : '#0284c7'}
            fillOpacity={isDark ? 0.85 : 0.75}
          />
          {/* Subtle crest foam line */}
          <path
            d="M0 130C280 180 520 90 800 140C1080 190 1320 110 1440 130"
            stroke={isDark ? '#38bdf8' : '#ffffff'}
            strokeWidth="2.5"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </div>

      {/* Foreground Ocean Wave (Layer 3) */}
      <div className="absolute bottom-0 w-full h-[28%]">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="oceanForeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#020e1a' : '#0369a1'} stopOpacity="0.95" />
              <stop offset="100%" stopColor={isDark ? '#010810' : '#0c4a6e'} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 110C240 70 500 130 760 90C1020 50 1260 120 1440 80V280H0Z"
            fill="url(#oceanForeGrad)"
          />
          <path
            d="M0 110C240 70 500 130 760 90C1020 50 1260 120 1440 80"
            stroke={isDark ? '#7dd3fc' : '#ffffff'}
            strokeWidth="3"
            strokeOpacity="0.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. UNDER THE SEA THEME (Dưới Đáy Đại Dương & San Hô Huyền Bí)
   ========================================================================== */
const UnderwaterTheme: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Deep Ocean Water Abyss Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-[#010814] via-[#021b33] via-[#03314f] to-[#011424]'
            : 'bg-gradient-to-b from-[#0e7490] via-[#06b6d4] via-[#22d3ee] to-[#0891b2]'
        }`}
      />

      {/* Surface Water Glint Line */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-cyan-300/30 to-transparent" />

      {/* God Rays / Volumetric Light Beams from Surface */}
      <div className="absolute inset-0 animate-caustics pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full opacity-35"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rayGrad1" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rayGrad2" x1="0.5" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="120,0 260,0 480,900 240,900" fill="url(#rayGrad1)" />
          <polygon points="520,0 680,0 980,900 760,900" fill="url(#rayGrad2)" />
          <polygon points="920,0 1060,0 1380,900 1180,900" fill="url(#rayGrad1)" />
        </svg>
      </div>

      {/* Rising Bioluminescent Ambient Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bubble 1 */}
        <div
          className="absolute left-[8%] bottom-[-50px] w-5 h-5 rounded-full border border-cyan-200/50 bg-cyan-300/20 shadow-[0_0_12px_rgba(103,232,249,0.5)] animate-bubble-mid"
          style={{ animationDelay: '0s' }}
        />
        {/* Bubble 2 */}
        <div
          className="absolute left-[18%] bottom-[-50px] w-3.5 h-3.5 rounded-full border border-cyan-200/40 bg-cyan-300/15 shadow-[0_0_8px_rgba(103,232,249,0.4)] animate-bubble-slow"
          style={{ animationDelay: '-4.2s' }}
        />
        {/* Bubble 3 */}
        <div
          className="absolute left-[31%] bottom-[-50px] w-6 h-6 rounded-full border border-cyan-100/60 bg-cyan-300/25 shadow-[0_0_14px_rgba(103,232,249,0.6)] animate-bubble-fast"
          style={{ animationDelay: '-2.1s' }}
        />
        {/* Bubble 4 */}
        <div
          className="absolute left-[45%] bottom-[-50px] w-4 h-4 rounded-full border border-cyan-200/40 bg-cyan-300/15 shadow-[0_0_10px_rgba(103,232,249,0.4)] animate-bubble-mid"
          style={{ animationDelay: '-6.5s' }}
        />
        {/* Bubble 5 */}
        <div
          className="absolute left-[63%] bottom-[-50px] w-7 h-7 rounded-full border border-cyan-100/70 bg-cyan-300/30 shadow-[0_0_16px_rgba(103,232,249,0.7)] animate-bubble-slow"
          style={{ animationDelay: '-1.5s' }}
        />
        {/* Bubble 6 */}
        <div
          className="absolute left-[78%] bottom-[-50px] w-4.5 h-4.5 rounded-full border border-cyan-200/50 bg-cyan-300/20 shadow-[0_0_10px_rgba(103,232,249,0.5)] animate-bubble-fast"
          style={{ animationDelay: '-5.2s' }}
        />
        {/* Bubble 7 */}
        <div
          className="absolute left-[89%] bottom-[-50px] w-3 h-3 rounded-full border border-cyan-200/40 bg-cyan-300/15 shadow-[0_0_8px_rgba(103,232,249,0.4)] animate-bubble-mid"
          style={{ animationDelay: '-8.0s' }}
        />
      </div>

      {/* Sea Floor & Coral Reef Silhouettes (Base layer) */}
      <svg
        className="absolute bottom-0 w-full h-[32%] object-cover"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="reefBaseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#020f1a' : '#083344'} stopOpacity="0.95" />
            <stop offset="100%" stopColor={isDark ? '#00070d' : '#041d27'} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Left Coral / Sea Anemone Fan */}
        <path
          d="M40 240C30 180 10 160 5 130C25 155 45 170 55 190C65 150 75 120 95 100C90 140 85 175 80 210C105 170 135 145 155 130C140 165 125 195 110 230Z"
          fill={isDark ? '#0c354e' : '#155e75'}
          fillOpacity={isDark ? 0.75 : 0.85}
        />
        <path
          d="M120 250C135 200 165 170 200 150C180 185 170 215 160 250Z"
          fill={isDark ? '#082538' : '#0e7490'}
        />

        {/* Kelp / Seaweed Blades (Center Left) */}
        <path
          d="M260 260C240 200 270 150 250 100C280 140 260 200 280 260Z"
          fill={isDark ? '#072b3a' : '#0f766e'}
          fillOpacity="0.6"
        />
        <path
          d="M290 270C320 220 290 170 330 110C315 160 340 210 320 270Z"
          fill={isDark ? '#06202c' : '#115e59'}
          fillOpacity="0.7"
        />

        {/* Right Coral Reef & Seaweed Cluster */}
        <path
          d="M1120 260C1100 210 1130 160 1115 120C1140 155 1125 205 1145 260Z"
          fill={isDark ? '#072b3a' : '#0f766e'}
          fillOpacity="0.6"
        />
        <path
          d="M1240 250C1220 180 1200 150 1190 110C1215 140 1235 170 1250 210C1270 160 1300 130 1330 105C1315 145 1300 180 1285 220C1320 180 1360 160 1410 140C1380 180 1350 215 1320 250Z"
          fill={isDark ? '#0c354e' : '#155e75'}
          fillOpacity={isDark ? 0.8 : 0.9}
        />

        {/* Undulating Sea Floor Trench */}
        <path
          d="M0 210C220 180 440 240 700 200C940 165 1180 225 1440 195V320H0Z"
          fill="url(#reefBaseGrad)"
        />
      </svg>
    </div>
  );
};
