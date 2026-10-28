import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Terminal,
  User,
  GraduationCap,
  Code2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { soundFX } from '../utils/audio';

export default function AICopilot({ isOpen, onToggle, onOpenResume }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I'm **Charan's AI Copilot**, engineered to walk you through Sri Charan's technical architecture, AI/ML expertise, and projects. What would you like to explore?`,
      timestamp: 'Online'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const samplePrompts = [
    '🚀 Why hire Sri Charan?',
    '🧠 What are his AI & ML projects?',
    '🛠️ What is his full tech stack?',
    '🎓 Education & College details',
    '📫 How can I contact him?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent local response generation for all questions
  const generateResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('why hire') || q.includes('hire') || q.includes('why should') || q.includes('strength')) {
      return {
        text: `### 🌟 Why Hire Payyavula Sri Charan?
1. **Strong Mathematical & Practical AI Foundations**: Unlike developers who only call APIs, Sri Charan understands ML from ground up—loss functions, vector embeddings, cross-validation, and computer vision architectures.
2. **End-to-End Execution**: Combines machine learning models with **Python backends (FastAPI/Flask)** and responsive **React interfaces**, meaning he can build entire intelligent systems independently.
3. **Continuous Curiosity & Integrity**: Verified MongoDB coursework in **RAG & Vector Search**, active hands-on exploration of YOLO architectures, and relentless drive as a 3rd-year CS (AI & ML) engineer.`,
        actionLabel: 'Inspect Résumé',
        actionType: 'resume'
      };
    }

    if (q.includes('project') || q.includes('ai project') || q.includes('build') || q.includes('portfolio')) {
      const topProjects = projectsData.slice(0, 3);
      return {
        text: `### 🚀 Featured Engineering Highlights:
- **${topProjects[0].title}** (${topProjects[0].category}): Uses YOLO & OpenCV to detect worker safety equipment and PPE compliance.
- **${topProjects[1].title}** (${topProjects[1].category}): Role-based decoupled architecture with React, REST APIs, and normalized SQL.
- **${topProjects[2].title}** (${topProjects[2].category}): Supervised clinical parameter classification using Scikit-learn pipelines with precision-recall benchmarks.`,
        actionLabel: 'Explore All Projects',
        actionType: 'navigate',
        targetId: 'projects'
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('tool')) {
      return {
        text: `### 🛠️ Core Technical Stack:
- **Languages**: Python (Primary), Java (OOP), SQL (MySQL/PostgreSQL), JavaScript (ES6+)
- **AI & ML**: Machine Learning pipelines, Scikit-learn, OpenCV, YOLO, TensorFlow, RAG, Vector Search
- **Web & Backend**: React, HTML5/Modern CSS, REST APIs, Flask/Python
- **Data & Tools**: MongoDB, Git/GitHub, Vite, NumPy, Pandas, Data Structures & Algorithms`,
        actionLabel: 'View Skills Matrix',
        actionType: 'navigate',
        targetId: 'skills'
      };
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('prathyusha')) {
      return {
        text: `### 🎓 Academic Credentials:
- **Degree**: ${profileData.educationSummary.degree}
- **Institution**: ${profileData.educationSummary.institution}
- **Current Standing**: ${profileData.educationSummary.level} (${profileData.educationSummary.status})
- **Location**: Chennai, Tamil Nadu, India`,
        actionLabel: 'View Education Timeline',
        actionType: 'navigate',
        targetId: 'education'
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('phone') || q.includes('location')) {
      return {
        text: `### 📬 Connect with Sri Charan:
- **Email**: [${profileData.contact.email}](mailto:${profileData.contact.email})
- **Location**: ${profileData.contact.location}
- **Availability**: ${profileData.contact.availability}
- **GitHub**: [github.com/charanpayyavula](${profileData.socialLinks.github})
- **LinkedIn**: [linkedin.com/in/charanpayyavula](${profileData.socialLinks.linkedin})`,
        actionLabel: 'Open Transceiver Form',
        actionType: 'navigate',
        targetId: 'contact'
      };
    }

    // Default intelligent fallback
    return {
      text: `Payyavula Sri Charan is an **AI/ML Engineer and Full-Stack Developer** studying B.E. Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Prathyusha Engineering College, Chennai. 

He specializes in **machine learning pipelines, computer vision (OpenCV/YOLO), Python backends, and modern React interfaces**. Feel free to inspect his projects or download his official resume!`,
      actionLabel: 'Inspect Résumé',
      actionType: 'resume'
    };
  };

  const handleSend = async (textToSend = inputText) => {
    if (!textToSend.trim() || isTyping) return;

    soundFX.playTerminal();
    const cleanText = textToSend.trim();
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: cleanText,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    let replyText = null;

    // Try live Django AI Copilot endpoint
    try {
      const res = await fetch('http://localhost:8000/api/ai/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          replyText = data.reply;
        }
      }
    } catch {
      // Backend not running; use local generator
    }

    // Fallback to local response synthesizer if backend didn't respond
    const resp = generateResponse(cleanText);
    soundFX.playBlip(750, 0.05);

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText || resp.text,
        actionLabel: resp.actionLabel,
        actionType: resp.actionType,
        targetId: resp.targetId,
        timestamp: 'Now'
      }
    ]);
    setIsTyping(false);
  };

  const handleActionClick = (msg) => {
    soundFX.playSwitch();
    if (msg.actionType === 'resume') {
      onOpenResume();
    } else if (msg.actionType === 'navigate' && msg.targetId) {
      const elem = document.getElementById(msg.targetId);
      elem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Trigger Button in bottom-right */}
      <button
        onClick={() => {
          onToggle();
          soundFX.playSwitch();
        }}
        style={{
          position: 'fixed',
          bottom: '1.85rem',
          right: '1.85rem',
          zIndex: 99990,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)',
          color: '#030712',
          fontWeight: 700,
          fontSize: '0.88rem',
          letterSpacing: '-0.01em',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 10px 25px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="ai-copilot-trigger"
        aria-label="Open Charan AI Copilot"
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#030712',
            color: '#00f0ff'
          }}
        >
          <Bot size={15} />
        </span>
        <span>Ask Charan AI</span>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }}
        />
      </button>

      {/* Floating Assistant Dialog */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.85rem',
            width: 'min(420px, calc(100vw - 2.5rem))',
            height: 'min(580px, calc(100vh - 8rem))',
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 240, 255, 0.2)',
            zIndex: 99995,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.9rem 1.15rem',
              borderBottom: '1px solid var(--border-color)',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#030712'
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Charan AI Assistant
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'inline-block'
                    }}
                  />
                  Neural Telemetry Active
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onToggle();
                soundFX.playBlip();
              }}
              style={{
                color: 'var(--text-muted)',
                padding: '0.35rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.25rem'
                }}
              >
                <div
                  style={{
                    maxWidth: '88%',
                    padding: '0.75rem 0.95rem',
                    borderRadius:
                      m.role === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                    background:
                      m.role === 'user'
                        ? 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                    color: m.role === 'user' ? '#030712' : 'var(--text-primary)',
                    border:
                      m.role === 'user'
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.86rem',
                    lineHeight: '1.45',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{
                      __html: m.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/### (.*?)\n/g, '<h4 style="margin: 0.3rem 0; color: var(--accent-cyan);">$1</h4>')
                        .replace(/- \*\*(.*?)\*\*/g, '• <strong>$1</strong>')
                    }}
                  />
                  {m.actionLabel && (
                    <button
                      onClick={() => handleActionClick(m)}
                      style={{
                        marginTop: '0.65rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 240, 255, 0.15)',
                        border: '1px solid rgba(0, 240, 255, 0.4)',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <span>{m.actionLabel}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  gap: '0.3rem'
                }}
              >
                <span className="dot-typing" />
                <span className="dot-typing" />
                <span className="dot-typing" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div
            style={{
              padding: '0.4rem 0.8rem',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              borderTop: '1px solid var(--border-color)',
              background: 'rgba(0, 0, 0, 0.2)'
            }}
          >
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.73rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-card)'
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about Sri Charan..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '0.55rem 0.95rem',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: inputText.trim()
                  ? 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: inputText.trim() ? '#030712' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputText.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
