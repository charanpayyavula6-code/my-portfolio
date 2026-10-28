import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  FolderGit2,
  Code2,
  Award,
  GraduationCap,
  Mail,
  User,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Bot
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { profileData } from '../data/profile';
import { soundFX } from '../utils/audio';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onToggleTheme,
  theme,
  isSoundEnabled,
  onToggleSound,
  onOpenAI
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      soundFX.playSwitch();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // Signal to open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build items list
  const baseActions = [
    {
      id: 'ai-assistant',
      title: 'Ask Charan AI Assistant',
      category: 'AI Copilot',
      icon: Bot,
      action: () => {
        onClose();
        if (onOpenAI) onOpenAI();
      }
    },
    {
      id: 'resume',
      title: 'Inspect Official Résumé',
      category: 'Actions',
      icon: GraduationCap,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'copy-email',
      title: `Copy Email: ${profileData.contact.email}`,
      category: 'Actions',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(profileData.contact.email);
        soundFX.playSuccess();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'toggle-sound',
      title: isSoundEnabled ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX',
      category: 'Settings',
      icon: isSoundEnabled ? VolumeX : Volume2,
      action: () => {
        onToggleSound();
      }
    },
    {
      id: 'toggle-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'OLED Dark'} Theme`,
      category: 'Settings',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        onToggleTheme();
        soundFX.playSwitch();
        onClose();
      }
    },
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Command Deck (Hero)',
      category: 'Navigation',
      icon: Terminal,
      action: () => {
        onClose();
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-about',
      title: 'Go to Neural Blueprint (About Me)',
      category: 'Navigation',
      icon: User,
      action: () => {
        onClose();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-skills',
      title: 'Go to Technical Skills Matrix',
      category: 'Navigation',
      icon: Code2,
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Engineering Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-certifications',
      title: 'Go to Credentials & Certifications',
      category: 'Navigation',
      icon: Award,
      action: () => {
        onClose();
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-contact',
      title: 'Go to Quantum Transceiver (Contact)',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  // Projects
  const projectItems = projectsData.map((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(', ')}`,
    category: 'Projects',
    icon: FolderGit2,
    action: () => {
      onClose();
      const elem = document.getElementById('projects');
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  // Flattened Skills
  const skillItems = [];
  skillCategories.forEach((cat) => {
    cat.skills.forEach((s) => {
      skillItems.push({
        id: `skill-${cat.id}-${s.name}`,
        title: `${s.name} (${s.level})`,
        subtitle: `${cat.title} — ${s.description}`,
        category: 'Skills',
        icon: Code2,
        action: () => {
          onClose();
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

  const allItems = [...baseActions, ...projectItems, ...skillItems];

  // Filter items
  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : baseActions;

  // Keyboard navigation inside modal
  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      soundFX.playBlip(900, 0.02);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      soundFX.playBlip(900, 0.02);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '12vh 1rem 2rem 1rem',
        backgroundColor: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          boxShadow: '0 0 50px rgba(0, 240, 255, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.85)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNavigation}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <Search size={20} color="var(--accent-cyan)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, skill, or ask anything..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            ESC
          </span>
        </div>

        {/* Results List */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '0.5rem'
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}
            >
              No matching commands or telemetry found. Try searching &quot;Python&quot;, &quot;AI&quot;, or &quot;Projects&quot;.
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon || Sparkles;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    soundFX.playBlip(1000, 0.04);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    background: isSelected
                      ? 'linear-gradient(90deg, rgba(0, 240, 255, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)'
                      : 'transparent',
                    border: isSelected
                      ? '1px solid rgba(0, 240, 255, 0.4)'
                      : '1px solid transparent',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: isSelected ? '#00f0ff' : 'var(--text-secondary)'
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>{item.title}</span>
                      {copied && item.id === 'copy-email' && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#10b981',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          <Check size={12} /> Copied!
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      background: isSelected ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    {item.category}
                  </span>
                  {isSelected && <ArrowRight size={14} color="var(--accent-cyan)" />}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 1.25rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.25)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <span>
              <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>↑↓</kbd> Navigate
            </span>
            <span>
              <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>↵</kbd> Select
            </span>
            <span>
              <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 5px', borderRadius: '4px' }}>esc</kbd> Dismiss
            </span>
          </div>
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
            Charan Neural OS v3.8
          </span>
        </div>
      </div>
    </div>
  );
}
