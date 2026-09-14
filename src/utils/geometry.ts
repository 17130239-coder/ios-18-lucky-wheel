/**
 * Converts degrees to radians with 0 degrees at 12 o'clock (pointing upward)
 */
export function degToRad(deg: number): number {
  return ((deg - 90) * Math.PI) / 180;
}

/**
 * Computes SVG path 'd' attribute for a sector wedge
 */
export function getSectorPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
): string {
  const startRad = degToRad(startDeg);
  const endRad = degToRad(endDeg);

  const startX = cx + r * Math.cos(startRad);
  const startY = cy + r * Math.sin(startRad);
  const endX = cx + r * Math.cos(endRad);
  const endY = cy + r * Math.sin(endRad);

  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY} Z`;
}

/**
 * Calculates which sector index is currently under the 12 o'clock needle pointer
 */
export function getActiveSectorIndex(currentRotation: number, count: number): number {
  if (count <= 0) return 0;
  const sliceAngle = 360 / count;
  let norm = (-currentRotation) % 360;
  if (norm < 0) norm += 360;
  return Math.floor(norm / sliceAngle) % count;
}

/**
 * iOS 18 Spring & Inertia Easing:
 * 1. Initial smooth quadratic acceleration (0 <= t < 0.12)
 * 2. Natural inertial drag deceleration (0.12 <= t < 0.88)
 * 3. Suspenseful approach with micro-rebound spring bounce (0.88 <= t <= 1.0)
 * Reaches exactly 1.0 at t = 1.0.
 */
export function iosSpringInertiaEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  let s: number;
  if (t < 0.12) {
    // Smooth quadratic acceleration
    const p = t / 0.12;
    s = 0.5 * p * p * 0.18;
  } else {
    // Deceleration curve
    const p = (t - 0.12) / 0.88;
    const decel = 1 - Math.pow(1 - p, 4.2);
    s = 0.09 + 0.91 * decel;
  }

  // Authentic iOS terminal spring overshoot & damped rebound
  let spring = 0;
  if (t > 0.88) {
    const st = (t - 0.88) / 0.12;
    spring = Math.sin(st * Math.PI) * Math.exp(-st * 2.8) * 0.0055;
  }

  return s + spring;
}

/**
 * Legacy quartic ease-out for fallback
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
