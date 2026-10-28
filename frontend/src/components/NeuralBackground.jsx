import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes count based on screen width
    const count = Math.min(65, Math.max(30, Math.floor(window.innerWidth / 28)));
    const particles = [];

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: Math.random() * 2 + 1,
        colorIndex: Math.floor(Math.random() * 3), // 0: cyan, 1: purple, 2: emerald
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDark();
      const cyan = dark ? 'rgba(0, 240, 255, ' : 'rgba(2, 132, 199, ';
      const violet = dark ? 'rgba(168, 85, 247, ' : 'rgba(124, 58, 237, ';
      const emerald = dark ? 'rgba(16, 185, 129, ' : 'rgba(5, 150, 105, ';

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += 0.03;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Mouse attraction
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 0.8;
          p.x += (dxMouse / distMouse) * force * 1.5;
          p.y += (dyMouse / distMouse) * force * 1.5;
        }

        // Color
        let baseColor = cyan;
        if (p.colorIndex === 1) baseColor = violet;
        if (p.colorIndex === 2) baseColor = emerald;

        const dynamicRadius = p.baseRadius + Math.sin(p.pulse) * 0.6;
        const alpha = dark ? 0.65 : 0.45;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, dynamicRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${alpha})`;
        ctx.shadowBlur = dark ? 12 : 4;
        ctx.shadowColor = `${baseColor}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw synaptic connections
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (dark ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${cyan}${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Occasional synaptic pulse bead
            if ((i + j) % 7 === 0) {
              const progress = (Math.sin(time * 2 + i) + 1) / 2;
              const px = particles[i].x + (particles[j].x - particles[i].x) * progress;
              const py = particles[i].y + (particles[j].y - particles[i].y) * progress;
              ctx.beginPath();
              ctx.arc(px, py, 1.4, 0, Math.PI * 2);
              ctx.fillStyle = `${violet}0.8)`;
              ctx.fill();
            }
          }
        }

        // Connect to mouse if close
        const dxM = mouse.x - particles[i].x;
        const dyM = mouse.y - particles[i].y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < mouse.radius) {
          const alpha = (1 - distM / mouse.radius) * (dark ? 0.45 : 0.25);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${cyan}${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85
        }}
      />
      {/* Aurora Ambient Glow Orbs */}
      <div
        className="aurora-orb aurora-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 68%)',
          filter: 'blur(70px)',
          animation: 'floatSlow 24s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />
      <div
        className="aurora-orb aurora-2"
        style={{
          position: 'absolute',
          top: '35%',
          right: '-5%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.11) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'floatSlow 28s ease-in-out infinite alternate-reverse',
          pointerEvents: 'none'
        }}
      />
      <div
        className="aurora-orb aurora-3"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '25%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'floatSlow 22s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />
      {/* Cyber Grid Mask Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 75%)',
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
