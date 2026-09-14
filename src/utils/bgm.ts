/**
 * Procedural Chill Background Music (BGM) Engine for iOS 18 Lucky Wheel.
 * 
 * High-Fidelity Synthesizer featuring:
 * - 100% Pure Native Web Audio API (0KB audio files, runs completely offline).
 * - "Nhộn nhịp & Nhẹ nhàng" (Lively, rhythmic, foot-tapping, yet gentle and deeply relaxing).
 * - Full Acoustic Drum Kit: Warm round kick, soft finger snap/rimshot, delicate swing hi-hat/shaker.
 * - Dynamic Polyphonic Instruments: Warm Rhodes electric piano, walking groovy bass, dancing kalimba/marimba lead.
 * - Crisp studio mastering EQ (open high frequencies, punchy low-end, zero muddiness).
 * - Lookahead drift-free audio scheduler (W3C standard).
 * - Studio Auto-Ducking: Smoothly ducks 65% when the wheel is spinning so wheel SFX shine.
 */

export type BgmStyle = 'lofi' | 'ambient' | 'lounge';

export interface BgmConfig {
  enabled: boolean;
  style: BgmStyle;
  volume: number;      // 0.05 to 1.0 (default 0.60)
  autoDuck: boolean;   // Duck volume when wheel is spinning
}

interface NoteEvent {
  timeOffset: number; // in beats (0.0 to 4.0)
  freq: number;
  duration?: number;
  velocity?: number;
}

interface MoodBar {
  chord: number[];        // Polyphonic chord frequencies
  chordHits: number[];    // Beat offsets where chord is struck (e.g. [0, 1.5, 2.5])
  bassNotes: NoteEvent[]; // Bass line notes
  leadNotes?: NoteEvent[];// Kalimba / Marimba melodic lead
  kickBeats: number[];    // Kick drum beat offsets
  snareBeats: number[];   // Snap / Rimshot beat offsets
  hatBeats: number[];     // Hi-hat / Shaker beat offsets
}

interface MoodDefinition {
  name: string;
  desc: string;
  bpm: number;
  bars: MoodBar[];
}

// Standard Equal Temperament Frequencies
const N = {
  F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, B2: 123.47, C2: 65.41, D2: 73.42, E2: 82.41,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

const BGM_MOODS: Record<BgmStyle, MoodDefinition> = {
  // 1. LO-FI BOUNCY CHILL (84 BPM) - Royal Road chord progression: Fmaj7 -> G6 -> Em7 -> Am7
  lofi: {
    name: 'Lo-Fi Bouncy Chill',
    desc: 'Nhịp trống êm ái, piano điện nảy nhịp & kalimba trong trẻo (Khuyên dùng)',
    bpm: 84,
    bars: [
      // Bar 1: Fmaj7
      {
        chord: [N.F3, N.A3, N.C4, N.E4],
        chordHits: [0, 1.5, 2.75],
        bassNotes: [
          { timeOffset: 0, freq: N.F2, duration: 1.2 },
          { timeOffset: 1.5, freq: N.C3, duration: 0.8 },
          { timeOffset: 2.5, freq: N.F2, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.E5, duration: 0.4 },
          { timeOffset: 1.0, freq: N.G5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.A5, duration: 0.6 },
          { timeOffset: 3.0, freq: N.G5, duration: 0.5 },
        ],
        kickBeats: [0, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 2: G6 (or G/F)
      {
        chord: [N.G3, N.B3, N.D4, N.E4],
        chordHits: [0, 1.5, 2.75],
        bassNotes: [
          { timeOffset: 0, freq: N.G2, duration: 1.2 },
          { timeOffset: 1.5, freq: N.D3, duration: 0.8 },
          { timeOffset: 2.5, freq: N.G2, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.B5, duration: 0.4 },
          { timeOffset: 1.25, freq: N.G5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.E5, duration: 0.5 },
          { timeOffset: 3.25, freq: N.D5, duration: 0.4 },
        ],
        kickBeats: [0, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 3: Em7
      {
        chord: [N.E3, N.G3, N.B3, N.D4],
        chordHits: [0, 1.5, 2.75],
        bassNotes: [
          { timeOffset: 0, freq: N.E2, duration: 1.2 },
          { timeOffset: 1.5, freq: N.B2, duration: 0.8 },
          { timeOffset: 2.5, freq: N.E2, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.G5, duration: 0.5 },
          { timeOffset: 1.5, freq: N.E5, duration: 0.4 },
          { timeOffset: 2.5, freq: N.D5, duration: 0.5 },
        ],
        kickBeats: [0, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 4: Am7
      {
        chord: [N.A3, N.C4, N.E4, N.G4],
        chordHits: [0, 1.5, 2.75],
        bassNotes: [
          { timeOffset: 0, freq: N.A2, duration: 1.2 },
          { timeOffset: 1.5, freq: N.E3, duration: 0.8 },
          { timeOffset: 2.5, freq: N.A2, duration: 0.7 },
          { timeOffset: 3.5, freq: N.C3, duration: 0.4 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.C5, duration: 0.4 },
          { timeOffset: 1.25, freq: N.D5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.E5, duration: 0.8 },
        ],
        kickBeats: [0, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
    ],
  },

  // 2. TROPICAL SUNSET CHILL (88 BPM) - Upbeat Marimba, sunny island chords
  ambient: {
    name: 'Tropical Sunset Chill',
    desc: 'Mộc cầm Marimba rộn ràng, giai điệu tươi vui đón nắng hè',
    bpm: 88,
    bars: [
      // Bar 1: Cmaj7
      {
        chord: [N.C4, N.E4, N.G4, N.B4],
        chordHits: [0, 1.75, 2.5],
        bassNotes: [
          { timeOffset: 0, freq: N.C2, duration: 1.0 },
          { timeOffset: 2.0, freq: N.G2, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0, freq: N.E5, duration: 0.3 },
          { timeOffset: 0.5, freq: N.G5, duration: 0.3 },
          { timeOffset: 1.25, freq: N.C6, duration: 0.4 },
          { timeOffset: 2.0, freq: N.B5, duration: 0.3 },
          { timeOffset: 2.5, freq: N.G5, duration: 0.4 },
        ],
        kickBeats: [0, 1.75, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 2: Am9
      {
        chord: [N.A3, N.C4, N.E4, N.B4],
        chordHits: [0, 1.75, 2.5],
        bassNotes: [
          { timeOffset: 0, freq: N.A2, duration: 1.0 },
          { timeOffset: 2.0, freq: N.E2, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.A5, duration: 0.3 },
          { timeOffset: 1.0, freq: N.B5, duration: 0.3 },
          { timeOffset: 2.0, freq: N.A5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.E5, duration: 0.5 },
        ],
        kickBeats: [0, 1.75, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 3: Fmaj7
      {
        chord: [N.F3, N.A3, N.C4, N.E4],
        chordHits: [0, 1.75, 2.5],
        bassNotes: [
          { timeOffset: 0, freq: N.F2, duration: 1.0 },
          { timeOffset: 2.0, freq: N.C3, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0, freq: N.A5, duration: 0.3 },
          { timeOffset: 0.75, freq: N.C6, duration: 0.3 },
          { timeOffset: 1.5, freq: N.A5, duration: 0.3 },
          { timeOffset: 2.5, freq: N.F5, duration: 0.5 },
        ],
        kickBeats: [0, 1.75, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 4: G6/9
      {
        chord: [N.G3, N.B3, N.D4, N.A4],
        chordHits: [0, 1.75, 2.5],
        bassNotes: [
          { timeOffset: 0, freq: N.G2, duration: 1.0 },
          { timeOffset: 2.0, freq: N.D3, duration: 1.0 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.G5, duration: 0.3 },
          { timeOffset: 1.25, freq: N.A5, duration: 0.3 },
          { timeOffset: 2.0, freq: N.B5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.G5, duration: 0.6 },
        ],
        kickBeats: [0, 1.75, 2.5],
        snareBeats: [1, 3],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
    ],
  },

  // 3. BOSSA NOVA CAFE (92 BPM) - Syncopated Brazilian groove, sweet jazz chords
  lounge: {
    name: 'Bossa Nova Cafe',
    desc: 'Hợp âm Jazz ngọt ngào, nhịp gõ gỗ du dương như ngồi quán cafe',
    bpm: 92,
    bars: [
      // Bar 1: Dm9
      {
        chord: [N.F3, N.A3, N.C4, N.E4],
        chordHits: [0, 1.5, 2.5, 3.5],
        bassNotes: [
          { timeOffset: 0, freq: N.D2, duration: 0.8 },
          { timeOffset: 2.0, freq: N.A2, duration: 0.8 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.F5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.E5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.D5, duration: 0.5 },
        ],
        kickBeats: [0, 2.0, 2.75],
        snareBeats: [1.5, 3.0],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 2: G13
      {
        chord: [N.F3, N.B3, N.E4, N.A4],
        chordHits: [0, 1.5, 2.5, 3.5],
        bassNotes: [
          { timeOffset: 0, freq: N.G2, duration: 0.8 },
          { timeOffset: 2.0, freq: N.D3, duration: 0.8 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.E5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.D5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.B4, duration: 0.5 },
        ],
        kickBeats: [0, 2.0, 2.75],
        snareBeats: [1.5, 3.0],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 3: Cmaj9
      {
        chord: [N.E3, N.G3, N.B3, N.D4],
        chordHits: [0, 1.5, 2.5, 3.5],
        bassNotes: [
          { timeOffset: 0, freq: N.C2, duration: 0.8 },
          { timeOffset: 2.0, freq: N.G2, duration: 0.8 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.D5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.C5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.G4, duration: 0.5 },
        ],
        kickBeats: [0, 2.0, 2.75],
        snareBeats: [1.5, 3.0],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
      // Bar 4: A7alt
      {
        chord: [N.G3, N.C4, N.F4, N.A4],
        chordHits: [0, 1.5, 2.5, 3.5],
        bassNotes: [
          { timeOffset: 0, freq: N.A2, duration: 0.8 },
          { timeOffset: 2.0, freq: N.E2, duration: 0.8 },
        ],
        leadNotes: [
          { timeOffset: 0.5, freq: N.F5, duration: 0.4 },
          { timeOffset: 2.0, freq: N.E5, duration: 0.4 },
          { timeOffset: 3.0, freq: N.C5, duration: 0.5 },
        ],
        kickBeats: [0, 2.0, 2.75],
        snareBeats: [1.5, 3.0],
        hatBeats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
      },
    ],
  },
};

export class ChillBgmSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private style: BgmStyle = 'lofi';
  private masterGain: GainNode | null = null;
  private eqLow: BiquadFilterNode | null = null;
  private eqHigh: BiquadFilterNode | null = null;

  // Shared noise buffer for drums
  private noiseBuffer: AudioBuffer | null = null;

  private userVolume: number = 0.60;
  private isMuted: boolean = false;
  private isDucked: boolean = false;

  private timerId: ReturnType<typeof setInterval> | null = null;
  private nextBarTime: number = 0;
  private currentBarIndex: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private setupAudioGraph(ctx: AudioContext) {
    if (this.masterGain) return;

    // Highpass filter at 28Hz to clean up sub rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(28, ctx.currentTime);

    // Warm Low Shelf: +1.5dB boost at 100Hz for warm, cozy body
    this.eqLow = ctx.createBiquadFilter();
    this.eqLow.type = 'lowshelf';
    this.eqLow.frequency.setValueAtTime(100, ctx.currentTime);
    this.eqLow.gain.setValueAtTime(1.5, ctx.currentTime);

    // Smooth High Shelf: crisp up to 7500Hz with gentle roll-off at the very top
    this.eqHigh = ctx.createBiquadFilter();
    this.eqHigh.type = 'highshelf';
    this.eqHigh.frequency.setValueAtTime(7500, ctx.currentTime);
    this.eqHigh.gain.setValueAtTime(-0.8, ctx.currentTime);

    // Master Gain
    this.masterGain = ctx.createGain();
    const effectiveVol = this.isMuted ? 0.0001 : this.userVolume * 0.72;
    this.masterGain.gain.setValueAtTime(effectiveVol, ctx.currentTime);

    // Graph wiring: Sources -> highpass -> eqLow -> eqHigh -> masterGain -> destination
    highpass.connect(this.eqLow);
    this.eqLow.connect(this.eqHigh);
    this.eqHigh.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    // Create 1-second white noise buffer for crisp percussions
    this.createNoiseBuffer(ctx);
  }

  private createNoiseBuffer(ctx: AudioContext) {
    if (this.noiseBuffer) return;
    const length = ctx.sampleRate; // 1 second
    this.noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  public start(style?: BgmStyle) {
    const ctx = this.getContext();
    if (!ctx) return;

    if (style) {
      this.style = style;
    }

    this.setupAudioGraph(ctx);

    if (this.isPlaying) return;
    this.isPlaying = true;

    this.currentBarIndex = 0;
    this.nextBarTime = ctx.currentTime + 0.05;

    this.updateMasterVolume();

    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => this.scheduler(), 35);
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    }
  }

  public setStyle(newStyle: BgmStyle) {
    if (this.style === newStyle) return;
    this.style = newStyle;
    this.currentBarIndex = 0;
    if (this.ctx) {
      this.nextBarTime = this.ctx.currentTime + 0.1;
    }
  }

  public setVolume(vol: number) {
    this.userVolume = Math.max(0.05, Math.min(1.0, vol));
    this.updateMasterVolume();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.updateMasterVolume();
  }

  public duck(isDucked: boolean) {
    this.isDucked = isDucked;
    this.updateMasterVolume();
  }

  private updateMasterVolume() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);

    let target = this.userVolume * 0.72;
    if (this.isMuted || !this.isPlaying) {
      target = 0.0001;
    } else if (this.isDucked) {
      // Duck down 65% when wheel is spinning so wheel click/whistle shine
      target = target * 0.35;
    }

    this.masterGain.gain.setTargetAtTime(target, now, 0.12);
  }

  private scheduler() {
    if (!this.ctx || !this.isPlaying) return;

    const mood = BGM_MOODS[this.style] || BGM_MOODS.lofi;
    const secondsPerBeat = 60.0 / mood.bpm;
    const secondsPerBar = secondsPerBeat * 4.0;
    const lookahead = 0.25;

    while (this.nextBarTime < this.ctx.currentTime + lookahead) {
      this.scheduleBar(this.nextBarTime, mood, this.currentBarIndex);
      this.nextBarTime += secondsPerBar;
      this.currentBarIndex = (this.currentBarIndex + 1) % mood.bars.length;
    }
  }

  private scheduleBar(barStartTime: number, mood: MoodDefinition, barIndex: number) {
    if (!this.ctx || !this.eqLow) return;
    const ctx = this.ctx;
    const bar = mood.bars[barIndex];
    const secondsPerBeat = 60.0 / mood.bpm;

    // 1. Kick Drum
    bar.kickBeats.forEach((beat) => {
      this.scheduleKick(ctx, barStartTime + beat * secondsPerBeat);
    });

    // 2. Snare / Rimshot / Finger Snap
    bar.snareBeats.forEach((beat) => {
      this.scheduleSnare(ctx, barStartTime + beat * secondsPerBeat);
    });

    // 3. Hi-Hats / Shakers with gentle swing on offbeats
    bar.hatBeats.forEach((beat, idx) => {
      const isOffbeat = idx % 2 === 1;
      const swingDelay = isOffbeat ? 0.02 : 0;
      this.scheduleHiHat(ctx, barStartTime + beat * secondsPerBeat + swingDelay, isOffbeat);
    });

    // 4. Bass Line (Walking / Syncopated)
    bar.bassNotes.forEach((bn) => {
      this.scheduleBass(
        ctx,
        bn.freq,
        barStartTime + bn.timeOffset * secondsPerBeat,
        (bn.duration || 1.0) * secondsPerBeat
      );
    });

    // 5. Electric Piano Chords (Rhodes)
    bar.chordHits.forEach((beat) => {
      const chordTime = barStartTime + beat * secondsPerBeat;
      this.scheduleRhodesChord(ctx, bar.chord, chordTime, secondsPerBeat * 1.15);
    });

    // 6. Melodic Kalimba / Marimba Lead
    if (bar.leadNotes) {
      bar.leadNotes.forEach((ln) => {
        this.scheduleKalimbaNote(
          ctx,
          ln.freq,
          barStartTime + ln.timeOffset * secondsPerBeat,
          (ln.duration || 0.4) * secondsPerBeat
        );
      });
    }
  }

  /* ==========================================================================
     PERCUSSION INSTRUMENTS (Native Web Audio Synthesis)
     ========================================================================== */

  // Warm Acoustic Lo-Fi Kick Drum
  private scheduleKick(ctx: AudioContext, time: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, time);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.08);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      gain.connect(this.eqLow);

      osc.start(time);
      osc.stop(time + 0.13);
    } catch {
      // Ignore
    }
  }

  // Soft Finger Snap / Wooden Rimshot
  private scheduleSnare(ctx: AudioContext, time: number) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      // Noise burst component
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1600, time);
      noiseFilter.Q.setValueAtTime(1.8, time);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.eqLow);

      noise.start(time);
      noise.stop(time + 0.1);

      // Subtle wooden body 'thud'
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(440, time);
      click.frequency.exponentialRampToValueAtTime(180, time + 0.035);

      clickGain.gain.setValueAtTime(0.12, time);
      clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

      click.connect(clickGain);
      clickGain.connect(this.eqLow);

      click.start(time);
      click.stop(time + 0.045);
    } catch {
      // Ignore
    }
  }

  // Crisp, Delicate Swing Hi-Hat / Shaker
  private scheduleHiHat(ctx: AudioContext, time: number, isOffbeat: boolean) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(isOffbeat ? 7800 : 7000, time);

      const gain = ctx.createGain();
      const peakVol = isOffbeat ? 0.045 : 0.085;
      gain.gain.setValueAtTime(peakVol, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.eqLow);

      noise.start(time);
      noise.stop(time + 0.04);
    } catch {
      // Ignore
    }
  }

  /* ==========================================================================
     TONAL INSTRUMENTS (Bass, Rhodes Piano, Kalimba)
     ========================================================================== */

  // Warm, Groovy Bass Note
  private scheduleBass(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, time);
      filter.frequency.exponentialRampToValueAtTime(220, time + duration * 0.7);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.24, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.12, time + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.eqLow);

      osc.start(time);
      osc.stop(time + duration + 0.02);
    } catch {
      // Ignore
    }
  }

  // Lush Electric Piano Chord (Rhodes)
  private scheduleRhodesChord(ctx: AudioContext, freqs: number[], time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      freqs.forEach((freq, idx) => {
        const strumDelay = idx * 0.018; // 18ms human micro-strum
        const noteTime = time + strumDelay;

        // Fundamental
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, noteTime);

        // Warm harmonic chime
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2.002, noteTime); // subtle detuned overtone

        // Gentle lowpass filter for silky smooth piano warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2800, noteTime);
        filter.frequency.exponentialRampToValueAtTime(1400, noteTime + duration * 0.8);

        // Envelope
        const peak = 0.075;
        gain1.gain.setValueAtTime(0.001, noteTime);
        gain1.gain.linearRampToValueAtTime(peak, noteTime + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

        gain2.gain.setValueAtTime(0.001, noteTime);
        gain2.gain.linearRampToValueAtTime(peak * 0.35, noteTime + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.001, noteTime + duration * 0.7);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(filter);
        gain2.connect(filter);
        filter.connect(this.eqLow!);

        osc1.start(noteTime);
        osc2.start(noteTime);
        osc1.stop(noteTime + duration + 0.05);
        osc2.stop(noteTime + duration + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  // Sweet Crystal Kalimba / Marimba Melodic Pluck
  private scheduleKalimbaNote(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Overtone
      const overtone = ctx.createOscillator();
      const otGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2.01, time);

      const noteDuration = Math.max(0.35, duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.09, time + 0.008); // Instant bell ping
      gain.gain.exponentialRampToValueAtTime(0.001, time + noteDuration);

      otGain.gain.setValueAtTime(0.001, time);
      otGain.gain.linearRampToValueAtTime(0.04, time + 0.008);
      otGain.gain.exponentialRampToValueAtTime(0.001, time + noteDuration * 0.5);

      osc.connect(gain);
      overtone.connect(otGain);
      gain.connect(this.eqLow);
      otGain.connect(this.eqLow);

      osc.start(time);
      overtone.start(time);
      osc.stop(time + noteDuration + 0.05);
      overtone.stop(time + noteDuration + 0.05);
    } catch {
      // Ignore
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getStyle(): BgmStyle {
    return this.style;
  }

  public getVolume(): number {
    return this.userVolume;
  }
}

export const chillBgm = new ChillBgmSynthesizer();
