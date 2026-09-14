'use client';

import React from 'react';

interface ConfettiCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function ConfettiCanvas({ canvasRef }: ConfettiCanvasProps) {
  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
}
