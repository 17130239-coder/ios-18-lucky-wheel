'use client';

import React from 'react';

interface PointerNeedleProps {
  deflectionAngle?: number;
  needleRef?: React.RefObject<HTMLDivElement | null>;
}

export const PointerNeedle = React.memo(function PointerNeedle({
  deflectionAngle = 0,
  needleRef,
}: PointerNeedleProps) {
  return (
    <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none drop-shadow-[0_8px_16px_rgba(255,107,0,0.45)]">
      <div
        ref={needleRef}
        className="origin-top will-change-transform"
        style={{
          transform: `rotate(${deflectionAngle}deg)`,
          transition: deflectionAngle === 0 ? 'transform 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 25ms ease-out',
        }}
      >
        <svg
          width="44"
          height="64"
          viewBox="0 0 44 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="needle-gradient"
              x1="22"
              y1="0"
              x2="22"
              y2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FF9E44" />
              <stop offset="80%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#CC4E00" />
            </linearGradient>
          </defs>

          {/* Needle Arrow Blade */}
          <path
            d="M22 62L8 22C3 11 11 1 22 1C33 1 41 11 36 22L22 62Z"
            fill="url(#needle-gradient)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          {/* Center Pivot Bezel */}
          <circle
            cx="22"
            cy="18"
            r="8"
            fill="#FFFFFF"
            stroke="#FFE7D6"
            strokeWidth="2"
          />
          <circle cx="22" cy="18" r="4" fill="#FF6B00" />
        </svg>
      </div>
    </div>
  );
});
