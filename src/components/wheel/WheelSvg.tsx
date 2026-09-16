'use client';

import React, { useMemo } from 'react';
import { PrizeItem } from '@/types/wheel';
import { getSectorPath } from '@/utils/geometry';
import { TECH_ICONS } from '@/constants/techIcons';

interface WheelSvgProps {
  prizes: PrizeItem[];
  rotation?: number;
  wheelGroupRef?: React.RefObject<SVGGElement | null>;
}

/**
 * Calculates adaptive font size and SVG textLength compression
 * to guarantee that text never overflows outside its slice wedge boundary.
 */
function getAdaptiveTextProps(
  text: string,
  baseFontSize: number,
  maxWidth: number,
  minFontSize: number = 7.0
): { fontSize: number; textLength?: number } {
  if (!text) return { fontSize: baseFontSize };

  // Average width factor for bold sans-serif characters (including Vietnamese accented characters)
  const charWidthRatio = 0.58;
  const estimatedWidth = text.length * baseFontSize * charWidthRatio;

  if (estimatedWidth <= maxWidth) {
    return { fontSize: baseFontSize };
  }

  // Scale down font size smoothly to fit
  const scaledFontSize = Math.max(
    minFontSize,
    Math.min(baseFontSize, Number((maxWidth / (text.length * charWidthRatio)).toFixed(1)))
  );

  const finalEstimatedWidth = text.length * scaledFontSize * charWidthRatio;

  // If even at minFontSize it would overflow maxWidth, apply SVG textLength compression
  if (finalEstimatedWidth > maxWidth) {
    return {
      fontSize: scaledFontSize,
      textLength: maxWidth,
    };
  }

  return { fontSize: scaledFontSize };
}

export const WheelSvg = React.memo(function WheelSvg({
  prizes,
  rotation = 0,
  wheelGroupRef,
}: WheelSvgProps) {
  const cx = 300;
  const cy = 300;
  const radius = 280;
  const count = prizes.length;
  const sliceAngle = 360 / count;

  // Proportional sizing based on prize count (adapts seamlessly from 2 to 16+ slices)
  const badgeRadius = count <= 6 ? 26 : count <= 10 ? 24 : count <= 13 ? 21 : 18.5;
  const badgeInnerRadius = badgeRadius - 2.5;
  const iconFrameOffset = count <= 10 ? 11 : count <= 13 ? 10 : 9;
  const iconScale = count <= 10 ? 1 : count <= 13 ? 0.9 : 0.82;
  const textFontSize = count <= 6 ? 12.5 : count <= 10 ? 11 : count <= 13 ? 10 : 9;

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
      </defs>

      {/* Rotating Wheel Group - Driven directly by wheelGroupRef on GPU compositor */}
      <g
        id="wheel-group"
        ref={wheelGroupRef}
        className="will-change-transform"
        style={{
          transformOrigin: '300px 300px',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {count === 0 ? (
          /* Empty State: All prizes won/eliminated */
          <g className="select-none pointer-events-none">
            <circle cx={cx} cy={cy} r={radius} fill="#1E293B" opacity="0.95" stroke="#FFFFFF" strokeWidth="2" />
            <g transform={`translate(${cx}, ${cy - 85})`}>
              <circle cx="0" cy="0" r="32" fill="rgba(255,107,0,0.2)" stroke="#FF6B00" strokeWidth="1.5" />
              <text textAnchor="middle" y="10" fontSize="28">🎁</text>
              <text textAnchor="middle" y="50" fill="#FFFFFF" fontSize="15" fontWeight="bold">
                ĐÃ HẾT PHẦN QUÀ!
              </text>
              <text textAnchor="middle" y="70" fill="#94A3B8" fontSize="11" fontWeight="medium">
                Bấm ĐẶT LẠI ở tâm để chơi lại
              </text>
            </g>
          </g>
        ) : count === 1 ? (
          /* Single Prize Remaining: Full Circle Sector */
          (() => {
            const item = prizes[0];
            const badgeY = cy - 180;
            const textY = cy - 120;
            const iconColor = item.color.toLowerCase() === '#ffffff' ? '#1E293B' : item.color;
            return (
              <g>
                <circle cx={cx} cy={cy} r={radius} fill={item.color} stroke="#FFFFFF" strokeWidth="2" />
                {/* Hardware-friendly procedural shadow circle (0ms GPU filter cost) */}
                <circle cx={cx} cy={badgeY + 2.5} r={28} fill="rgba(0,0,0,0.2)" pointerEvents="none" />
                <circle cx={cx} cy={badgeY} r={28} fill="#FFFFFF" stroke={item.color} strokeWidth="3" />
                <g
                  transform={`translate(${cx - 13}, ${badgeY - 13})`}
                  style={{ color: iconColor }}
                  stroke={iconColor}
                >
                  {TECH_ICONS[item.icon] || TECH_ICONS.gift}
                </g>
                {/* Text Shadow underlay */}
                <text
                  x={cx}
                  y={textY + 1.5}
                  textAnchor="middle"
                  fill="rgba(0,0,0,0.5)"
                  className="font-sans select-none pointer-events-none"
                  fontSize="15"
                  fontWeight="800"
                >
                  <tspan x={cx} dy="-2">{item.line1}</tspan>
                  <tspan x={cx} dy="18" fontWeight="900">{item.line2}</tspan>
                </text>
                <text
                  x={cx}
                  y={textY}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="font-sans select-none"
                  fontSize="15"
                  fontWeight="800"
                >
                  <tspan x={cx} dy="-2">{item.line1}</tspan>
                  <tspan x={cx} dy="18" fontWeight="900">{item.line2}</tspan>
                </text>
              </g>
            );
          })()
        ) : (
          prizes.map((item, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            const midAngle = startAngle + sliceAngle / 2;

            // Metal pins at slice boundary
            const pinAngle = ((startAngle - 90) * Math.PI) / 180;
            const px = cx + 274 * Math.cos(pinAngle);
            const py = cy + 274 * Math.sin(pinAngle);

            const badgeY = cy - 205; // 95
            const textY = cy - 145; // 155

            // Compute exact available chord width at text radius with safety margin from sector boundary
            const textRadius = cy - textY; // 145
            const rawChordWidth =
              count > 2
                ? 2 * textRadius * Math.sin(((sliceAngle / 2) * Math.PI) / 180)
                : 280;
            const maxTextWidth = Math.max(34, Math.floor(rawChordWidth - 10));

            const fit1 = getAdaptiveTextProps(item.line1, textFontSize, maxTextWidth);
            const fit2 = getAdaptiveTextProps(item.line2, textFontSize, maxTextWidth);
            const lineSpacing = Math.max(10, Math.round(Math.max(fit1.fontSize, fit2.fontSize) * 1.25));

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
                  {/* Procedural hardware-accelerated badge shadow (0ms GPU filter cost) */}
                  <circle
                    cx={cx}
                    cy={badgeY + 2}
                    r={badgeRadius}
                    fill="rgba(0,0,0,0.18)"
                    pointerEvents="none"
                  />
                  {/* Prize Icon Circular Badge with sector color ring */}
                  <circle
                    cx={cx}
                    cy={badgeY}
                    r={badgeRadius}
                    fill="#FFFFFF"
                    stroke={item.color}
                    strokeWidth="2.5"
                  />
                  <circle
                    cx={cx}
                    cy={badgeY}
                    r={badgeInnerRadius}
                    fill="none"
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="1"
                  />

                  {/* SVG Icon centered in dynamic frame */}
                  <g
                    transform={`translate(${cx - iconFrameOffset * iconScale}, ${badgeY - iconFrameOffset * iconScale}) scale(${iconScale})`}
                    style={{ color: iconColor }}
                    stroke={iconColor}
                  >
                    {TECH_ICONS[item.icon] || TECH_ICONS.gift}
                  </g>

                  {/* High-performance text shadow underlay */}
                  <text
                    x={cx}
                    y={textY + 1}
                    textAnchor="middle"
                    fill="rgba(0,0,0,0.45)"
                    className="font-sans select-none pointer-events-none"
                    letterSpacing="0.2"
                  >
                    <tspan
                      x={cx}
                      dy={item.line2 ? "-2" : "3"}
                      fontSize={fit1.fontSize}
                      fontWeight="700"
                      {...(fit1.textLength ? { textLength: fit1.textLength, lengthAdjust: "spacingAndGlyphs" } : {})}
                    >
                      {item.line1}
                    </tspan>
                    {item.line2 && (
                      <tspan
                        x={cx}
                        dy={lineSpacing}
                        fontSize={fit2.fontSize}
                        fontWeight="800"
                        {...(fit2.textLength ? { textLength: fit2.textLength, lengthAdjust: "spacingAndGlyphs" } : {})}
                      >
                        {item.line2}
                      </tspan>
                    )}
                  </text>
                  {/* 2-line clean typography */}
                  <text
                    x={cx}
                    y={textY}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    className="font-sans select-none"
                    letterSpacing="0.2"
                  >
                    <tspan
                      x={cx}
                      dy={item.line2 ? "-2" : "3"}
                      fontSize={fit1.fontSize}
                      fontWeight="700"
                      {...(fit1.textLength ? { textLength: fit1.textLength, lengthAdjust: "spacingAndGlyphs" } : {})}
                    >
                      {item.line1}
                    </tspan>
                    {item.line2 && (
                      <tspan
                        x={cx}
                        dy={lineSpacing}
                        fontSize={fit2.fontSize}
                        fontWeight="800"
                        {...(fit2.textLength ? { textLength: fit2.textLength, lengthAdjust: "spacingAndGlyphs" } : {})}
                      >
                        {item.line2}
                      </tspan>
                    )}
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
          })
        )}
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
});
