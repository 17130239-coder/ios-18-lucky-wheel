/**
 * State-of-the-Art Web Audio API Sound Synthesizer for iOS 18 Lucky Wheel.
 * Features:
 * - Multi-layer Taptic Ratchet Click (Transient snap, tuned bell resonance, haptic sub-thud, suspense bell)
 * - Aerodynamic Spin Launch Whoosh & Torque Riser
 * - Majestic Celestial Victory Fanfare (Sparkle arpeggio cascade, C-Major 9th triumph pad, stardust chimes)
 * - Tactile iOS Glass & Button Interactions
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
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

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer) {
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * 1. Dynamic Taptic Ratchet Click
   * Simulates real physical needle striking brass pins with:
   * - Crisp transient snap (bandpass noise impulse)
   * - Tuned metallic body ping (velocity-modulated sine)
   * - Haptic sub-thud (Apple Taptic style low-end punch)
   * - Suspense resonant chime (when crawling near the stop)
   */
  public playTick(velocityRatio: number = 0.5) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const vel = Math.max(0, Math.min(1, velocityRatio));
      const now = ctx.currentTime;

      // --- Layer 1: Metallic Transient Click Spike (Noise burst) ---
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2600 + 1200 * vel, now);
      noiseFilter.Q.setValueAtTime(3.5, now);

      const noiseGain = ctx.createGain();
      const snapDuration = 0.006 + 0.008 * (1 - vel);
      const snapVolume = 0.035 + 0.04 * (1 - vel);
      noiseGain.gain.setValueAtTime(snapVolume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + snapDuration);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + snapDuration + 0.002);

      // --- Layer 2: Tuned Escapement Body Ping ---
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();

      bodyOsc.type = 'sine';
      // From 580Hz (deep slow clack) to 1180Hz (light fast tick)
      const bodyFreq = 580 + 600 * vel;
      bodyOsc.frequency.setValueAtTime(bodyFreq, now);

      const bodyDuration = 0.018 + 0.032 * (1 - vel);
      const bodyVol = 0.03 + 0.045 * (1 - vel);
      bodyGain.gain.setValueAtTime(bodyVol, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + bodyDuration);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);

      bodyOsc.start(now);
      bodyOsc.stop(now + bodyDuration + 0.002);

      // --- Layer 3: Tactile Haptic Sub-Thud (Physical weight transfer) ---
      if (vel < 0.6) {
        const hapticOsc = ctx.createOscillator();
        const hapticGain = ctx.createGain();

        hapticOsc.type = 'triangle';
        // Pitch drop like Apple Taptic motor
        hapticOsc.frequency.setValueAtTime(160, now);
        hapticOsc.frequency.exponentialRampToValueAtTime(55, now + 0.03);

        const hapticVol = 0.07 * (1 - vel / 0.6);
        hapticGain.gain.setValueAtTime(hapticVol, now);
        hapticGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        hapticOsc.connect(hapticGain);
        hapticGain.connect(ctx.destination);

        hapticOsc.start(now);
        hapticOsc.stop(now + 0.038);
      }

      // --- Layer 4: Suspense Chime Tail (Final 2-3 crawl sectors) ---
      if (vel < 0.15) {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(1320, now); // E6 crystal harmonic

        chimeGain.gain.setValueAtTime(0.04, now);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(now);
        chimeOsc.stop(now + 0.17);
      }
    } catch {
      // Ignore audio synthesis exceptions
    }
  }

  /**
   * 2. Spin Launch Whoosh & Torque Riser
   * Energetic air displacement and motor spin-up when the wheel starts.
   */
  public playSpinLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Air whoosh noise sweep
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 0.35);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.65);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.22);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.66);

      // Pitch Riser (Acceleration sweep)
      const riser = ctx.createOscillator();
      const riserGain = ctx.createGain();

      riser.type = 'sine';
      riser.frequency.setValueAtTime(180, now);
      riser.frequency.exponentialRampToValueAtTime(540, now + 0.45);

      riserGain.gain.setValueAtTime(0.001, now);
      riserGain.gain.linearRampToValueAtTime(0.04, now + 0.25);
      riserGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      riser.connect(riserGain);
      riserGain.connect(ctx.destination);

      riser.start(now);
      riser.stop(now + 0.52);
    } catch {
      // Ignore
    }
  }

  /**
   * 3. Celestial Grand Victory Fanfare
   * An exquisite 3-stage celebratory experience:
   * - Sparkling Pentatonic Arpeggio Cascade
   * - Majestic C-Major 9th Triumph Chord
   * - Stardust Shimmer Sparkles
   */
  public playWinFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // --- Stage 1: Ascending Pentatonic Cascade (Sparkling chimes) ---
      // C5, E5, G5, A5, C6, D6, E6, G6
      const cascadeNotes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];
      cascadeNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const noteStart = now + i * 0.055;
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.06, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.29);
      });

      // --- Stage 2: Grand Triumph C-Major 9th Chord (starts at now + 0.48s) ---
      // Voicing: C3 (sub bass), G3 (warmth), C4, E4, G4, B4, D5 (Major 9th), G5, E6 (radiant top)
      const chordNotes = [
        { freq: 130.81, type: 'triangle', vol: 0.12, decay: 1.8 }, // C3 Sub
        { freq: 196.0, type: 'sine', vol: 0.09, decay: 1.6 },      // G3
        { freq: 261.63, type: 'triangle', vol: 0.08, decay: 1.4 }, // C4
        { freq: 329.63, type: 'sine', vol: 0.07, decay: 1.5 },     // E4
        { freq: 392.0, type: 'sine', vol: 0.07, decay: 1.5 },      // G4
        { freq: 493.88, type: 'sine', vol: 0.06, decay: 1.4 },     // B4 Major 7th
        { freq: 587.33, type: 'sine', vol: 0.06, decay: 1.3 },     // D5 9th
        { freq: 783.99, type: 'sine', vol: 0.05, decay: 1.5 },     // G5
        { freq: 1318.51, type: 'sine', vol: 0.04, decay: 1.6 },    // E6
      ] as const;

      const chordStart = now + 0.46;
      chordNotes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = n.type as OscillatorType;
        osc.frequency.setValueAtTime(n.freq, chordStart);

        // Subtle warm vibrato on sustain
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(4.5, chordStart);
        lfoGain.gain.setValueAtTime(1.5, chordStart);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(chordStart);
        lfo.stop(chordStart + n.decay);

        gain.gain.setValueAtTime(0.001, chordStart);
        gain.gain.linearRampToValueAtTime(n.vol, chordStart + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, chordStart + n.decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chordStart);
        osc.stop(chordStart + n.decay + 0.05);
      });

      // --- Stage 3: Stardust Sparkle Sprinkles (0.75s to 1.5s) ---
      const sparklePitches = [2093.0, 2349.32, 2637.02, 3135.96, 3520.0]; // C7, D7, E7, G7, A7
      for (let s = 0; s < 7; s++) {
        const spkStart = chordStart + 0.3 + Math.random() * 0.7;
        const spkPitch = sparklePitches[Math.floor(Math.random() * sparklePitches.length)];

        const spkOsc = ctx.createOscillator();
        const spkGain = ctx.createGain();

        spkOsc.type = 'sine';
        spkOsc.frequency.setValueAtTime(spkPitch, spkStart);

        spkGain.gain.setValueAtTime(0.035, spkStart);
        spkGain.gain.exponentialRampToValueAtTime(0.0001, spkStart + 0.22);

        spkOsc.connect(spkGain);
        spkGain.connect(ctx.destination);

        spkOsc.start(spkStart);
        spkOsc.stop(spkStart + 0.23);
      }
    } catch {
      // Ignore
    }
  }

  /**
   * 4. Tactile Button Tap (Apple Haptic Click)
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Micro transient spike
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.012);

      clickGain.gain.setValueAtTime(0.05, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.015);

      // Low tactile thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(120, now);
      thudOsc.frequency.exponentialRampToValueAtTime(40, now + 0.025);

      thudGain.gain.setValueAtTime(0.06, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.026);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);

      thudOsc.start(now);
      thudOsc.stop(now + 0.028);
    } catch {
      // Ignore
    }
  }

  /**
   * 5. Smooth Glass Pop / Bubble chime (Modal & Drawer actions)
   */
  public playGlassPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.035);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundSynthesizer();
