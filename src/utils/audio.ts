/**
 * Web Audio API procedural sound synthesizer for iOS 18 Lucky Wheel.
 * Enhanced with dynamic mechanical frequency modulation & tactile harmonics.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Dynamic needle tick feedback based on current wheel velocity.
   * @param velocityRatio Normalized velocity from 0 (crawling) to 1 (max speed)
   */
  public playTick(velocityRatio: number = 0.5) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const clampedVel = Math.max(0, Math.min(1, velocityRatio));

      // 1. Primary Escapement Sine Oscillator:
      // High speed: ~1100Hz (light, crisp, rapid tick)
      // Low speed: ~620Hz (deep, authoritative mechanical click)
      const primaryOsc = ctx.createOscillator();
      const primaryGain = ctx.createGain();

      primaryOsc.type = 'sine';
      const freq = 620 + 480 * clampedVel;
      primaryOsc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Duration: 15ms at high speed to prevent muddy overlap, 32ms at low speed
      const duration = 0.015 + 0.018 * (1 - clampedVel);

      // Gain: softer when rapid, punchier when isolated
      const peakGain = 0.025 + 0.035 * (1 - clampedVel);
      primaryGain.gain.setValueAtTime(peakGain, ctx.currentTime);
      primaryGain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
      );

      primaryOsc.connect(primaryGain);
      primaryGain.connect(ctx.destination);

      primaryOsc.start();
      primaryOsc.stop(ctx.currentTime + duration + 0.002);

      // 2. Secondary Sub-Harmonic Thud for realistic tactile punch when wheel crawls
      if (clampedVel < 0.4) {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();

        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(200, ctx.currentTime);

        const subStrength = 0.045 * (1 - clampedVel / 0.4);
        subGain.gain.setValueAtTime(subStrength, ctx.currentTime);
        subGain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + 0.028
        );

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);

        subOsc.start();
        subOsc.stop(ctx.currentTime + 0.03);
      }
    } catch {
      // Ignore synthesis errors
    }
  }

  /**
   * Celebratory ascending fanfare chord on winning a prize
   */
  public playWinFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const startTime = ctx.currentTime + i * 0.08;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * UI Click feedback
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    } catch {
      // Ignore audio errors
    }
  }
}

export const soundManager = new SoundSynthesizer();
