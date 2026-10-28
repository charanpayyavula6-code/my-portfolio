import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

export default function IntroScreen({ onComplete }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // Lightweight animated particle/grid canvas background (pure JS, zero dependencies)
  useEffect(() => {
    if (hasReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle nodes
    const particleCount = Math.min(45, Math.floor(window.innerWidth / 30));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(129, 140, 248, 0.35)'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasReducedMotion]);

  const handleEnter = () => {
    try {
      sessionStorage.setItem('charan_intro_seen', 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
    onComplete();
  };

  return (
    <aside
      aria-label="Welcome Introduction"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#070b14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.85
        }}
      />

      {/* Top Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 10
        }}
      >
        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute ambient audio' : 'Mute ambient audio'}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            color: '#94a3b8',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title={isMuted ? 'Ambient audio muted' : 'Ambient audio active'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          onClick={handleEnter}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            color: '#94a3b8',
            padding: '0.45rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f8fafc';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
        >
          Skip Intro &rarr;
        </button>
      </div>

      {/* Center Cinematic Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Animated Custom Monogram Shield */}
        <div
          style={{
            width: '88px',
            height: '88px',
            margin: '0 auto 1.75rem auto',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.1))',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          className="animate-float"
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}
          >
            SC
          </span>
          <div
            style={{
              position: 'absolute',
              bottom: '-3px',
              right: '-3px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }}
          />
        </div>

        {/* Small Category Lead */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#38bdf8',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          <Sparkles size={13} />
          <span>Interactive Developer Workspace</span>
        </div>

        {/* Name Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#f8fafc',
            letterSpacing: '-0.02em',
            marginBottom: '0.6rem',
            lineHeight: 1.15
          }}
        >
          PAYYAVULA SRI CHARAN
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: '#94a3b8',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem'
          }}
        >
          AI/ML Student • Developer • Builder
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            alignItems: 'center',
            maxWidth: '280px',
            margin: '0 auto'
          }}
        >
          <button
            onClick={handleEnter}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.95rem 1.75rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #818cf8 100%)',
              color: '#070b14',
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 4px 25px rgba(56, 189, 248, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(56, 189, 248, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 25px rgba(56, 189, 248, 0.4)';
            }}
          >
            <span>Enter Portfolio</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Academic Note */}
        <div
          style={{
            marginTop: '2.5rem',
            fontSize: '0.8rem',
            color: '#64748b'
          }}
        >
          Prathyusha Engineering College, Chennai • 3rd Year B.E. (AI &amp; ML)
        </div>
      </div>
    </aside>
  );
}
