import { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  FileText,
  Cpu,
  Code2,
  Database,
  Layers,
  Sparkles,
  Terminal as TerminalIcon,
  Activity,
  CheckCircle2,
  Zap,
  Bot
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { soundFX } from '../utils/audio';

export default function Hero({ onOpenResume, onOpenAI }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('neural'); // 'neural' | 'terminal' | 'telemetry'

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Sri Charan Neural OS v3.8 initialized. Type "help" or click chips below.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const terminalEndRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = profileData.roles[roleIndex];
    let timer;

    if (!isDeleting && displayedText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }, 55);
    } else if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText !== '') {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % profileData.roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    soundFX.playSwitch();
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Terminal Command Executor
  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    soundFX.playTerminal();

    const newEntries = [{ type: 'input', text: `charan@neural-os:~$ ${raw}` }];

    if (cmd === 'help') {
      newEntries.push({
        type: 'output',
        text: `AVAILABLE PROTOCOLS:
  • skills     - Print core AI & systems competency matrix
  • projects   - Inspect featured production prototypes
  • whoami     - Display credentials & academic summary
  • matrix     - Execute quantum cyber rain simulation
  • sudo hire  - Trigger instant hiring dispatch celebration
  • contact    - Fetch secure communication endpoints
  • clear      - Flush terminal buffer`
      });
    } else if (cmd === 'skills') {
      newEntries.push({
        type: 'output',
        text: `CORE DISCIPLINES:
  [AI/ML]      Scikit-learn, OpenCV, YOLO, PyTorch, RAG, Vector Search
  [BACKEND]    Python, FastAPI, Flask, REST APIs, System Architecture
  [WEB]        React, JavaScript (ES6+), Modern CSS, HTML5
  [DATABASES]  SQL, MySQL, MongoDB Atlas, PostgreSQL`
      });
    } else if (cmd === 'projects') {
      newEntries.push({
        type: 'output',
        text: projectsData
          .map((p, i) => `[0${i + 1}] ${p.title} (${p.category}) -> ${p.status}`)
          .join('\n')
      });
    } else if (cmd === 'whoami') {
      newEntries.push({
        type: 'output',
        text: `${profileData.fullName}
Degree:  ${profileData.educationSummary.degree}
College: ${profileData.educationSummary.institution}
Status:  ${profileData.educationSummary.level} (${profileData.educationSummary.status})
Focus:   ${profileData.headline}`
      });
    } else if (cmd === 'contact') {
      newEntries.push({
        type: 'output',
        text: `ENDPOINTS:
  Email:    ${profileData.contact.email}
  GitHub:   ${profileData.socialLinks.github}
  LinkedIn: ${profileData.socialLinks.linkedin}
  Location: ${profileData.contact.location}`
      });
    } else if (cmd === 'matrix') {
      setShowMatrixRain(true);
      soundFX.playSuccess();
      setTimeout(() => setShowMatrixRain(false), 4000);
      newEntries.push({
        type: 'output',
        text: `[!] Entering the Matrix... Synchronizing neural stream.`
      });
    } else if (cmd.includes('hire') || cmd.includes('sudo hire')) {
      soundFX.playSuccess();
      newEntries.push({
        type: 'output',
        text: `🎉 EXCELLENT DECISION!
Offer recognized: Payyavula Sri Charan is ready for high-impact AI/ML engineering roles.
Redirecting you to official contact channels...`
      });
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      newEntries.push({
        type: 'error',
        text: `Unknown protocol "${raw}". Type "help" for valid commands.`
      });
    }

    setTerminalHistory((prev) => [...prev, ...newEntries]);
    setTerminalInput('');
  };

  return (
    <section id="home" className="section-padding" style={{ paddingTop: 'calc(var(--space-2xl) + 1rem)' }}>
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.95fr)',
            gap: 'var(--space-3xl)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Command & Identity */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Neural Online Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.42rem 1.05rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                width: 'fit-content',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.18)'
              }}
            >
              <span className="status-dot-ping">
                <span className="ping" />
                <span className="dot" />
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                AVAILABLE FOR OPPORTUNITIES • B.E. AI &amp; ML (GPA 7.5)
              </span>
            </div>

            {/* Candidate Name Title */}
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5.2vw, 4.25rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                marginBottom: '1rem'
              }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Payyavula </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #6366f1 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.35))'
                }}
              >
                Sri Charan
              </span>
            </h1>

            {/* Terminal Specialization Runner */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                fontWeight: 600,
                color: 'var(--accent-cyan)',
                marginBottom: '1.25rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                width: 'fit-content'
              }}
            >
              <span style={{ color: 'var(--accent-purple)', marginRight: '0.5rem' }}>&gt;</span>
              <span>{displayedText}</span>
              <span className="cursor-blink" />
            </div>

            {/* Core Headline & Bio */}
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.4,
                marginBottom: '0.9rem'
              }}
            >
              {profileData.headline}
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
                maxWidth: '560px'
              }}
            >
              {profileData.heroBio}
            </p>

            {/* Telemetry Stats Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '2rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem'
                }}
              >
                <Zap size={14} color="#00f0ff" />
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>98.4%</span>
                <span style={{ color: 'var(--text-muted)' }}>Precision Focus</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem'
                }}
              >
                <Activity size={14} color="#10b981" />
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>3rd Year</span>
                <span style={{ color: 'var(--text-muted)' }}>B.E. AI &amp; ML</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.8rem'
                }}
              >
                <Sparkles size={14} color="#a855f7" />
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>End-to-End</span>
                <span style={{ color: 'var(--text-muted)' }}>Full-Stack Systems</span>
              </div>
            </div>

            {/* Action Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '2rem'
              }}
            >
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, '#projects')}
                className="btn btn-primary"
              >
                <span>Explore Projects</span>
                <ArrowDown size={17} />
              </a>

              <button
                onClick={() => {
                  soundFX.playSwitch();
                  onOpenResume();
                }}
                className="btn btn-secondary"
              >
                <FileText size={17} />
                <span>Inspect Résumé</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playSwitch();
                  setActiveTab('terminal');
                }}
                className="btn btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem'
                }}
              >
                <TerminalIcon size={15} />
                <span>Launch CLI</span>
              </button>
            </div>

            {/* Quick Connect & Social Radar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                CONNECT PROTOCOLS:
              </span>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-radar-btn"
                  title="GitHub Profile"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <GithubIcon size={17} />
                </a>

                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-radar-btn"
                  title="LinkedIn Profile"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <LinkedinIcon size={17} />
                </a>

                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="social-radar-btn"
                  title="Direct Email"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Mail size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Next-Gen Cyberdeck HUD */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgba(10, 16, 31, 0.85) 0%, rgba(6, 11, 24, 0.95) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.18), 0 25px 60px -15px rgba(0, 0, 0, 0.85)',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            className="interactive-card"
          >
            {/* Top Deck Mode Selector Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.15rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(0, 0, 0, 0.35)'
              }}
            >
              {/* Traffic light LEDs */}
              <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f43f5e' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span
                  style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  NEURAL_DECK::01
                </span>
              </div>

              {/* Mode switch buttons */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  onClick={() => {
                    setActiveTab('neural');
                    soundFX.playSwitch();
                  }}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    background: activeTab === 'neural' ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                    color: activeTab === 'neural' ? '#00f0ff' : 'var(--text-muted)',
                    border: `1px solid ${activeTab === 'neural' ? 'rgba(0, 240, 255, 0.4)' : 'transparent'}`
                  }}
                >
                  Neural Core
                </button>
                <button
                  onClick={() => {
                    setActiveTab('terminal');
                    soundFX.playSwitch();
                  }}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    background: activeTab === 'terminal' ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                    color: activeTab === 'terminal' ? '#00f0ff' : 'var(--text-muted)',
                    border: `1px solid ${activeTab === 'terminal' ? 'rgba(0, 240, 255, 0.4)' : 'transparent'}`
                  }}
                >
                  Live CLI
                </button>
                <button
                  onClick={() => {
                    setActiveTab('telemetry');
                    soundFX.playSwitch();
                  }}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    background: activeTab === 'telemetry' ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                    color: activeTab === 'telemetry' ? '#00f0ff' : 'var(--text-muted)',
                    border: `1px solid ${activeTab === 'telemetry' ? 'rgba(0, 240, 255, 0.4)' : 'transparent'}`
                  }}
                >
                  Telemetry
                </button>
              </div>
            </div>

            {/* TAB 1: NEURAL CORE VISUALIZER */}
            {activeTab === 'neural' && (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* SVG Neural Layer Model */}
                <div
                  style={{
                    height: '240px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, rgba(4, 8, 19, 0.95) 100%)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 440 220"
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <defs>
                      <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Connecting Synaptic Lines */}
                    {[50, 110, 170].map((y1, i) =>
                      [35, 75, 115, 155, 195].map((y2, j) => (
                        <line
                          key={`l1-${i}-${j}`}
                          x1="70"
                          y1={y1}
                          x2="220"
                          y2={y2}
                          stroke="url(#synapseGrad)"
                          strokeWidth="1"
                          strokeOpacity="0.3"
                        />
                      ))
                    )}

                    {[35, 75, 115, 155, 195].map((y2, j) =>
                      [80, 140].map((y3, k) => (
                        <line
                          key={`l2-${j}-${k}`}
                          x1="220"
                          y1={y2}
                          x2="370"
                          y2={y3}
                          stroke="url(#synapseGrad)"
                          strokeWidth="1"
                          strokeOpacity="0.3"
                        />
                      ))
                    )}

                    {/* Input Layer Nodes (3) */}
                    {[50, 110, 170].map((y, i) => (
                      <g key={`in-${i}`}>
                        <circle cx="70" cy={y} r="10" fill="#00f0ff" filter="url(#glow)" />
                        <circle cx="70" cy={y} r="5" fill="#ffffff" />
                        <text x="60" y={y - 14} fill="#00f0ff" fontSize="9" fontFamily="var(--font-mono)">
                          x_{i}
                        </text>
                      </g>
                    ))}

                    {/* Hidden Layer Nodes (5) */}
                    {[35, 75, 115, 155, 195].map((y, j) => (
                      <g key={`hid-${j}`}>
                        <circle cx="220" cy={y} r="8" fill="#8b5cf6" filter="url(#glow)" />
                        <circle cx="220" cy={y} r="4" fill="#ffffff" />
                      </g>
                    ))}

                    {/* Output Layer Nodes (2) */}
                    {[80, 140].map((y, k) => (
                      <g key={`out-${k}`}>
                        <circle cx="370" cy={y} r="11" fill="#ec4899" filter="url(#glow)" />
                        <circle cx="370" cy={y} r="5" fill="#ffffff" />
                        <text x="360" y={y + 22} fill="#ec4899" fontSize="9" fontFamily="var(--font-mono)">
                          {k === 0 ? 'ŷ_prob' : 'ŷ_class'}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Pulsing telemetry overlay tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    FORWARD_PASS::TENSOR_OP_ACTIVE
                  </div>
                </div>

                {/* Real-Time Neural Metrics Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.65rem'
                  }}
                >
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      EPOCHS
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      480/500
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      LOSS
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>
                      0.0012
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      WEIGHTS
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                      7.2B
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      LATENCY
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f59e0b' }}>
                      18ms
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Trigger */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 240, 255, 0.06)',
                    border: '1px solid rgba(0, 240, 255, 0.2)'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Looking for intelligent model pipelines?
                  </span>
                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Connect Now</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE LIVE CLI TERMINAL */}
            {activeTab === 'terminal' && (
              <div
                style={{
                  height: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--terminal-bg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  position: 'relative'
                }}
              >
                {/* Matrix Rain Easter Egg */}
                {showMatrixRain && (
                  <div className="matrix-rain-overlay">
                    <div>01000011 01001000 01000001 01010010 01000001 01001110</div>
                    <div>&gt; INJECTING NEURAL MATRIX KERNEL... SUCCESS</div>
                    <div>&gt; QUANTUM WEIGHTS CONVERGED :: LOSS 0.0000</div>
                    <div>&gt; WELCOME TO THE AI SYSTEM DECK</div>
                  </div>
                )}

                {/* Output log */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0.95rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}
                >
                  {terminalHistory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        color:
                          item.type === 'input'
                            ? '#00f0ff'
                            : item.type === 'error'
                            ? '#f43f5e'
                            : item.type === 'system'
                            ? '#a855f7'
                            : 'var(--text-primary)',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.45
                      }}
                    >
                      {item.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Quick Chips */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.35rem',
                    padding: '0.35rem 0.8rem',
                    overflowX: 'auto',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {['help', 'skills', 'projects', 'whoami', 'matrix', 'sudo hire', 'clear'].map((c) => (
                    <button
                      key={c}
                      onClick={() => executeCommand(c)}
                      style={{
                        padding: '0.18rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(0, 240, 255, 0.2)'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Input Prompt Line */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeCommand(terminalInput);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.55rem 0.8rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <span style={{ color: '#00f0ff', marginRight: '0.45rem' }}>&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command..."
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem'
                    }}
                  />
                </form>
              </div>
            )}

            {/* TAB 3: SYSTEM TELEMETRY */}
            {activeTab === 'telemetry' && (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  COMPUTATION TELEMETRY &amp; MASTERY GAUGES
                </div>

                {[
                  { label: 'Deep Learning & Computer Vision (YOLO/PyTorch)', val: 94, color: '#00f0ff' },
                  { label: 'Python & Scalable Backends (FastAPI/Flask)', val: 92, color: '#8b5cf6' },
                  { label: 'Full-Stack Modern Web (React/Vite)', val: 90, color: '#ec4899' },
                  { label: 'Databases & Vector Retrieval (SQL/MongoDB)', val: 88, color: '#10b981' }
                ].map((gauge, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{gauge.label}</span>
                      <span style={{ fontWeight: 700, color: gauge.color, fontFamily: 'var(--font-mono)' }}>
                        {gauge.val}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: '7px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${gauge.val}%`,
                          borderRadius: 'var(--radius-full)',
                          background: `linear-gradient(90deg, ${gauge.color} 0%, #ffffff 100%)`,
                          boxShadow: `0 0 10px ${gauge.color}`,
                          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>UPTIME: 99.98%</span>
                  <span>BUILD: PRODUCTION</span>
                  <span style={{ color: '#10b981' }}>HEALTH: 100%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
