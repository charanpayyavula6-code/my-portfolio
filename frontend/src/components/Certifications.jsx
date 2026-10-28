import { useState } from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles, BookOpen, ArrowUpRight } from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { soundFX } from '../utils/audio';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI Engineering', 'Databases & Data Modeling', 'AI & Search'];

  const filteredCerts =
    filter === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="certifications" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Verified Credentials</div>
          <h2 className="section-title">Certifications &amp; Accreditations</h2>
          <p className="section-subtitle">
            Industry-recognized credentials in Generative AI, Retrieval-Augmented Generation (RAG), and high-performance databases.
          </p>
        </div>

        {/* Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                soundFX.playSwitch();
              }}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: filter === cat ? 700 : 500,
                background: filter === cat ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.03)',
                color: filter === cat ? '#030712' : 'var(--text-secondary)',
                border: `1px solid ${filter === cat ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                boxShadow: filter === cat ? '0 0 20px rgba(0, 240, 255, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="bento-card"
              style={{
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={() => soundFX.playBlip(1150, 0.015)}
            >
              <div>
                {/* Header Icon & Category */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <Award size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}
                  >
                    {cert.verifiedDate}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-purple)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    marginBottom: '0.35rem'
                  }}
                >
                  {cert.issuer}
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.65rem',
                    lineHeight: 1.3
                  }}
                >
                  {cert.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem'
                  }}
                >
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {cert.skillsCovered.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#10b981' }}>
                  <ShieldCheck size={15} />
                  <span>Verified Curriculum</span>
                </div>

                <button
                  onClick={() => {
                    soundFX.playSwitch();
                    setSelectedCert(cert);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    cursor: 'pointer'
                  }}
                >
                  <span>Details</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedCert && (
          <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
            <div
              className="modal-content"
              style={{ maxWidth: '520px', padding: 'var(--space-2xl)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                    {selectedCert.issuer}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{ color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {selectedCert.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Verified Competencies:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {selectedCert.skillsCovered.map((s, idx) => (
                    <span key={idx} className="tech-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <ShieldCheck size={20} color="#10b981" />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  This credential represents structured coursework and practical assessments completed by Payyavula Sri Charan.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
