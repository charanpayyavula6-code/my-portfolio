import { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is interactive
      const target = e.target;
      const isInteractive = !!target.closest(
        'button, a, input, textarea, select, .interactive-card, [role="button"], .tab-chip'
      );
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing animation loop
    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient Mouse Spotlight Glow */}
      <div
        style={{
          position: 'fixed',
          left: trailingPos.x,
          top: trailingPos.y,
          transform: 'translate(-50%, -50%)',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, rgba(168, 85, 247, 0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />
      {/* Outer Spring Ring */}
      <div
        style={{
          position: 'fixed',
          left: trailingPos.x,
          top: trailingPos.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovered ? 1.6 : 1})`,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'rgba(0, 240, 255, 0.9)' : 'rgba(168, 85, 247, 0.6)'}`,
          boxShadow: isHovered
            ? '0 0 16px rgba(0, 240, 255, 0.6), inset 0 0 8px rgba(0, 240, 255, 0.3)'
            : '0 0 8px rgba(168, 85, 247, 0.3)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent'
        }}
      />
      {/* Inner Pinpoint Dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          borderRadius: '50%',
          backgroundColor: isHovered ? '#00f0ff' : '#ffffff',
          boxShadow: '0 0 8px #00f0ff',
          pointerEvents: 'none',
          zIndex: 100000,
          transition: 'width 0.1s ease, height 0.1s ease, background-color 0.2s ease'
        }}
      />
    </>
  );
}
