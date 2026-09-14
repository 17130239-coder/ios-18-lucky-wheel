'use client';

import React, { useMemo } from 'react';
import { PrizeItem } from '@/types/wheel';
import { getSectorPath } from '@/utils/geometry';
import { TECH_ICONS } from '@/constants/techIcons';

interface WheelSvgProps {
  prizes: PrizeItem[];
  rotation: number;
}

export function WheelSvg({ prizes, rotation }: WheelSvgProps) {
  const cx = 300;
  const cy = 300;
  const radius = 280;
  const count = prizes.length;
  const sliceAngle = 360 / count;

  // Precompute decorative rim bulbs
  const rimBulbs = useMemo(() => {
    const bulbs = [];
    const bulbCount = 30;
    for (let i = 0; i < bulbCount; i++) {
      const angle = ((i * 360) / bulbCount - 90) * (Math.PI / 180);
      const bx = cx + (radius - 7) * Math.cos(angle);
      const by = cy + (radius - 7) * Math.sin(angle);
      bulbs.push({ id: i, bx, by });
    }
    return bulbs;
  }, [cx, cy, radius]);

  return (
    <svg
      id="wheel-svg"
      viewBox="0 0 600 600"
      className="w-full h-full transform will-change-transform"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Center Hub Radial Gradient */}
        <radialGradient id="center-hub-grad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFA459" />
          <stop offset="45%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#E05300" />
        </radialGradient>

        {/* Shadow for prize icon circle badges */}
        <filter id="badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.22"
          />
        </filter>

        {/* Text Drop Shadow */}
        <filter id="label-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity="0.55"
          />
        </filter>
      </defs>

      {/* Rotating Wheel Group */}
      <g
        id="wheel-group"
        style={{
          transformOrigin: '300px 300px',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {prizes.map((item, index) => {
          const startAngle = index * sliceAngle;
          const endAngle = startAngle + sliceAngle;
          const midAngle = startAngle + sliceAngle / 2;

          // Metal pins at slice boundary
          const pinAngle = ((startAngle - 90) * Math.PI) / 180;
          const px = cx + 274 * Math.cos(pinAngle);
          const py = cy + 274 * Math.sin(pinAngle);

          const badgeY = cy - 205; // 95
          const textY = cy - 145; // 155

          const iconColor =
            item.color.toLowerCase() === '#ffffff' ? '#1E293B' : item.color;

          return (
            <React.Fragment key={item.id || index}>
              {/* Sector Wedge */}
              <path
                d={getSectorPath(cx, cy, radius, startAngle, endAngle)}
                fill={item.color}
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Item group rotated to midAngle */}
              <g transform={`rotate(${midAngle} ${cx} ${cy})`}>
                {/* Prize Icon Circular Badge */}
                <circle
                  cx={cx}
                  cy={badgeY}
                  r={23}
                  fill="#FFFFFF"
                  filter="url(#badge-shadow)"
                />
                <circle
                  cx={cx}
                  cy={badgeY}
                  r={21}
                  fill="none"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1"
                />

                {/* SVG Icon centered in 22x22 frame */}
                <g
                  transform={`translate(${cx - 11}, ${badgeY - 11})`}
                  fill={iconColor}
                >
                  {TECH_ICONS[item.icon] || TECH_ICONS.gift}
                </g>

                {/* 2-line clean typography */}
                <text
                  x={cx}
                  y={textY}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="font-sans select-none"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="0.3"
                  filter="url(#label-shadow)"
                >
                  <tspan x={cx} dy="-2">
                    {item.line1}
                  </tspan>
                  <tspan x={cx} dy="14" fontWeight="800">
                    {item.line2}
                  </tspan>
                </text>
              </g>

              {/* Precision Rivet Pin at perimeter between sectors */}
              <circle
                cx={px}
                cy={py + 1}
                r={4.5}
                fill="rgba(0,0,0,0.25)"
                pointerEvents="none"
              />
              <circle
                cx={px}
                cy={py}
                r={4}
                fill="#FFFFFF"
                stroke="#E29A3B"
                strokeWidth="1.5"
                pointerEvents="none"
              />
              <circle
                cx={px}
                cy={py}
                r={1.8}
                fill="#F59E0B"
                pointerEvents="none"
              />
            </React.Fragment>
          );
        })}
      </g>

      {/* Outer Decorative Bulbs on the Bezel Frame */}
      <g id="rim-bulbs" pointerEvents="none">
        {rimBulbs.map((b) => (
          <circle
            key={b.id}
            cx={b.bx}
            cy={b.by}
            r={2.5}
            fill="#FFFFFF"
            stroke="rgba(255, 107, 0, 0.5)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Polished Outer Rim Bezel Strokes */}
      <circle
        cx="300"
        cy="300"
        r="280"
        fill="none"
        pointerEvents="none"
        stroke="#FFFFFF"
        strokeWidth="6"
      />
      <circle
        cx="300"
        cy="300"
        r="276"
        fill="none"
        pointerEvents="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
