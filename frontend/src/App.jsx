import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import ResumeModal from './components/ResumeModal';
import ScrollProgress from './components/ScrollProgress';
import NeuralBackground from './components/NeuralBackground';
import CyberCursor from './components/CyberCursor';
import CommandPalette from './components/CommandPalette';
import AICopilot from './components/AICopilot';
import { soundFX } from './utils/audio';
import './styles/global.css';
import './styles/responsive.css';

export default function App() {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('charan_portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // Default to dark theme
    }
    return 'dark';
  });

  // Sound FX enabled state
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundFX.enabled);

  // Intro screen state
  const [showIntro, setShowIntro] = useState(false);

  // Resume modal state
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Command Palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // AI Copilot state
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Sync theme to <html> data-theme attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('charan_portfolio_theme', theme);
    } catch {
      // Ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const newState = soundFX.toggle();
    setIsSoundEnabled(newState);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Dynamic Interactive Neural Constellation Background */}
      <NeuralBackground />

      {/* Futuristic Custom Cyber Cursor */}
      <CyberCursor />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Full-Screen Welcome Introduction */}
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      {/* Main Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAI={() => setIsAIOpen((prev) => !prev)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
      />

      <main id="main-content" style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        {/* About Me Section */}
        <About />

        {/* Technical Skills Section */}
        <Skills />

        {/* Featured Projects Section */}
        <Projects />

        {/* Certifications & Learning */}
        <Certifications />

        {/* Education Timeline */}
        <Education />

        {/* Leadership & Activities */}
        <Activities />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onReplayIntro={handleReplayIntro}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Résumé Modal */}
      {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={(shouldOpen) => setIsCommandPaletteOpen(shouldOpen === true ? true : false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTheme={toggleTheme}
        theme={theme}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Charan AI Interactive Copilot Assistant */}
      <AICopilot
        isOpen={isAIOpen}
        onToggle={() => setIsAIOpen((prev) => !prev)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}
