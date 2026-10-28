import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Clock, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 'var(--space-2xl)' }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.785rem',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{project.category}</span>
              <span>•</span>
              <span
                style={{
                  color: project.status === 'Completed' ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                }}
              >
                Status: {project.status}
              </span>
            </div>

            <h2
              id="modal-project-title"
              style={{
                fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.25
              }}
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Conceptual Blueprint Banner */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.05))',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
                flexShrink: 0
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Engineering Blueprint &amp; Architecture
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                This card reflects genuine exploratory work and conceptualization by Payyavula Sri Charan.
              </div>
            </div>
          </div>

          {/* 1. Problem Statement */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem'
              }}
            >
              01. The Problem Statement
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.problemStatement}
            </p>
          </div>

          {/* 2. Objective */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem'
              }}
            >
              02. Project Objective
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.objective}
            </p>
          </div>

          {/* 3. Proposed Solution */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem'
              }}
            >
              03. Proposed or Implemented Solution
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.proposedSolution}
            </p>
          </div>

          {/* 4. Technologies Used */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.6rem'
              }}
            >
              04. Technologies &amp; Libraries
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag" style={{ padding: '0.35rem 0.8rem', fontSize: '0.825rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Charan's Contribution */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem'
              }}
            >
              05. Individual Contribution
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.charanContribution}
            </p>
          </div>

          {/* 6. Challenges and Learning Outcomes */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem'
              }}
            >
              06. Key Challenges &amp; Learning Outcomes
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.challengesAndLearnings}
            </p>
          </div>

          {/* Feature Implementation Status (Clearly distinguishing planned vs implemented) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Implemented Features */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-emerald)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem'
                }}
              >
                <CheckCircle2 size={16} />
                <span>Implemented / Validated</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {project.features.implemented.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.4rem'
                    }}
                  >
                    <span style={{ color: 'var(--accent-emerald)', marginTop: '2px' }}>•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Planned Features */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-amber)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem'
                }}
              >
                <Clock size={16} />
                <span>Planned Roadmap</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {project.features.planned.map((feat, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.4rem'
                    }}
                  >
                    <span style={{ color: 'var(--accent-amber)', marginTop: '2px' }}>•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links Footer */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-secondary"
                  style={{
                    padding: '0.6rem 1.1rem',
                    fontSize: '0.875rem',
                    opacity: 0.6,
                    cursor: 'not-allowed'
                  }}
                  title="Configure genuine GitHub URL in src/data/projects.js"
                >
                  <GithubIcon size={16} />
                  <span>GitHub (Configurable)</span>
                </button>
              )}

              {project.liveDemoUrl ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.1rem', fontSize: '0.875rem' }}
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-outline"
                  style={{
                    padding: '0.6rem 1.1rem',
                    fontSize: '0.875rem',
                    opacity: 0.6,
                    cursor: 'not-allowed'
                  }}
                  title="Configure genuine demo URL in src/data/projects.js"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo (Coming Soon)</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
