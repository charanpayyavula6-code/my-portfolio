import { useState } from 'react';
import {
  Cpu,
  Code,
  BookOpen,
  CheckCircle2,
  Milestone,
  Sparkles,
  GraduationCap,
  Terminal,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFX } from '../utils/audio';

export default function About() {
  const [activeDomain, setActiveDomain] = useState(0);

  const focusDomains = [
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: Cpu,
      color: '#00f0ff',
      summary: 'Architecting machine learning workflows, Scikit-learn pipelines, cross-validation, and predictive modeling.'
    },
    {
      title: 'Computer Vision & YOLO',
      icon: Zap,
      color: '#8b5cf6',
      summary: 'Real-time object detection models, OpenCV frame preprocessing, and safety compliance detection.'
    },
    {
      title: 'Python & Backend Architecture',
      icon: Terminal,
      color: '#ec4899',
      summary: 'High-throughput APIs with FastAPI/Flask, relational database schema normalization (3NF), and REST services.'
    },
    {
      title: 'Full-Stack Modern Web',
      icon: Code,
      color: '#10b981',
      summary: 'Responsive, accessible React interfaces with smooth animations, state machines, and performant styling.'
    }
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Computer Science Fundamentals',
      description: 'Mastering algorithmic problem solving, data structures, and object-oriented principles in Python & Java.'
    },
    {
      step: '02',
      title: 'Applied Machine Learning',
      description: 'Supervised & unsupervised models, exploratory data analysis, feature engineering, and precision-recall trade-offs.'
    },
    {
      step: '03',
      title: 'Full-Stack Engineering',
      description: 'Modern component-driven web interfaces in React, asynchronous REST API integration, and SQL persistence.'
    },
    {
      step: '04',
      title: 'Applied AI & Computer Vision',
      description: 'Developing PPE detection using YOLO architectures and clinical risk prediction models.'
    },
    {
      step: '05',
      title: 'Systems & Scalability',
      description: 'Advancing into Generative AI, Retrieval-Augmented Generation (RAG), and high-performance backend pipelines.'
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Neural Blueprint</div>
          <h2 className="section-title">Identity &amp; Architecture</h2>
          <p className="section-subtitle">
            Bridging theoretical artificial intelligence with resilient full-stack systems engineering.
          </p>
        </div>

        {/* BENTO GRID CONTAINER */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-3xl)'
          }}
        >
          {/* BENTO 1: Blueprint Narrative (8 cols) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 8',
              padding: 'var(--space-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Terminal Code Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--accent-cyan)',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <Terminal size={15} />
                <span>architect_dna.py</span>
                <span style={{ color: 'var(--text-muted)' }}>— compiled</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  lineHeight: 1.3
                }}
              >
                Building intelligent, performant software that turns complex data into purposeful reality.
              </h3>

              {profileData.aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Objective Quote Card */}
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(0, 240, 255, 0.05)',
                borderLeft: '3px solid var(--accent-cyan)',
                borderTop: '1px solid rgba(0, 240, 255, 0.15)',
                borderRight: '1px solid rgba(0, 240, 255, 0.15)',
                borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  marginBottom: '0.3rem',
                  fontWeight: 700
                }}
              >
                PROFESSIONAL OBJECTIVE
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                &ldquo;{profileData.professionalObjective}&rdquo;
              </p>
            </div>
          </div>

          {/* BENTO 2: Academic Credential & College (4 cols) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 4',
              padding: 'var(--space-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(10, 16, 31, 0.8) 100%)'
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  color: 'var(--accent-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <GraduationCap size={24} />
              </div>

              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-purple)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem',
                  fontWeight: 700
                }}
              >
                ACADEMIC STANDING
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {profileData.educationSummary.institution}
              </h4>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {profileData.educationSummary.degree}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={16} color="#00f0ff" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Standing:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{profileData.educationSummary.level}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Grade:</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{profileData.educationSummary.gpa}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={16} color="#a855f7" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Location:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{profileData.contact.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={16} color="#f59e0b" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Languages:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Telugu, Tamil, English</span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Verification</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                VERIFIED
              </span>
            </div>
          </div>

          {/* BENTO 3: Interactive Focus Domains (12 cols) */}
          <div
            className="bento-card"
            style={{
              gridColumn: 'span 12',
              padding: 'var(--space-2xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Core Competencies &amp; Focus Sectors
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Select any domain to inspect specialized engineering methodologies.
                </p>
              </div>
              <Sparkles size={20} color="var(--accent-cyan)" />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {focusDomains.map((domain, idx) => {
                const Icon = domain.icon;
                const isSelected = activeDomain === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveDomain(idx);
                      soundFX.playBlip(950, 0.03);
                    }}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      background: isSelected
                        ? `linear-gradient(135deg, ${domain.color}15 0%, rgba(255, 255, 255, 0.02) 100%)`
                        : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isSelected ? domain.color : 'rgba(255, 255, 255, 0.08)'}`,
                      boxShadow: isSelected ? `0 0 25px ${domain.color}30` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${domain.color}20`,
                        border: `1px solid ${domain.color}50`,
                        color: domain.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.85rem'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: isSelected ? domain.color : 'var(--text-primary)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      {domain.title}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {domain.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* JOURNEY CONTINUUM (Horizontal Roadmap) */}
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Evolutionary Engineering Continuum
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              From algorithmic fundamentals to autonomous machine learning architectures.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}
          >
            {journeySteps.map((step) => (
              <div
                key={step.step}
                className="bento-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--accent-cyan)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {step.step}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {step.title}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
