/**
 * Procedural Background Music (BGM) Engine for iOS 18 Lucky Wheel.
 * 
 * 3 Radically Distinct, Creative, High-Fidelity Musical Styles:
 * 
 * 1. ☕ LO-FI COFFEE SHOP (76 BPM):
 *    - Dusty Rhodes electric piano, boom-bap drums, sub-bass, jazz flute melody & vinyl warmth.
 *    - Deep, cozy, melancholic yet relaxing study beat.
 * 
 * 2. 🎮 RETRO 8-BIT PIXEL ARCADE (108 BPM):
 *    - Authentic NES / Game Boy chiptune: 16th-note square arpeggios, bouncy triangle bassline,
 *      crunchy bit-crushed noise drums, cheerful Nintendo game melodies and 1-Up chimes.
 *    - Playful, upbeat, nostalgic and energetic.
 * 
 * 3. 🏝️ TROPICAL ISLAND BEACH (96 BPM):
 *    - Caribbean Calypso / Reggae-ton groove: melodic Marimba / Steel Drum, acoustic Bongo drums
 *      (high & low membrane hits), Latin cabasa shaker, offbeat ukulele guitar skanks & bouncy island bass.
 *    - Sunny, summery, festive and breezy.
 */

export type BgmStyle = 'lofi' | 'ambient' | 'lounge';

export interface BgmConfig {
  enabled: boolean;
  style: BgmStyle;
  volume: number;      // 0.05 to 1.0 (default 0.60)
  autoDuck: boolean;   // Duck volume when wheel is spinning
}

// Frequency helper
const F: Record<string, number> = {
  // Octave 2
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  // Octave 3
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  // Octave 4
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  // Octave 5
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  // Octave 6
  C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98,
};

export class ChillBgmSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private style: BgmStyle = 'lofi';
  private masterGain: GainNode | null = null;
  private eqLow: BiquadFilterNode | null = null;
  private eqHigh: BiquadFilterNode | null = null;

  // Pre-allocated noise buffer for natural acoustic & chiptune percussion
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

    // Highpass filter at 30Hz to remove inaudible subsonic rumble
    const subCut = ctx.createBiquadFilter();
    subCut.type = 'highpass';
    subCut.frequency.setValueAtTime(30, ctx.currentTime);

    // Warm Low Shelf (+1.8dB at 95Hz)
    this.eqLow = ctx.createBiquadFilter();
    this.eqLow.type = 'lowshelf';
    this.eqLow.frequency.setValueAtTime(95, ctx.currentTime);
    this.eqLow.gain.setValueAtTime(1.8, ctx.currentTime);

    // Open, Crisp High Shelf (+0.5dB at 6800Hz)
    this.eqHigh = ctx.createBiquadFilter();
    this.eqHigh.type = 'highshelf';
    this.eqHigh.frequency.setValueAtTime(6800, ctx.currentTime);
    this.eqHigh.gain.setValueAtTime(0.5, ctx.currentTime);

    // Master Output Gain
    this.masterGain = ctx.createGain();
    const effectiveVol = this.isMuted ? 0.0001 : this.userVolume * 0.75;
    this.masterGain.gain.setValueAtTime(effectiveVol, ctx.currentTime);

    // Chain: subCut -> eqLow -> eqHigh -> masterGain -> destination
    subCut.connect(this.eqLow);
    this.eqLow.connect(this.eqHigh);
    this.eqHigh.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    // 1-second white noise buffer for drums & vinyl
    this.createNoiseBuffer(ctx);
  }

  private createNoiseBuffer(ctx: AudioContext) {
    if (this.noiseBuffer) return;
    const length = ctx.sampleRate;
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
    this.timerId = setInterval(() => this.scheduler(), 30);
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
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.3);
    }
  }

  public setStyle(newStyle: BgmStyle) {
    if (this.style === newStyle) return;
    this.style = newStyle;
    this.currentBarIndex = 0;
    if (this.ctx) {
      this.nextBarTime = this.ctx.currentTime + 0.08;
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

    let target = this.userVolume * 0.75;
    if (this.isMuted || !this.isPlaying) {
      target = 0.0001;
    } else if (this.isDucked) {
      target = target * 0.35; // 65% ducking during wheel spin
    }

    this.masterGain.gain.setTargetAtTime(target, now, 0.12);
  }

  /* ==========================================================================
     CORE SCHEDULER: Dispatches to the 3 Distinct Style Engines
     ========================================================================== */
  private scheduler() {
    if (!this.ctx || !this.isPlaying || !this.eqLow) return;

    // Determine current style BPM
    const bpm = this.style === 'ambient' ? 108 : this.style === 'lounge' ? 96 : 76;
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerBar = secondsPerBeat * 4.0;
    const lookahead = 0.25;

    while (this.nextBarTime < this.ctx.currentTime + lookahead) {
      if (this.style === 'lofi') {
        this.scheduleLofiBar(this.ctx, this.nextBarTime, secondsPerBeat, this.currentBarIndex);
      } else if (this.style === 'ambient') {
        this.scheduleRetro8BitBar(this.ctx, this.nextBarTime, secondsPerBeat, this.currentBarIndex);
      } else if (this.style === 'lounge') {
        this.scheduleTropicalBar(this.ctx, this.nextBarTime, secondsPerBeat, this.currentBarIndex);
      }

      this.nextBarTime += secondsPerBar;
      this.currentBarIndex = (this.currentBarIndex + 1) % 4; // 4-bar loop
    }
  }

  /* ==========================================================================
     STYLE 1: ☕ LO-FI COFFEE SHOP (76 BPM)
     Vintage vinyl, boom-bap kick/snare, dusty Rhodes chords & jazz flute lead
     ========================================================================== */
  private scheduleLofiBar(ctx: AudioContext, barStart: number, spb: number, barIdx: number) {
    // Chord progression: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    const chords = [
      [F.F3, F.A3, F.C4, F.E4], // Fmaj7
      [F.E3, F.G3, F.B3, F.D4], // Em7
      [F.D3, F.F3, F.A3, F.C4], // Dm7
      [F.C3, F.E3, F.G3, F.B3], // Cmaj7
    ];
    const bassRoots = [F.F2, F.E2, F.D2, F.C2];
    const chord = chords[barIdx];
    const bass = bassRoots[barIdx];

    // 1. Boom-Bap Drums
    // Kick on beat 0 and beat 2.5
    this.playLofiKick(ctx, barStart);
    this.playLofiKick(ctx, barStart + 2.5 * spb);

    // Mellow Snare with paper rattle on beat 1 and beat 3
    this.playLofiSnare(ctx, barStart + 1.0 * spb);
    this.playLofiSnare(ctx, barStart + 3.0 * spb);

    // Swung Hi-Hats on 8th notes
    for (let i = 0; i < 8; i++) {
      const isOffbeat = i % 2 === 1;
      const swing = isOffbeat ? 0.028 : 0;
      this.playLofiHat(ctx, barStart + i * 0.5 * spb + swing, isOffbeat);
    }

    // 2. Warm Sub Bass
    this.playSubBass(ctx, bass, barStart, 1.8 * spb);
    this.playSubBass(ctx, bass * 1.5, barStart + 2.0 * spb, 0.9 * spb);
    this.playSubBass(ctx, bass, barStart + 3.0 * spb, 0.9 * spb);

    // 3. Dusty Rhodes Chords (beat 0 and beat 2.5)
    this.playRhodesStrum(ctx, chord, barStart, 1.6 * spb);
    this.playRhodesStrum(ctx, chord, barStart + 2.5 * spb, 1.4 * spb);

    // 4. Soulful Jazz Flute Melody
    const fluteMelodies = [
      [{ t: 0.5, f: F.A4 }, { t: 1.5, f: F.C5 }, { t: 2.25, f: F.E5 }, { t: 3.0, f: F.G5 }],
      [{ t: 0.5, f: F.G5 }, { t: 1.5, f: F.E5 }, { t: 2.5, f: F.D5 }],
      [{ t: 0.5, f: F.F5 }, { t: 1.25, f: F.E5 }, { t: 2.0, f: F.D5 }, { t: 3.0, f: F.C5 }],
      [{ t: 0.5, f: F.E5 }, { t: 1.5, f: F.D5 }, { t: 2.5, f: F.C5 }],
    ];
    fluteMelodies[barIdx].forEach((note) => {
      this.playJazzFlute(ctx, note.f, barStart + note.t * spb, 0.55 * spb);
    });
  }

  /* ==========================================================================
     STYLE 2: 🎮 RETRO 8-BIT PIXEL ARCADE (108 BPM)
     NES Chiptune: 16th-note square arpeggios, walking triangle bass & retro noise drums
     ========================================================================== */
  private scheduleRetro8BitBar(ctx: AudioContext, barStart: number, spb: number, barIdx: number) {
    // Chords: C -> G -> Am -> F (Classic Nintendo J-Pop / Overworld progression)
    const arpeggioNotes = [
      [F.C4, F.E4, F.G4, F.C5], // C
      [F.B3, F.D4, F.G4, F.B4], // G
      [F.A3, F.C4, F.E4, F.A4], // Am
      [F.F3, F.A3, F.C4, F.F4], // F
    ];
    const bassline = [
      [F.C2, F.E2, F.G2, F.E2],
      [F.G2, F.B2, F.D3, F.B2],
      [F.A2, F.C3, F.E3, F.C3],
      [F.F2, F.A2, F.C3, F.A2],
    ];
    const arp = arpeggioNotes[barIdx];
    const bass = bassline[barIdx];

    // 1. Rapid 16th-Note Sparkling Chiptune Arpeggiator (16 notes per bar)
    const step = spb * 0.25; // 16th note
    for (let i = 0; i < 16; i++) {
      const noteFreq = arp[i % arp.length];
      this.play8BitPulse(ctx, noteFreq, barStart + i * step, step * 0.75);
    }

    // 2. Punchy NES Walking Triangle Bass
    for (let i = 0; i < 4; i++) {
      this.playNesBass(ctx, bass[i], barStart + i * spb, spb * 0.85);
    }

    // 3. Crunchy 8-bit Noise Drums
    // Retro Kick on beats 0, 2
    this.play8BitKick(ctx, barStart);
    this.play8BitKick(ctx, barStart + 2.0 * spb);

    // Retro Noise Snare on beats 1, 3
    this.play8BitSnare(ctx, barStart + 1.0 * spb);
    this.play8BitSnare(ctx, barStart + 3.0 * spb);

    // 8-bit closed hat on 8th notes
    for (let i = 0; i < 8; i++) {
      this.play8BitHat(ctx, barStart + i * 0.5 * spb);
    }

    // 4. Cheerful 8-bit Lead / Coin Ding
    const leadPhrases = [
      [{ t: 0, f: F.G5 }, { t: 0.75, f: F.C6 }, { t: 1.5, f: F.E6 }, { t: 2.25, f: F.D6 }],
      [{ t: 0, f: F.B5 }, { t: 1.0, f: F.G5 }, { t: 2.0, f: F.D6 }, { t: 3.0, f: F.C6 }],
      [{ t: 0, f: F.C6 }, { t: 0.75, f: F.E6 }, { t: 1.5, f: F.A6 }, { t: 2.25, f: F.G6 }],
      [{ t: 0, f: F.F5 }, { t: 1.0, f: F.A5 }, { t: 2.0, f: F.C6 }, { t: 3.25, f: F.E6 }],
    ];
    leadPhrases[barIdx].forEach((item) => {
      this.play8BitLead(ctx, item.f, barStart + item.t * spb, 0.35 * spb);
    });

    // Special Coin ding at end of Bar 4
    if (barIdx === 3) {
      this.play8BitCoin(ctx, barStart + 3.5 * spb);
    }
  }

  /* ==========================================================================
     STYLE 3: 🏝️ TROPICAL ISLAND BEACH (96 BPM)
     Caribbean Calypso: Marimba/Steel Pan, Bongo drums, Latin shaker & Ukulele skank
     ========================================================================== */
  private scheduleTropicalBar(ctx: AudioContext, barStart: number, spb: number, barIdx: number) {
    // Chords: C -> F -> G -> C (Sunny Caribbean Calypso progression)
    const ukuleleChords = [
      [F.G4, F.C5, F.E5], // C
      [F.A4, F.C5, F.F5], // F
      [F.G4, F.B4, F.D5], // G
      [F.G4, F.C5, F.E5], // C
    ];
    const bassNotes = [F.C2, F.F2, F.G2, F.C2];
    const ukChord = ukuleleChords[barIdx];
    const bass = bassNotes[barIdx];

    // 1. Acoustic Bongo & Percussion
    // Low bongo on beat 0, beat 2
    this.playBongo(ctx, false, barStart);
    this.playBongo(ctx, false, barStart + 2.0 * spb);

    // High bongo syncopated on beat 1.5, beat 2.75, beat 3.5
    this.playBongo(ctx, true, barStart + 1.5 * spb);
    this.playBongo(ctx, true, barStart + 2.75 * spb);
    this.playBongo(ctx, true, barStart + 3.5 * spb);

    // Latin Shaker (Cabasa 16th notes with accent)
    for (let i = 0; i < 8; i++) {
      this.playLatinShaker(ctx, barStart + i * 0.5 * spb, i % 2 === 1);
    }

    // 2. Ukulele Offbeat Skank (Staccato upbeat strums at beat 0.5, 1.5, 2.5, 3.5)
    [0.5, 1.5, 2.5, 3.5].forEach((beat) => {
      this.playUkuleleSkank(ctx, ukChord, barStart + beat * spb);
    });

    // 3. Bouncy Calypso Island Bass (Root on 0, 5th on 2.0, octave on 3.0)
    this.playIslandBass(ctx, bass, barStart, 0.8 * spb);
    this.playIslandBass(ctx, bass * 1.5, barStart + 2.0 * spb, 0.7 * spb);
    this.playIslandBass(ctx, bass * 2, barStart + 3.0 * spb, 0.7 * spb);

    // 4. Melodic Steel Pan / Marimba Riffs
    const marimbaRiffs = [
      [{ t: 0, f: F.E5 }, { t: 0.75, f: F.G5 }, { t: 1.25, f: F.C6 }, { t: 2.25, f: F.E6 }, { t: 3.0, f: F.D6 }],
      [{ t: 0, f: F.F5 }, { t: 0.75, f: F.A5 }, { t: 1.5, f: F.C6 }, { t: 2.5, f: F.A5 }],
      [{ t: 0, f: F.D5 }, { t: 0.75, f: F.G5 }, { t: 1.25, f: F.B5 }, { t: 2.25, f: F.D6 }, { t: 3.0, f: F.C6 }],
      [{ t: 0, f: F.E5 }, { t: 0.5, f: F.G5 }, { t: 1.25, f: F.C6 }, { t: 2.0, f: F.G5 }, { t: 2.75, f: F.E5 }],
    ];
    marimbaRiffs[barIdx].forEach((m) => {
      this.playMarimbaNote(ctx, m.f, barStart + m.t * spb, 0.45 * spb);
    });
  }

  /* ==========================================================================
     SYNTHESIS ENGINES (INSTRUMENT IMPLEMENTATIONS)
     ========================================================================== */

  // --- LO-FI SOUNDS ---
  private playLofiKick(ctx: AudioContext, time: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(105, time);
      osc.frequency.exponentialRampToValueAtTime(36, time + 0.12);

      gain.gain.setValueAtTime(0.38, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + 0.17);
    } catch {}
  }

  private playLofiSnare(ctx: AudioContext, time: number) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1750, time);
      filter.Q.setValueAtTime(1.5, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.20, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.eqLow);

      noise.start(time);
      noise.stop(time + 0.12);
    } catch {}
  }

  private playLofiHat(ctx: AudioContext, time: number, isOffbeat: boolean) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(isOffbeat ? 7200 : 6500, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isOffbeat ? 0.05 : 0.09, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.038);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.eqLow);

      noise.start(time);
      noise.stop(time + 0.045);
    } catch {}
  }

  private playSubBass(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.26, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    } catch {}
  }

  private playRhodesStrum(ctx: AudioContext, freqs: number[], time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      freqs.forEach((freq, idx) => {
        const strum = time + idx * 0.016;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, strum);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2.003, strum);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1900, strum);

        gain.gain.setValueAtTime(0.001, strum);
        gain.gain.linearRampToValueAtTime(0.075, strum + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, strum + duration);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(filter);
        filter.connect(this.eqLow!);

        osc1.start(strum);
        osc2.start(strum);
        osc1.stop(strum + duration + 0.05);
        osc2.stop(strum + duration + 0.05);
      });
    } catch {}
  }

  private playJazzFlute(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Flute vibrato
      lfo.frequency.setValueAtTime(5.4, time);
      lfoGain.gain.setValueAtTime(3.5, time);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.09, time + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);

      lfo.start(time);
      osc.start(time);
      lfo.stop(time + duration + 0.02);
      osc.stop(time + duration + 0.02);
    } catch {}
  }

  // --- RETRO 8-BIT SOUNDS ---
  private play8BitPulse(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.045, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  private play8BitLead(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.075, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  private playNesBass(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + duration + 0.01);
    } catch {}
  }

  private play8BitKick(ctx: AudioContext, time: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, time);
      osc.frequency.exponentialRampToValueAtTime(32, time + 0.09);

      gain.gain.setValueAtTime(0.36, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.10);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + 0.11);
    } catch {}
  }

  private play8BitSnare(ctx: AudioContext, time: number) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      noise.connect(gain);
      gain.connect(this.eqLow);
      noise.start(time);
      noise.stop(time + 0.09);
    } catch {}
  }

  private play8BitHat(ctx: AudioContext, time: number) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

      noise.connect(gain);
      gain.connect(this.eqLow);
      noise.start(time);
      noise.stop(time + 0.025);
    } catch {}
  }

  private play8BitCoin(ctx: AudioContext, time: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(F.B5, time);
      osc.frequency.setValueAtTime(F.E6, time + 0.07);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + 0.36);
    } catch {}
  }

  // --- TROPICAL ISLAND SOUNDS ---
  private playBongo(ctx: AudioContext, isHigh: boolean, time: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      const startFreq = isHigh ? 310 : 190;
      const endFreq = isHigh ? 210 : 130;
      osc.frequency.setValueAtTime(startFreq, time);
      osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.06);

      gain.gain.setValueAtTime(isHigh ? 0.22 : 0.28, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + 0.13);
    } catch {}
  }

  private playLatinShaker(ctx: AudioContext, time: number, isAccent: boolean) {
    if (!this.eqLow || !this.noiseBuffer) return;
    try {
      const noise = ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4500, time);
      filter.Q.setValueAtTime(1.2, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isAccent ? 0.12 : 0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.eqLow);
      noise.start(time);
      noise.stop(time + 0.06);
    } catch {}
  }

  private playUkuleleSkank(ctx: AudioContext, freqs: number[], time: number) {
    if (!this.eqLow) return;
    try {
      freqs.forEach((freq, idx) => {
        const strum = time + idx * 0.008;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, strum);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(320, strum);

        gain.gain.setValueAtTime(0.065, strum);
        gain.gain.exponentialRampToValueAtTime(0.001, strum + 0.08);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.eqLow!);

        osc.start(strum);
        osc.stop(strum + 0.09);
      });
    } catch {}
  }

  private playIslandBass(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.28, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.eqLow);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    } catch {}
  }

  private playMarimbaNote(ctx: AudioContext, freq: number, time: number, duration: number) {
    if (!this.eqLow) return;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, time);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 3.98, time); // sharp wood mallet harmonic

      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.eqLow);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration + 0.02);
      osc2.stop(time + duration + 0.02);
    } catch {}
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
