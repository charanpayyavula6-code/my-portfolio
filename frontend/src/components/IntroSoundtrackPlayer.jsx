import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff, Music, Sparkles } from 'lucide-react';
import { introSoundtrack } from '../utils/introSoundtrack';
import { soundFX } from '../utils/audio';

export default function IntroSoundtrackPlayer({ compact = false }) {
  const [playerState, setPlayerState] = useState({
    isPlaying: introSoundtrack.isPlaying,
    voiceEnabled: introSoundtrack.voiceEnabled,
    soundtrackEnabled: introSoundtrack.soundtrackEnabled,
    progress: introSoundtrack.progress,
    currentWordIndex: introSoundtrack.currentWordIndex,
    speechText: introSoundtrack.speechText,
    words: introSoundtrack.words
  });

  const [bars, setBars] = useState(() => Array(16).fill(12));
  const [speed, setSpeed] = useState(1.0);
  const animFrameRef = useRef(null);

  // Subscribe to soundtrack state
  useEffect(() => {
    const unsubscribe = introSoundtrack.subscribe((state) => {
      setPlayerState({ ...state });
    });
    return () => unsubscribe();
  }, []);

  // Equalizer visualizer loop (connects to Web Audio API analyser)
  useEffect(() => {
    if (!playerState.isPlaying) {
      setBars(Array(16).fill(10));
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const updateBars = () => {
      const freqData = introSoundtrack.getFrequencyData();
      if (freqData && freqData.length >= 16) {
        const nextBars = [];
        for (let i = 0; i < 16; i++) {
          const val = freqData[i * 2] || 0;
          // Scale to 8% - 95%
          const heightPct = Math.max(10, Math.min(95, Math.round((val / 255) * 85 + 10)));
          nextBars.push(heightPct);
        }
        setBars(nextBars);
      } else {
        // Procedural organic dance
        const t = Date.now() / 150;
        const nextBars = Array.from({ length: 16 }, (_, i) => {
          const height = Math.sin(t + i * 0.7) * 35 + 50;
          return Math.max(12, Math.min(95, height));
        });
        setBars(nextBars);
      }
      animFrameRef.current = requestAnimationFrame(updateBars);
    };

    animFrameRef.current = requestAnimationFrame(updateBars);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [playerState.isPlaying]);

  const handlePlayToggle = () => {
    soundFX.playSwitch();
    introSoundtrack.togglePlay();
  };

  const handleRestart = () => {
    soundFX.playSwitch();
    introSoundtrack.stop();
    setTimeout(() => {
      introSoundtrack.play();
    }, 150);
  };

  const handleVoiceToggle = () => {
    soundFX.playSwitch();
    introSoundtrack.toggleVoice();
  };

  const handleSoundtrackToggle = () => {
    soundFX.playSwitch();
    introSoundtrack.toggleSoundtrack();
  };

  const handleSpeedChange = (newSpeed) => {
    soundFX.playSwitch();
    setSpeed(newSpeed);
    introSoundtrack.setSpeechRate(newSpeed);
  };

  // Compact Pill Mode (suitable for quick-launch bar in Hero left column)
  if (compact) {
    return (
      <div
        className="intro-soundtrack-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '0.55rem 1rem',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(10, 16, 31, 0.75)',
          border: playerState.isPlaying
            ? '1px solid rgba(0, 240, 255, 0.65)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: playerState.isPlaying
            ? '0 0 25px rgba(0, 240, 255, 0.25), inset 0 0 15px rgba(0, 240, 255, 0.1)'
            : '0 4px 15px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'all 0.3s ease',
          width: 'fit-content'
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          aria-label={playerState.isPlaying ? 'Pause intro soundtrack' : 'Play intro soundtrack'}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: playerState.isPlaying
              ? 'linear-gradient(135deg, #00f0ff, #6366f1)'
              : 'rgba(255, 255, 255, 0.08)',
            border: playerState.isPlaying ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
            color: playerState.isPlaying ? '#050811' : '#00f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: playerState.isPlaying ? '0 0 16px rgba(0, 240, 255, 0.6)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {playerState.isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>

        {/* Text Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: playerState.isPlaying ? '#00f0ff' : 'var(--text-primary)',
                letterSpacing: '0.04em'
              }}
            >
              {playerState.isPlaying ? 'TRANSMITTING INTRO BRIEF' : 'AUDIO INTRO SOUNDTRACK'}
            </span>
            {playerState.isPlaying && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
            )}
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            Cyber ambient synth + AI voice narration (24s)
          </span>
        </div>

        {/* Mini Waveform Equalizer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '2px',
            height: '20px',
            paddingLeft: '0.4rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {bars.slice(0, 8).map((height, i) => (
            <span
              key={i}
              style={{
                width: '3px',
                height: `${playerState.isPlaying ? height : 20}%`,
                background: playerState.isPlaying
                  ? `linear-gradient(to top, #00f0ff, #a855f7)`
                  : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                transition: 'height 0.08s ease'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full High-Tech Deck Mode (Inside Cyberdeck or Modal)
  const currentElapsed = Math.round((playerState.progress / 100) * 24);
  const formattedElapsed = `00:${currentElapsed.toString().padStart(2, '0')}`;

  return (
    <div
      className="intro-soundtrack-deck"
      style={{
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        minHeight: '380px'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}
          >
            <Music size={16} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                letterSpacing: '0.06em'
              }}
            >
              INTRO AUDIO BRIEF &amp; SOUNDTRACK
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              100% Native Web Audio Synth Chords + Speech Synthesizer
            </div>
          </div>
        </div>

        {/* Live Audio Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            background: playerState.isPlaying ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: playerState.isPlaying ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: playerState.isPlaying ? '#10b981' : 'var(--text-muted)'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: playerState.isPlaying ? '#10b981' : '#64748b',
              boxShadow: playerState.isPlaying ? '0 0 8px #10b981' : 'none'
            }}
          />
          <span>{playerState.isPlaying ? 'AUDIO STREAMING' : 'READY TO PLAY'}</span>
        </div>
      </div>

      {/* Futuristic Equalizer Waveform Monitor */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.45)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
            SPECTRUM ANALYZER // 16-BAND FFT
          </span>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            FREQ: 130Hz - 1046Hz [C-MINOR SCI-FI]
          </span>
        </div>

        {/* 16-Band Animated Visualizer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '6px',
            height: '70px',
            padding: '0.25rem 0'
          }}
        >
          {bars.map((height, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${height}%`,
                  borderRadius: '3px',
                  background: playerState.isPlaying
                    ? `linear-gradient(to top, rgba(0, 240, 255, 0.95), rgba(168, 85, 247, 0.95))`
                    : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: playerState.isPlaying
                    ? `0 0 10px rgba(0, 240, 255, ${height / 100})`
                    : 'none',
                  transition: 'height 0.06s ease'
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress Bar & Timestamps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div
            style={{
              width: '100%',
              height: '5px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${playerState.progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff, #a855f7)',
                boxShadow: '0 0 8px #00f0ff',
                transition: 'width 0.25s linear'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>{formattedElapsed}</span>
            <span>00:24</span>
          </div>
        </div>
      </div>

      {/* Live Voice Subtitle Teleprompter */}
      <div
        style={{
          background: 'rgba(10, 16, 31, 0.6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.85rem 1rem',
          maxHeight: '100px',
          overflowY: 'auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-purple)',
            marginBottom: '0.4rem',
            textTransform: 'uppercase'
          }}
        >
          <Sparkles size={11} />
          <span>Real-time Voice Subtitles</span>
        </div>
        <p
          style={{
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
            margin: 0
          }}
        >
          {playerState.words.map((word, idx) => {
            const isSpoken = playerState.isPlaying && idx <= playerState.currentWordIndex;
            const isCurrent = playerState.isPlaying && idx === playerState.currentWordIndex;
            return (
              <span
                key={idx}
                style={{
                  color: isCurrent
                    ? '#00f0ff'
                    : isSpoken
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                  fontWeight: isCurrent ? 700 : 400,
                  textShadow: isCurrent ? '0 0 10px rgba(0, 240, 255, 0.8)' : 'none',
                  transition: 'color 0.15s ease'
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>

      {/* Master Audio Control Deck */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '0.25rem'
        }}
      >
        {/* Play/Pause & Replay */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handlePlayToggle}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)',
              gap: '0.5rem'
            }}
          >
            {playerState.isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            <span>{playerState.isPlaying ? 'Pause Audio' : 'Play Intro Audio'}</span>
          </button>

          <button
            onClick={handleRestart}
            title="Restart Soundtrack"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* Feature Toggles (Soundtrack, Voice, Speed) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Soundtrack Synth Toggle */}
          <button
            onClick={handleSoundtrackToggle}
            title={playerState.soundtrackEnabled ? 'Soundtrack Active' : 'Soundtrack Muted'}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: playerState.soundtrackEnabled
                ? 'rgba(0, 240, 255, 0.12)'
                : 'rgba(255, 255, 255, 0.04)',
              border: playerState.soundtrackEnabled
                ? '1px solid rgba(0, 240, 255, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: playerState.soundtrackEnabled ? '#00f0ff' : 'var(--text-muted)',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Music size={13} />
            <span>Synth: {playerState.soundtrackEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={handleVoiceToggle}
            title={playerState.voiceEnabled ? 'Voice Narration Active' : 'Voice Narration Muted'}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: playerState.voiceEnabled
                ? 'rgba(168, 85, 247, 0.15)'
                : 'rgba(255, 255, 255, 0.04)',
              border: playerState.voiceEnabled
                ? '1px solid rgba(168, 85, 247, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: playerState.voiceEnabled ? '#c084fc' : 'var(--text-muted)',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {playerState.voiceEnabled ? <Mic size={13} /> : <MicOff size={13} />}
            <span>Voice: {playerState.voiceEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Speed Presets */}
          <button
            onClick={() => handleSpeedChange(speed === 1.0 ? 1.15 : speed === 1.15 ? 0.9 : 1.0)}
            title="Speech Rate"
            style={{
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '0.74rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {speed}x
          </button>
        </div>
      </div>
    </div>
  );
}
