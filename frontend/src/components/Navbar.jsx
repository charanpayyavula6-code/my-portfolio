import { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  ArrowUpRight,
  Home,
  User,
  Code2,
  FolderGit2,
  Award,
  GraduationCap,
  Sparkles,
  Mail,
  Volume2,
  VolumeX,
  Search,
  Bot
} from 'lucide-react';
import { profileData, navLinks } from '../data/profile';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { soundFX } from '../utils/audio';

// Section icon mapping for mobile drawer
const sectionIcons = {
  home: Home,
  about: User,
  skills: Code2,
  projects: FolderGit2,
  certifications: Award,
  education: GraduationCap,
  activities: Sparkles,
  contact: Mail
};

export default function Navbar({
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenCommandPalette,
  onOpenAI,
  isSoundEnabled,
  onToggleSound
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll-spy active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height, 68px)',
        zIndex: 100,
        backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.25)' : 'none',
        transition: 'all var(--transition-base)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Payyavula Sri Charan Homepage"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          {/* Monogram Badge */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(129, 140, 248, 0.08))',
              border: '1px solid var(--border-color-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(56, 189, 248, 0.15)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'var(--border-color-hover)';
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.05rem',
                background: 'var(--grad-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              SC
            </span>
          </div>

          {/* Name & Live Status */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}
            >
              {profileData.shortName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1px' }}>
              <span className="status-dot-ping">
                <span className="ping" />
                <span className="dot" />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.02em'
                }}
              >
                Available for roles
              </span>
            </div>
          </div>
        </a>

        {/* Center: Desktop Segmented Pill Navigation Menu */}
        <nav
          className="desktop-nav-dock"
          aria-label="Main Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            background: 'var(--nav-pill-bg)',
            border: '1px solid var(--nav-pill-border)',
            borderRadius: 'var(--radius-full)',
            padding: '3px 4px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            gap: '2px'
          }}
        >
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--nav-pill-active-text)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--nav-pill-active-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--nav-pill-active-border)' : '1px solid transparent',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 1px 4px rgba(0, 0, 0, 0.15)' : 'none',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--nav-pill-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right-Side Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexShrink: 0
          }}
        >
          {/* Quick GitHub Link (Desktop) */}
          <a
            href={profileData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub Profile"
            className="nav-social-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <GithubIcon size={16} />
          </a>

          {/* Quick LinkedIn Link (Desktop) */}
          <a
            href={profileData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
            className="nav-social-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LinkedinIcon size={16} />
          </a>

          {/* Command Palette Trigger (Desktop & Mobile) */}
          <button
            onClick={() => {
              if (onOpenCommandPalette) onOpenCommandPalette();
              soundFX.playSwitch();
            }}
            aria-label="Open Command Palette (Ctrl+K)"
            title="Open Command Palette (Ctrl+K)"
            style={{
              height: '36px',
              padding: '0 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Search size={14} />
            <span style={{ display: 'none' }} className="nav-cmd-label">
              Ctrl+K
            </span>
          </button>

          {/* Audio FX Toggle Button */}
          <button
            onClick={() => {
              if (onToggleSound) onToggleSound();
            }}
            aria-label={isSoundEnabled ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX'}
            title={isSoundEnabled ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: isSoundEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Ask AI Copilot Header Trigger */}
          <button
            onClick={() => {
              if (onOpenAI) onOpenAI();
              soundFX.playSwitch();
            }}
            aria-label="Open Charan AI Copilot"
            title="Ask Charan AI Copilot"
            style={{
              height: '36px',
              padding: '0 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              color: 'var(--text-primary)',
              display: 'none',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            className="nav-ai-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Bot size={15} color="#00f0ff" />
            <span>AI Copilot</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 6px #10b981'
              }}
            />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              onToggleTheme();
              soundFX.playSwitch();
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {theme === 'dark' ? (
              <Sun size={16} color="var(--accent-amber)" />
            ) : (
              <Moon size={16} color="var(--accent-blue)" />
            )}
          </button>

          {/* Professional Résumé Pill Button */}
          <button
            onClick={() => {
              onOpenResume();
              soundFX.playSwitch();
            }}
            className="nav-action-resume"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.42rem 0.95rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              backdropFilter: 'blur(8px)',
              transition: 'all var(--transition-fast)'
            }}
            id="nav-resume-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.background = 'var(--nav-pill-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.background = 'var(--nav-btn-ghost-bg)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FileText size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>Résumé</span>
          </button>

          {/* Professional Let's Connect CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-action-connect"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 1.15rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #8b5cf6 100%)',
              color: '#030712',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
              transition: 'all var(--transition-fast)'
            }}
            id="nav-connect-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.35)';
            }}
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--nav-btn-ghost-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Modern Glassmorphic Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height, 68px)',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 998
          }}
        >
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              padding: '1.25rem 1.5rem 1.75rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: 'calc(100vh - var(--nav-height, 68px))',
              overflowY: 'auto',
              animation: 'fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Nav Links Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.45rem'
              }}
            >
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                const IconComponent = sectionIcons[sectionId] || Sparkles;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--nav-pill-active-text)' : 'var(--text-primary)',
                      background: isActive ? 'var(--nav-pill-active-bg)' : 'transparent',
                      border: isActive ? '1px solid var(--nav-pill-active-border)' : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <IconComponent
                      size={16}
                      style={{
                        color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                        flexShrink: 0
                      }}
                    />
                    <span>{link.name}</span>
                    {isActive && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-blue)'
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Actions Divider */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.55rem 0.85rem',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-full)',
                    gap: '0.4rem'
                  }}
                >
                  <FileText size={15} style={{ color: 'var(--accent-blue)' }} />
                  <span>Résumé</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn btn-primary"
                  style={{
                    padding: '0.55rem 0.85rem',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-full)',
                    gap: '0.4rem'
                  }}
                >
                  <span>Connect</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              {/* Mobile Socials Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  paddingTop: '0.5rem'
                }}
              >
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <span style={{ color: 'var(--border-color)' }}>•</span>
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Queries for Desktop & Tablet Navbar */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-dock {
            display: flex !important;
          }
          .nav-action-resume,
          .nav-action-connect,
          .nav-social-btn,
          .nav-ai-btn {
            display: inline-flex !important;
          }
          .nav-cmd-label {
            display: inline !important;
          }
          #mobile-menu-toggle {
            display: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .nav-action-connect {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
