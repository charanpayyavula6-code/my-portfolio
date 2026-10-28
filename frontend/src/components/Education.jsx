import { GraduationCap, MapPin, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/education';
import { soundFX } from '../utils/audio';

export default function Education() {
  return (
    <section id="education" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Academic Timeline</div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal engineering education, specialization in Artificial Intelligence &amp; Machine Learning, and foundational schooling.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Track Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-blue) 0%, var(--accent-cyan) 60%, var(--border-color) 100%)',
              zIndex: 0
            }}
          />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {educationData.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}
              >
                {/* Node Milestone Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: item.isCurrent
                      ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))'
                      : 'var(--bg-card)',
                    border: `2px solid ${item.isCurrent ? '#38bdf8' : 'var(--border-color)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.isCurrent ? '#070b14' : 'var(--accent-blue)',
                    boxShadow: item.isCurrent ? '0 0 20px rgba(56, 189, 248, 0.4)' : 'none',
                    flexShrink: 0,
                    marginTop: '4px'
                  }}
                >
                  <GraduationCap size={22} />
                </div>

                {/* Node Card */}
                <div
                  className="bento-card"
                  style={{
                    flex: 1,
                    padding: 'var(--space-xl)',
                    borderRadius: 'var(--radius-xl)',
                    border: item.isCurrent
                      ? '1px solid rgba(0, 240, 255, 0.4)'
                      : '1px solid var(--border-color)',
                    boxShadow: item.isCurrent ? '0 0 30px rgba(0, 240, 255, 0.15)' : 'none'
                  }}
                  onMouseEnter={() => soundFX.playBlip(1250, 0.015)}
                >
                  {/* Status / Year Pill */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <span
                      style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        background: item.isCurrent ? 'var(--badge-bg)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${item.isCurrent ? 'var(--badge-border)' : 'var(--border-color)'}`,
                        color: item.isCurrent ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {item.period}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.775rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <MapPin size={13} />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Institution Name */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.3rem'
                    }}
                  >
                    {item.institution}
                  </h3>

                  {/* Degree & Specialization */}
                  <div
                    style={{
                      fontSize: '0.975rem',
                      fontWeight: 600,
                      color: 'var(--accent-blue)',
                      marginBottom: '0.25rem'
                    }}
                  >
                    {item.degree}
                  </div>

                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem',
                      fontWeight: 500
                    }}
                  >
                    {item.specialization}
                  </div>

                  {/* Course Highlights */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border-color)'
                    }}
                  >
                    {item.highlights.map((point, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          color={item.isCurrent ? 'var(--accent-cyan)' : 'var(--accent-blue)'}
                          style={{ marginTop: '3px', flexShrink: 0 }}
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
