// Cinematic Cyber Ambient Soundtrack & Voice Narration Engine for Sri Charan's Portfolio
// 100% Browser Native (Web Audio API + SpeechSynthesis API) — Zero external asset dependencies

class IntroSoundtrack {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.synthInterval = null;
    this.arpInterval = null;
    this.activeNodes = [];
    this.onStateChangeCallbacks = [];
    this.voiceEnabled = true;
    this.soundtrackEnabled = true;
    this.progress = 0;
    this.progressInterval = null;
    this.duration = 24; // Estimated duration in seconds
    this.currentWordIndex = -1;
    this.currentSpokenChar = 0;
    this.speechRate = 1.0;

    this.speechText =
      "Hello and welcome. I am Payyavula Sri Charan, an AI and Machine Learning Engineer and Full-Stack Developer at Prathyusha Engineering College with a 7.5 GPA. I specialize in Natural Language Processing, speech emotion recognition, and scalable Python and Java architectures. Feel free to explore my verified projects, research publications, and engineering blueprints.";
    
    this.words = this.speechText.split(/\s+/);
  }

  initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
        
        // Master Gain
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.audioCtx.currentTime);

        // Analyser node for live visualizer
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  getFrequencyData() {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((cb) => cb !== callback);
    };
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      voiceEnabled: this.voiceEnabled,
      soundtrackEnabled: this.soundtrackEnabled,
      progress: this.progress,
      currentWordIndex: this.currentWordIndex,
      speechText: this.speechText,
      words: this.words
    };
    this.onStateChangeCallbacks.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Error in soundtrack callback:', err);
      }
    });
  }

  play() {
    if (this.isPlaying) return;
    this.initAudio();
    this.isPlaying = true;
    this.progress = 0;
    this.currentWordIndex = -1;
    this.currentSpokenChar = 0;
    this.notify();

    // Start progress timer
    let elapsed = 0;
    this.progressInterval = setInterval(() => {
      elapsed += 0.25;
      this.progress = Math.min(100, Math.round((elapsed / this.duration) * 100));
      this.notify();
      if (this.progress >= 100 && (!window.speechSynthesis || !window.speechSynthesis.speaking)) {
        this.stop();
      }
    }, 250);

    // 1. Play Cyber Synth Soundtrack
    if (this.soundtrackEnabled) {
      this.startAmbientSynth();
      this.startCyberArp();
    }

    // 2. Play AI Voice Narration
    if (this.voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.startVoiceNarration();
    }
  }

  startAmbientSynth() {
    if (!this.audioCtx || !this.masterGain) return;

    // Cinematic chords in C minor (Sci-Fi Cyberpunk ambient progression: Cm -> Abmaj7 -> Eb -> Bb)
    const chords = [
      [130.81, 155.56, 196.0, 261.63, 392.0], // Cm9 (C3, Eb3, G3, C4, G4)
      [103.83, 155.56, 207.65, 261.63, 329.63], // Abmaj7 (Ab2, Eb3, Ab3, C4, E4)
      [155.56, 196.0, 233.08, 311.13, 392.0], // Eb (Eb3, G3, Bb3, Eb4, G4)
      [116.54, 174.61, 233.08, 293.66, 349.23]  // Bbadd9 (Bb2, F3, Bb3, D4, F4)
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!this.isPlaying || !this.soundtrackEnabled) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, idx) => {
        try {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          const filter = this.audioCtx.createBiquadFilter();

          // Detuned warm synth voices
          osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sawtooth';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
          osc.detune.setValueAtTime((idx - 2) * 5, this.audioCtx.currentTime);

          // Warm resonant low-pass filter
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750 + idx * 80, this.audioCtx.currentTime);
          filter.Q.setValueAtTime(2.5, this.audioCtx.currentTime);

          const now = this.audioCtx.currentTime;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(idx === 0 ? 0.05 : 0.025, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0005, now + 4.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 4.5);
          this.activeNodes.push(osc);
        } catch {
          // Ignore audio errors
        }
      });
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 4000);
  }

  startCyberArp() {
    if (!this.audioCtx || !this.masterGain) return;

    // Pentatonic high sparkling frequencies (C5, D5, Eb5, G5, Bb5, C6)
    const arpNotes = [523.25, 587.33, 622.25, 783.99, 932.33, 1046.5];
    let noteIdx = 0;

    this.arpInterval = setInterval(() => {
      if (!this.isPlaying || !this.soundtrackEnabled) return;
      try {
        const freq = arpNotes[noteIdx % arpNotes.length];
        noteIdx = (noteIdx + Math.floor(Math.random() * 2 + 1)) % arpNotes.length;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.4);
        this.activeNodes.push(osc);
      } catch {
        // Ignore
      }
    }, 450);
  }

  startVoiceNarration() {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(this.speechText);
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    // Select the cleanest modern English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('David') || v.name.includes('Alex'))) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    // Word boundary tracking for live subtitles teleprompter
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        this.currentSpokenChar = event.charIndex;
        // Compute word index
        const textUpToChar = this.speechText.substring(0, event.charIndex);
        const wordCount = textUpToChar.trim().split(/\s+/).filter(Boolean).length;
        this.currentWordIndex = wordCount;
        this.notify();
      }
    };

    utterance.onend = () => {
      this.currentWordIndex = this.words.length;
      this.notify();
      setTimeout(() => {
        if (this.isPlaying) {
          this.stop();
        }
      }, 1800);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event error (non-fatal):', e);
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    this.isPlaying = false;
    this.progress = 0;
    this.currentWordIndex = -1;

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }

    if (this.arpInterval) {
      clearInterval(this.arpInterval);
      this.arpInterval = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    this.activeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Ignore
      }
    });
    this.activeNodes = [];

    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    } else if (this.voiceEnabled && this.isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.startVoiceNarration();
    }
    this.notify();
  }

  toggleSoundtrack() {
    this.soundtrackEnabled = !this.soundtrackEnabled;
    if (!this.soundtrackEnabled) {
      if (this.synthInterval) clearInterval(this.synthInterval);
      if (this.arpInterval) clearInterval(this.arpInterval);
      this.synthInterval = null;
      this.arpInterval = null;
    } else if (this.soundtrackEnabled && this.isPlaying) {
      this.startAmbientSynth();
      this.startCyberArp();
    }
    this.notify();
  }

  setSpeechRate(rate) {
    this.speechRate = rate;
  }
}

export const introSoundtrack = new IntroSoundtrack();
