/**
 * Procedural Chill Background Music (BGM) Engine for iOS 18 Lucky Wheel.
 * 
 * Features:
 * - 100% Native Web Audio API procedural synthesis (0KB audio files, runs completely offline).
 * - 3 Hand-crafted Chill Moods:
 *   1. Lo-Fi Cafe (64 BPM, warm Rhodes chords, analog tape warmth, vinyl crackle, gentle sub bass)
 *   2. Dreamy Ambient (54 BPM, floating celestial pads, crystal pentatonic chime drops)
 *   3. Night Lounge (70 BPM, velvet jazz 9th chords, walking acoustic upright bass)
 * - Lookahead drift-free audio scheduler (W3C specification standard).
 * - Studio-grade Auto-Ducking: Smoothly reduces BGM volume when the wheel is spinning so wheel sound effects shine.
 * - Non-intrusive, calming master volume with smooth crossfades between styles.
 */

export type BgmStyle = 'lofi' | 'ambient' | 'lounge';

export interface BgmConfig {
  enabled: boolean;
  style: BgmStyle;
  volume: number;      // 0.05 to 1.0 (default 0.35)
  autoDuck: boolean;    // Duck volume when wheel is spinning
}

interface ChordBar {
  bass: number;
  chord: number[];
  accent?: { offset: number; freq: number }[];
}

interface MoodDefinition {
  name: string;
  desc: string;
  bpm: number;
  bars: ChordBar[];
}

const BGM_MOODS: Record<BgmStyle, MoodDefinition> = {
  lofi: {
    name: 'Lo-Fi Cafe',
    desc: 'Piano điện ấm áp, đĩa than cổ điển thư thái',
    bpm: 64,
    bars: [
      // Fmaj7
      {
        bass: 87.31, // F2
        chord: [174.61, 220.0, 261.63, 329.63], // F3, A3, C4, E4
        accent: [{ offset: 2.2, freq: 392.0 }, { offset: 3.2, freq: 329.63 }], // G4, E4
      },
      // Am7
      {
        bass: 110.0, // A2
        chord: [164.81, 196.0, 261.63, 329.63], // E3, G3, C4, E4
        accent: [{ offset: 2.2, freq: 293.66 }], // D4
      },
      // Dm7
      {
        bass: 73.42, // D2
        chord: [146.83, 174.61, 220.0, 261.63], // D3, F3, A3, C4
        accent: [{ offset: 2.2, freq: 329.63 }, { offset: 3.0, freq: 261.63 }], // E4, C4
      },
      // Bbmaj7
      {
        bass: 116.54, // Bb2
        chord: [146.83, 174.61, 220.0, 293.66], // D3, F3, A3, D4
        accent: [{ offset: 2.2, freq: 261.63 }], // C4
      },
    ],
  },
  ambient: {
    name: 'Dreamy Ambient',
    desc: 'Không gian bồng bềnh lơ lửng, êm dịu sâu lắng',
    bpm: 52,
    bars: [
      // Cmaj9
      {
        bass: 65.41, // C2
        chord: [196.0, 246.94, 293.66, 329.63, 392.0], // G3, B3, D4, E4, G4
        accent: [{ offset: 2.0, freq: 659.25 }, { offset: 3.2, freq: 987.77 }],
      },
      // Em9
      {
        bass: 82.41, // E2
        chord: [196.0, 246.94, 293.66, 369.99, 493.88], // G3, B3, D4, F#4, B4
        accent: [{ offset: 2.5, freq: 783.99 }],
      },
      // Fmaj7#11 (Lydian ethereal chord)
      {
        bass: 87.31, // F2
        chord: [220.0, 261.63, 329.63, 369.99, 440.0], // A3, C4, E4, B4, A4
        accent: [{ offset: 1.8, freq: 880.0 }, { offset: 3.1, freq: 1318.51 }],
      },
      // G6/9
      {
        bass: 98.0, // G2
        chord: [196.0, 246.94, 293.66, 329.63, 440.0], // G3, B3, D4, E4, A4
        accent: [{ offset: 2.2, freq: 587.33 }],
      },
    ],
  },
  lounge: {
    name: 'Night Lounge',
    desc: 'Hợp âm Jazz hoàng hôn sang trọng, êm dịu',
    bpm: 68,
    bars: [
      // Ebmaj7
      {
        bass: 77.78, // Eb2
        chord: [196.0, 233.08, 293.66, 349.23], // G3, Bb3, D4, F4
        accent: [{ offset: 2.0, freq: 440.0 }, { offset: 3.0, freq: 392.0 }],
      },
      // Cm9
      {
        bass: 65.41, // C2
        chord: [196.0, 233.08, 293.66, 311.13], // G3, Bb3, D4, Eb4
        accent: [{ offset: 2.2, freq: 349.23 }],
      },
      // Fm9
      {
        bass: 87.31, // F2
        chord: [207.65, 261.63, 311.13, 392.0], // Ab3, C4, Eb4, G4
        accent: [{ offset: 2.0, freq: 440.0 }],
      },
      // Bb13sus
      {
        bass: 58.27, // Bb1
        chord: [207.65, 261.63, 293.66, 392.0], // Ab3, C4, D4, G4
        accent: [{ offset: 2.2, freq: 349.23 }],
      },
    ],
  },
};

export class ChillBgmSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private style: BgmStyle = 'lofi';
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private vinylGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  private userVolume: number = 0.35;
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

    // Master filter: warm analog lowpass cut at 950Hz to keep sound cozy & non-fatiguing
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(950, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(0.7, ctx.currentTime);

    // Master gain
    this.masterGain = ctx.createGain();
    const effectiveVol = this.isMuted ? 0.0001 : this.userVolume * 0.45;
    this.masterGain.gain.setValueAtTime(effectiveVol, ctx.currentTime);

    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    // Vinyl crackle generator
    this.setupVinylCrackle(ctx);
  }

  private setupVinylCrackle(ctx: AudioContext) {
    if (!this.filterNode) return;
    try {
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate gentle pink noise + sparse micro vinyl ticks
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        let val = (b0 + b1 + b2 + white * 0.5362) * 0.04;

        // Occasional vinyl pop / dust static
        if (Math.random() < 0.0008) {
          val += (Math.random() * 2 - 1) * 0.35;
        }
        data[i] = val;
      }

      this.noiseNode = ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      const vinylFilter = ctx.createBiquadFilter();
      vinylFilter.type = 'bandpass';
      vinylFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      vinylFilter.Q.setValueAtTime(1.2, ctx.currentTime);

      this.vinylGain = ctx.createGain();
      // Very low level ambient warmth
      this.vinylGain.gain.setValueAtTime(0.012, ctx.currentTime);

      this.noiseNode.connect(vinylFilter);
      vinylFilter.connect(this.vinylGain);
      this.vinylGain.connect(this.filterNode);

      this.noiseNode.start(ctx.currentTime);
    } catch {
      // Ignore
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

    // Reset bar index and schedule starting now
    this.currentBarIndex = 0;
    this.nextBarTime = ctx.currentTime + 0.05;

    this.updateMasterVolume();

    // Start lookahead scheduler
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => this.scheduler(), 45);
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    if (this.ctx && this.masterGain) {
      // Smooth fadeout over 400ms
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
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
    this.userVolume = Math.max(0, Math.min(1, vol));
    this.updateMasterVolume();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.updateMasterVolume();
  }

  /**
   * Smoothly duck BGM when wheel starts spinning
   */
  public duck(isDucked: boolean) {
    this.isDucked = isDucked;
    this.updateMasterVolume();
  }

  private updateMasterVolume() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);

    let target = this.userVolume * 0.42;
    if (this.isMuted || !this.isPlaying) {
      target = 0.0001;
    } else if (this.isDucked) {
      // Duck down by 65% for crystal clear wheel sound effects
      target = target * 0.35;
    }

    this.masterGain.gain.setTargetAtTime(target, now, 0.15);
  }

  private scheduler() {
    if (!this.ctx || !this.isPlaying) return;

    const mood = BGM_MOODS[this.style] || BGM_MOODS.lofi;
    const secondsPerBeat = 60.0 / mood.bpm;
    const secondsPerBar = secondsPerBeat * 4.0;
    const lookahead = 0.25; // schedule 250ms in advance

    while (this.nextBarTime < this.ctx.currentTime + lookahead) {
      this.scheduleBar(this.nextBarTime, mood, this.currentBarIndex);
      this.nextBarTime += secondsPerBar;
      this.currentBarIndex = (this.currentBarIndex + 1) % mood.bars.length;
    }
  }

  private scheduleBar(barStartTime: number, mood: MoodDefinition, barIndex: number) {
    if (!this.ctx || !this.filterNode) return;
    const ctx = this.ctx;
    const bar = mood.bars[barIndex];
    const secondsPerBeat = 60.0 / mood.bpm;
    const barDuration = secondsPerBeat * 4.0;

    // 1. Warm Acoustic / Sub Bass Note
    this.scheduleBassNote(ctx, bar.bass, barStartTime, barDuration * 0.95);

    // 2. Lush Rhodes / Ambient Polyphonic Chord (with natural human strum delay)
    bar.chord.forEach((freq, noteIdx) => {
      const humanStrumDelay = noteIdx * 0.022; // 22ms strum roll
      const noteStartTime = barStartTime + humanStrumDelay;
      this.scheduleChordVoice(ctx, freq, noteStartTime, barDuration);
    });

    // 3. Gentle Secondary Syncopated Tap (at beat 2.5 for lo-fi swing)
    if (this.style === 'lofi' || this.style === 'lounge') {
      const syncopatedTime = barStartTime + secondsPerBeat * 2.5;
      bar.chord.slice(1, 3).forEach((freq, idx) => {
        this.scheduleSoftTap(ctx, freq, syncopatedTime + idx * 0.015, secondsPerBeat * 1.2);
      });
    }

    // 4. Subtle Melodic Accents / Pentatonic Drops
    if (bar.accent) {
      bar.accent.forEach((acc) => {
        const accTime = barStartTime + acc.offset * secondsPerBeat;
        this.scheduleChimeDrop(ctx, acc.freq, accTime);
      });
    }
  }

  private scheduleBassNote(ctx: AudioContext, freq: number, startTime: number, duration: number) {
    if (!this.filterNode) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Warm bass envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Ignore
    }
  }

  private scheduleChordVoice(ctx: AudioContext, freq: number, startTime: number, duration: number) {
    if (!this.filterNode) return;
    try {
      // Fundamental Voice
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Overtone voice for Rhodes bell chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.002, startTime); // Subtle detune

      // Warm vibrato LFO (gentle pitch wobble like a vintage vinyl/tape)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.6, startTime); // 0.6 Hz slow wave
      lfoGain.gain.setValueAtTime(1.2, startTime);   // subtle 1.2Hz depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      lfo.start(startTime);
      lfo.stop(startTime + duration);

      // Envelope
      const attack = this.style === 'ambient' ? 0.6 : 0.05;
      const peakGain = this.style === 'ambient' ? 0.045 : 0.055;

      gain1.gain.setValueAtTime(0.0001, startTime);
      gain1.gain.linearRampToValueAtTime(peakGain, startTime + attack);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      gain2.gain.setValueAtTime(0.0001, startTime);
      gain2.gain.linearRampToValueAtTime(peakGain * 0.35, startTime + attack * 0.8);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(this.filterNode);
      gain2.connect(this.filterNode);

      osc1.start(startTime);
      osc2.start(startTime);

      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    } catch {
      // Ignore
    }
  }

  private scheduleSoftTap(ctx: AudioContext, freq: number, startTime: number, duration: number) {
    if (!this.filterNode) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.025, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch {
      // Ignore
    }
  }

  private scheduleChimeDrop(ctx: AudioContext, freq: number, startTime: number) {
    if (!this.filterNode) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.03, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(startTime);
      osc.stop(startTime + 1.25);
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
