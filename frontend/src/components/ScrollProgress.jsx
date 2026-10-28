import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollPercentage}%`,
        height: '3px',
        background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan), var(--accent-violet))',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none'
      }}
      role="progressbar"
      aria-valuenow={Math.round(scrollPercentage)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Page reading progress"
    />
  );
}
